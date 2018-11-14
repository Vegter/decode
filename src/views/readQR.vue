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
                <div v-if="!response">
                    <h1 class="title">Beantwoord vraag</h1>

                    <h2 class="subtitle">
                        {{request.description}}
                    </h2>
                    <div>
                        <button class="button is-link" @click="acceptQuestion()">OK</button>
                        &nbsp;
                        <button class="button is-danger" @click="denyQuestion()">Weiger</button>
                    </div>
                    <h2 class="subtitle">
                        {{sessionId}}
                    </h2>
                </div>

                <div v-else-if="response.response.data" class="has-text-centered">
                    <answer :question="request.description"
                            :status="response.response.data.request_status"
                            :valid="response.response.data.request_valid"
                            :color="response.response.data.secret"
                            :pictureUrl="pictureUrl">
                    </answer>
                    <br>
                    <p>
                        <button class="button" @click="endQuestion()">OK</button>
                    </p>

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

                    <!-- <div class="card">
                        <div class="card-content">
                        <div class="content">
                            Tijdelijk kan QR code alleen worden gescant met je eigen camera functie of overige QR code scanner.
                        </div>
                        <div class="content">
                            Groetjes, <br/> De developers
                        </div>

                        </div>
                    </div> -->

                    <div>
                        <qrcode-reader @decode="onDecode"></qrcode-reader>
                        <!-- <br/> -->
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

        <div v-if="debug">
            <pre>{{sessionId}}</pre>
            <pre>{{request}}</pre>
            <pre>{{response}}</pre>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { QrcodeReader } from "vue-qrcode-reader";
import { getRequest, acceptRequest, denyRequest, getPictureUrl } from "../api";
import Answer from "../components/Answer";

export default {
  data() {
    return {
      sessionId: null,
      request: null,
      response: null,
      inputSession: "",
      inputUsername: "aj.jansen",
      pincode: "1234",
      pictureUrl: null,
      loggedIn: false
    };
  },
  computed: {
    ...mapGetters(["username", "debug"])
  },
  components: {
    QrcodeReader,
    answer: Answer
  },
  methods: {
    ...mapActions({
      setUsername: "setUsername"
    }),
    onDecode(decodedString) {
      // QR code scan result
      if (decodedString) {
        if (decodedString.includes("http")) {
          let qPos = decodedString.indexOf("?");
          this.sessionId = decodedString.substring(
            qPos + "?session=".length,
            decodedString.length
          );
        } else {
          this.sessionId = decodedString;
        }

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
    },
    async denyQuestion() {
      this.response = await denyRequest(this.request.id);
    },
    endQuestion() {
      this.$router.push("/");
    },
    async onInputSession() {
      // Manual session input
      if (this.inputSession.includes("http")) {
        let qPos = this.inputSession.indexOf("?");
        this.sessionId = this.inputSession.substring(
          qPos + "?session=".length,
          this.inputSession.length
        );
      } else {
        this.sessionId = this.inputSession;
      }
      this.getRequest(this.sessionId);
    },
    async login() {
      // Simple login
      if (this.inputUsername && this.pincode) {
        this.loggedIn = true;
        this.setUsername(this.inputUsername);
        this.pictureUrl = await getPictureUrl(this.inputUsername);
        this.pictureUrl = this.pictureUrl.response;
      }
    }
  },
  mounted() {
    this.loggedIn = !!this.username;
    this.sessionId = this.$route.query.session;

    if (this.sessionId) {
      this.getRequest(this.sessionId);
    }
  }
};
</script>
