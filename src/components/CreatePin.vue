<template>
  <div>
    <security-code v-model="code"></security-code>
    <button class="button is-link" @click="base.createPin()">Accept</button>
  </div>
</template>

<script>
import SecurityCode from "vue-security-code";

export default {
  name: "CreatePin",
  props: ["base"],
  data() {
    return {
      code: '',
    };
  },
  methods: {},
  components: {
    SecurityCode
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>