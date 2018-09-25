<template>
    <div>
        <section class="section" v-if="!loggedIn">
            <div class="container">
                <h1 class="title">Login</h1>
                <div>
                    <div class="field">
                        <label class="label">Naam</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Je naam"
                                   v-model="inputUsername">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Pincode</label>
                        <div class="control">
                            <input class="input" type="password" maxlength="4" placeholder="Pincode" pattern="[0-9]{4}"
                                   v-model="pincode">
                        </div>
                    </div>
                    <p>
                        <button class="button is-link" @click="login()" :disabled="!(inputUsername && pincode.length === 4)">Log in</button>
                    </p>
                </div>
            </div>
        </section>

        <section class="section" v-else-if="request">
            <div class="container">
                <h1 class="title">Beantwoord vraag</h1>
                <div>
                    <h2 class="subtitle">
                        {{request.description}}
                    </h2>
                    <div>
                        <button class="button is-link" @click="acceptQuestion()">OK</button>
                        &nbsp;
                        <button class="button is-danger" @click="denyQuestion()">Weiger</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" v-else>
            <div class="container">
                <h1 class="title">Scan QR Code</h1>
                <div>
                    <h2 class="subtitle">
                        Scan de QR code om de identiteitsvraag te lezen
                    </h2>
                    <div>
                        <qrcode-reader @decode="onDecode"></qrcode-reader>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Session ID manual input</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Session code"
                               v-model="inputSession" @change="onInputSession">
                    </div>
                    <p>
                        <button class="button is-link" @click="getRequest(sessionId)" :disabled="!inputSession">Get Request</button>
                    </p>
                </div>
            </div>
        </section>
        <!--<pre>{{sessionId}}</pre>-->
        <!--<pre>{{request}}</pre>-->
        <!--<pre>{{response}}</pre>-->
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { QrcodeReader } from "vue-qrcode-reader";
import { getRequest, acceptRequest, denyRequest } from "../api";

export default {
  data() {
    return {
      sessionId: null,
      request: null,
      response: null,
      inputSession: "",
      inputUsername: "aj.jansen",
      pincode: "1234",
      loggedIn: false
    };
  },
  computed: {
    ...mapGetters(["username"])
  },
  components: {
    QrcodeReader
  },
  methods: {
    ...mapActions({
      setUsername: "setUsername"
    }),
    onDecode(decodedString) {
      // QR code scan result
      if (decodedString) {
        this.sessionId = decodedString;
        this.getRequest(this.sessionId);
      }
    },
    async getRequest(sessionId) {
      // Retrieve request from backend
      this.request = await getRequest(sessionId);
      this.request = this.request.response;
    },
    async acceptQuestion() {
      this.response = await acceptRequest(this.request.id, this.username);
      this.$router.push("/");
    },
    async denyQuestion() {
      this.response = await denyRequest(this.request.id);
      this.$router.push("/");
    },
    async onInputSession() {
      // Manual session input
      this.sessionId = this.inputSession;
      this.getRequest(this.sessionId);
    },
    login() {
      // Simple login
      if (this.inputUsername && this.pincode) {
        this.loggedIn = true;
        this.setUsername(this.inputUsername);
      }
    }
  },
  mounted() {
    this.loggedIn = !!this.username;
  }
};
</script>
