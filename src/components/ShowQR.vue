<template>
  <div>
    <!-- <h1 class="title">{{base.question}}</h1>
    <br>
    <h2 class="title">{{base.description}}</h2>
    <br> -->
    <br>
    <br>
    <br>
    <p>{{base.identity}} asks</p>
    <p>{{base.qType}}</p>
    <p>{{base.qSubtype}}</p>
    <p>{{base.qData}}</p>
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