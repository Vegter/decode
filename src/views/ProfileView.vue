<template>
  <div>
    <profile :base="base"></profile>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Profile from "../components/Profile.vue";

export default {
  data() {
    return {
      picture: "../assets/logo.png",
      surname: "Jansen",
      firstname: "Jan",
      dateOfBirth: "01 01 1990",
      sex: "F",
      nationality: "Dutch",
      bsn: "552612991"
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
    scanQR() {
      console.log("Not yet implemented");
      // TODO: go to QR scanner
    }
  },
  mounted() {}
};
</script>
