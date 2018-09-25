<template>
    <div>

        <section class="section" v-if="request.response === 'STARTED'">
            <div class="container">
                <h1 class="title">Wacht op antwoord...</h1>
            </div>
        </section>

        <section class="section" v-else-if="request.response === 'FINALIZED'">
            <div class="container">
                <h1 class="title">Antwoord</h1>
            </div>
        </section>

        <section class="section" v-else>
            <div class="container">
                <h1 class="title">Ben je 18 jaar of ouder?</h1>
                <h2 class="subtitle">
                    Scan onderstaande code om deze vraag te beantwoorden
                </h2>
                <div>
                    <qrcode-vue :value="session.session_id" :size="size" level="H"></qrcode-vue>
                </div>
            </div>
        </section>

        <pre>{{session}}</pre>
        <pre>{{request}}</pre>
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
      request: {}
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    ...mapActions({
      setSession: "setSession"
    }),
    async getSession() {
      this.session = await getSession();
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
