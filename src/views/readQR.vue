<template>
    <div>
        <section class="section" v-if="request">
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
                <pre>{{request}}</pre>
                <pre>{{response}}</pre>
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
                    <div>
                        <button class="button is-link" @click="getRequest(sessionId)">Get Request</button>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Session code"
                               v-model="inputSession" @change="onInputSession">
                    </div>
                </div>
                <pre>{{sessionId}}</pre>
            </div>
        </section>
    </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { QrcodeReader } from "vue-qrcode-reader";
import { getRequest, acceptRequest, denyRequest } from "../api";

export default {
  data() {
    return {
      sessionId: null,
      request: null,
      response: null,
      inputSession: ""
    };
  },
  computed: {
    // ...mapGetters(["session"])
  },
  components: {
    QrcodeReader
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString) {
        this.sessionId = decodedString;
        this.getRequest(this.sessionId);
      }
    },
    async getRequest(sessionId) {
      this.request = await getRequest(sessionId);
      this.request = this.request.response;
      console.log("Request", this.request);
    },
    async acceptQuestion() {
      console.log("Answer request", this.request);
      this.response = await acceptRequest(this.request.id);
    },
    async denyQuestion() {
      console.log("Deny request", this.request);
      this.response = await denyRequest(this.request.id);
    },
    async onInputSession() {
      console.log("Session", this.inputSession);
      this.sessionId = this.inputSession;
      await getRequest(this.sessionId);

    }

  }
};
</script>
