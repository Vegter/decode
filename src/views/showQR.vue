<template>
    <div>
        <section class="section" v-if="request.response === 'STARTED'">
            <div class="container">
                <h1 class="title">Wacht op antwoord...</h1>
                <h2 class="subtitle has-text-centered">
                    <img src="../assets/animated-logo.gif" width="100">
                    <!--<i class="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i>-->
                </h2>
            </div>
        </section>

        <section class="section" v-else-if="request.response === 'FINALIZED'">
            <div class="container">
                <div v-if="session.response.data" class="has-text-centered">

                    <answer :question="description"
                            :status="session.response.data.request_status"
                            :valid="session.response.data.request_valid"
                            :color="session.response.data.secret">
                    </answer>
                    <br>
                    <p>
                        <button class="button" @click="endRequest()">OK</button>
                    </p>
                </div>
            </div>
        </section>

        <section class="section" v-else>
            <div class="container">
                <h1 class="title">{{description}}</h1>
                <h2 class="subtitle">
                    Scan onderstaande code om deze vraag te beantwoorden
                </h2>
                <div>
                    <qrcode-vue :value="baseUrl + session.session_id" :size="size" level="H"></qrcode-vue>
                    <div>{{baseUrl}}{{session.session_id}}</div>
                </div>
            </div>
        </section>

        <div v-if="debug">
            <pre>{{session}}</pre>
            <pre>{{request}}</pre>
        </div>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import Answer from "../components/Answer";

import { mapActions, mapGetters } from "vuex";
import { getSession, getSessionStatus, getFullSession } from "../api";

var status_requestor = null;

export default {
  data() {
    return {
      size: 300,
      session: {},
      request: {},
      attribute: "ouderdan18",
      description: "Ben je 18 jaar of ouder?",
      baseUrl: window.location['origin'] + "?session="
    };
  },
  computed: {
    ...mapGetters(["debug"])
  },
  components: {
    QrcodeVue,
    answer: Answer
  },
  methods: {
    ...mapActions({
      setSession: "setSession"
    }),
    endRequest() {
      this.$router.push("/");
    },
    async getSession() {
      this.session = await getSession(this.attribute, this.description);
      this.setSession(this.session);

      status_requestor = setInterval(async () => {
        this.request = await getSessionStatus(this.session.session_id);
        if (this.request.response === "FINALIZED") {
          clearInterval(status_requestor);
          this.session = await getFullSession(this.session.session_id);
          this.setSession(this.session);
        }
      }, 1000);
    }
  },
  mounted() {
    this.getSession();
  },
  destroyed() {
    if (status_requestor) {
      clearInterval(status_requestor);
    }
  }
};
</script>
