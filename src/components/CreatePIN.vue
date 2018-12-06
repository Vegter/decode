<template>
    <div>
      <security-code v-model="code"></security-code>
    </div>
</template>

<script>
import SecurityCode from 'vue-security-code'

export default {
  name: "Request",
  data() {
    return {
      code: '',
      length: {
        type: Number,
        default: 4
      },
      placeholder: {
        type: String,
        default: '-'
      },
      theme: {
        type: String,
        default: 'block'
      }
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