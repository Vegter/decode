<template>
    <div>
        <section class="section" v-show="session.session_id">
            <div class="container">
                <h1 class="title">Ben je 18 jaar of ouder?</h1>
                <div v-if="request.status === 'STARTED'">
                    Wacht op antwoord...
                </div>
                <div v-else-if="request.status === 'FINALIZED'">
                    Finalized...
                </div>
                <div v-else>
                <h2 class="subtitle">
                    Scan onderstaande code om deze vraag te beantwoorden
                </h2>
                <div>
                    <qrcode-vue :value="session.session_id" :size="size" level="H"></qrcode-vue>
                </div>
                </div>
            </div>
        </section>
        <p>{{request}}</p>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import { mapActions } from "vuex";
import { getSession, getSessionStatus } from "../api";

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
