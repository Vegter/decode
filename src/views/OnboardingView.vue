<template>
  <div id="onboarding-page">
    <div id="onboading-content">
      <h1>Building data profile</h1>
      <h2>Please wait...</h2>
      <img src="../assets/verification.svg"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getRequest, attachPublicKey } from '../api';
import { socket, joinRoom, sessionStatus } from "../services/sockets";
import { setItem } from "../services/persistent_storage";
// import zenroom from 'zenroom';
import sha512 from 'js-sha512';
import _keygen from "raw-loader!../zenroom/keygen.lua";
import CreatePin from "../components/CreatePin.vue";
import { join } from 'path';

export default {
  data() {
    return {
      request: null,
      firstHash: null,
      checkPin: false,
      keypair: null,
      result: null
    };
  },
  computed: {
    ...mapGetters(["onboardingRequest"]),
    base() {
      return this;
    }
  },
  components: {
    CreatePin
  },
  methods: {
    firstPin(code) {
      this.startOnboarding();

      // this.firstHash = sha512.update(code);
      // console.log(this.firstHash.hex())
      // this.checkPin = true;
    },
    secondPin(code) {
      const secondHash = sha512.update(code);
      console.log(secondHash.hex());
      if(this.firstHash != secondHash) {
        this.firstHash = null;
        console.log("Retry");
        // TODO: give notification to retry
      }
      console.log("Accepted");
    },
    async startOnboarding() {
      this.zenroom("keypair");
      console.log(this.keypair);
      const publicKey = JSON.parse(this.keypair).public;
      const response = await attachPublicKey(publicKey, this.request.id);
      joinRoom(this.request.id);
    },
    async handleEncrypedData() {
      this.session = await getRequest(this.sessionId);
      this.encryptedData = this.session.response.data.encrypted;
      this.zenroom("decrypt");
    },
    handleDecrypted(value) {
      const decryptedObj = JSON.parse(value);
      const json_data = JSON.parse(decryptedObj.data);

      setItem("personal_data", json_data[0]);
      setItem("personal_photo", json_data[1].image_base64);
    },
    zenroom(method) {
      window.Module = {
        ...window.Module,
        exec_ok: () => (this.result += " OK"),
        exec_error: () => (this.result += " ERROR")
      };

      const keypair = () => {
        window.Module.print = text => (this.keypair = text);

        const keys = null;
        const data = null;
        const conf = null;
        const script = _keygen;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      const decrypt = () => {
        window.Module.print = text => this.handleDecrypted(text);

        const keys = this.keypair;
        const data = this.encryptedData;
        const conf = null;
        const script = _decrypt;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      if (method === "keypair") {
        keypair();
      } else if (method === "decrypt") {
        decrypt();
      }
    } 
  },
  mounted() {
    socket.on("status_update", data => {
      if (data.status == sessionStatus.GOT_ENCR_DATA) {
        this.handleEncrypedData();
      }
    });

    const zencode = `print("hello world from zenroom in nodejs")`;
    // zenroom.zencode(zencode).exec()
  },
  created() {
    this.request = this.onboardingRequest;
  }
};
</script>

<style scoped>

#onboarding-page {
  display: block;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  height: 100vh;
  position: relative;
}

#onboading-content {
  display: block;
  margin-top: 20vh;
}

#onboading-content h1 {
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
}

#onboading-content h2 {
  text-align: center;
  font-weight: normal;
  color: #555555;
  font-size: 1em;
}

#onboading-content img {
  display: block;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: auto;
}

</style>
