<template>
  <div>
    <create-pin :base=base></create-pin>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreatePin from "../components/CreatePin.vue"
import { getRequest } from '../api';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getOnboardingRequest"]),
    base() {
      return this;
    }
  },
  components: {
    CreatePin
  },
  methods: {
    createPin() {
      console.log("Not yet implemented")
    }
  },
  mounted() {
    console.log(this.onboardingRequest)
  }
};
</script>
