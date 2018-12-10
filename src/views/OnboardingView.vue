<template>
  <div>
    <create-pin :base=base></create-pin>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreatePin from "../components/CreatePin.vue"

export default {
  data() {
    return {};
  },
  computed: {
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
  mounted() {}
};
</script>
