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
                <h1 class="title">Antwoord</h1>
                <h2 class="subtitle">
                    {{description}}
                </h2>
                <div v-if="session.response.data" class="has-text-centered">
                    <div v-if="session.response.data.request_status === 'ACCEPTED'">
                        <p v-if="session.response.data.request_valid">
                            <span><i class="fa fa-check fa-3x" aria-hidden="true"></i></span>
                            &nbsp;
                            <span>OK</span>
                        </p>
                        <p v-else>
                            <span><i class="fa fa-bolt fa-3x" aria-hidden="true"></i></span>
                            &nbsp;
                            <span>Nee</span>
                        </p>
                    </div>
                    <div v-else-if="session.response.data.request_status === 'DENIED'">
                        <p>
                            <span><i class="fa fa-times fa-3x" aria-hidden="true"></i></span>
                            &nbsp;
                            <span>Vraag is geweigerd</span>
                        </p>
                    </div>
                </div>
                <p>
                    <button class="button is-primary" @click="endRequest()">OK</button>
                </p>
            </div>
        </section>

        <section class="section" v-else>
            <div class="container">
                <h1 class="title">{{description}}</h1>
                <h2 class="subtitle">
                    Scan onderstaande code om deze vraag te beantwoorden
                </h2>
                <div>
                    <qrcode-vue :value="session.session_id" :size="size" level="H"></qrcode-vue>
                    <div>{{session.session_id}}</div>
                </div>
            </div>
        </section>

        <!--<pre>{{session}}</pre>-->
        <!--<pre>{{request}}</pre>-->
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import { mapActions } from "vuex";
import { getSession, getSessionStatus, getFullSession } from "../api";

var status_requestor = null;

export default {
  data() {
    return {
      size: 300,
      session: {},
      request: {},
      attribute: "ouderdan18",
      description: "Ben je 18 jaar of ouder?"
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    ...mapActions({
      setSession: "setSession"
    }),
    endRequest() {
      this.$router.push("/showQR");
    },
    async getSession() {
      this.session = await getSession(this.attribute, this.description);
      this.setSession(this.session);

      status_requestor = setInterval(async () => {
        this.request = await getSessionStatus(this.session.session_id);
        if (this.request.response === 'FINALIZED') {
          clearInterval(status_requestor);
          this.session = await getFullSession(this.session.session_id);
          this.setSession(this.session);
        }
        // request.response contains status
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
