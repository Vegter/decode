<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <p>{{base.request.identity}} asks</p>
    <p>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</p>
    <br>
    
    <qrcode-vue :value="base.sessionId" :size="size" level="H"></qrcode-vue>
    <br>
    <button class="button is-link" @click="base.cancel()">Annuleren</button>
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
  props: ["base"],
  components: {
    QrcodeVue
  }
};
</script>

<style scoped>
</style>