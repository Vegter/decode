<template>
  <div>
    <create-pin :base=base></create-pin>
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
import _decrypt from "raw-loader!../zenroom/decrypt_message.lua";
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
      const publicKey = JSON.parse(this.keypair).public;
      const response = await attachPublicKey(publicKey, this.request.id);
      joinRoom(this.request.id);
    },
    async handleEncrypedData() {
      this.session = await getRequest(this.request.id);
      this.encryptedData = this.session.response.data.encrypted;
      this.zenroom("decrypt");
    },
    handleDecrypted(value) {
      const decrypted = JSON.parse(value);
      const decryptedData = JSON.parse(decrypted.data);
      debugger;
      const personal_data = decryptedData[0].personal_data;
      const portrait_image = decryptedData[1].image_base64;

      setItem("personal_data", JSON.stringify(personal_data));
      setItem("personal_photo", portrait_image);

      this.$router.push("/profile");
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
