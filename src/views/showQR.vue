<template>
    <div>
        <qrcode-vue :value="session.session_id" :size="size" level="H"></qrcode-vue>
        <p>{{session.session_id}}</p>
        <p>{{request}}</p>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import { mapActions } from "vuex";
import { getSession, getRequest } from "../api";

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

      this.request = await getRequest(this.session.session_id);
    }
  },
  mounted() {
    this.getSession();
  }
};
</script>
