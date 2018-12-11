<template>
  <div>
    <profile :base="base"></profile>
    <button class="button is-link" @click="openQrScanner()">Scan QR</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Profile from "../components/Profile";

export default {
  data() {
    return {
      picture: "../assets/logo.png",
      surname: "Jansen",
      firstname: "Jan",
      dateOfBirth: "01 01 1990",
      sex: "F",
      nationality: "Dutch",
      bsn: "552612991",
    };
  },
  computed: {
    base() {
      return this;
    }
  },
  components: {
    Profile
  },
  methods: {
    openQrScanner() {
      this.$router.push("/scan")
    }
  },
  mounted() {
  }
};
</script>
