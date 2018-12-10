<template>
  <div>
    <h1 class="title">{{base.question}}</h1>
    <br>

    <qrcode-vue :value="sessionId" :size="size" level="H"></qrcode-vue>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      size: 200
    };
  },
  name: "ShowQR",
  props: ["base", "sessionId", "url"],
  components: {
    QrcodeVue
  }
};
</script>

<style scoped>
</style>