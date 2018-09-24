<template>
    <div>
        <section class="section">
            <div class="container">
                <h1 class="title">Scan QR Code</h1>
                <div>
                    <h2 class="subtitle">
                        Scan de QR code om de identiteitsvraag te lezen
                    </h2>
                    <div>
                        <qrcode-reader @decode="onDecode"></qrcode-reader>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { QrcodeReader } from "vue-qrcode-reader";
import { getRequest } from "../api";


export default {
  data() {
    return {
      session: null,
      request: null
    };
  },
  components: {
    QrcodeReader
  },
  methods: {
    onDecode(decodedString) {
      if (len(decodedString) > 5) {
        this.session = decodedString;
      }
    },
    async getRequest() {
      this.request = await getRequest(this.session.session_id);
      console.log('Request', this.request);
    }
  }
};
</script>
