<template>
    <div>
        <h1>ReadQR</h1>
        <qrcode-reader @decode="onDecode"></qrcode-reader>
    </div>
</template>

<script>
import { QrcodeReader } from "vue-qrcode-reader";

export default {
  data() {
    return {};
  },
  components: {
    QrcodeReader
  },
  methods: {
    onDecode(decodedString) {
      alert(`onDecode: ${decodedString}`);
    }
  }
};
</script>
