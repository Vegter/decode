<template>
  <div>
      <scan-qr :base="base"></scan-qr>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ScanQr from "../components/ScanQr";
import { getRequest } from "../api"

export default {
  data() {
    return {
      sessionId: null
    };
  },
  computed: {
    base() {
      return this;
    }
  },
  components: {
    ScanQr
  },
  methods: {
    ...mapActions({
      setOnboardingRequest: "setOnboardingRequest"
    }),
    return() {
      this.$router.push("/profile");
    },
    onDecode(decodedString) {
      if(decodedString) {
        this.sessionId = decodedString;
        this.handleSessionId(this.sessionId);
      }
    },
    async handleSessionId(sessionId) {
      const localResponse = await getRequest(sessionId);
      if(localResponse.response.request == "onboarding") {
        // TODO: handle onboarding
        const onboardingRequest = localResponse.response;
        this.setOnboardingRequest(onboardingRequest);
      } else {
        const disclosureRequest = localResponse.response;
        console.log(disclosureRequest)
      }
    }
  },
  mounted() {}
};
</script>
