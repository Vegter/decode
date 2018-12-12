<template>
  <div id="profile-view-content">
    <profile :base="base"></profile>
    <div id="verified-by"><img src="../assets/verified_by_amsterdam.svg"/></div>
    <a class="button-verify-identity" @click="openQrScanner()"><img src="../assets/qr_scan.svg"/>Verify identity</a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Profile from "../components/Profile";

export default {
  data() {
    return {
      picture: "./assets/stan.jpg", // https://github.com/vuejs/Discussion/issues/202
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

<style scoped>

#profile-view-content {
  border: 1px solid black;
}

#verified-by {
  
}

#verified-by img {
  display: block;
  height: 10vh;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}

a.button-verify-identity {
  display: block;
  background: #c60039;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6vh;
  height: 7vh;
  color: white;
  text-align: center;
  padding-top: 2vh;
}

a.button-verify-identity img {
  vertical-align: top;
  margin-right: 20px;
}

</style>
