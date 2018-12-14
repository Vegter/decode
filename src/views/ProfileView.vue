<template>
  <div id="profile-view-content">
    <profile :base="base"></profile>
    <div id="verified-by"><img src="../assets/verified_by_amsterdam.svg"/></div>
    <a class="button-verify-identity" @click="openQrScanner()"><img src="../assets/qr_scan.svg"/>Verify identity</a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getItem } from "../services/persistent_storage";
import Profile from "../components/Profile";

export default {
  data() {
    return {
      gotData: false,
      picture: null,
      surname: null,
      firstname: null,
      dateOfBirth: null,
      sex: null,
      nationality: null,
      bsn: null,
      personalData: null,
      portraitImage: null
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
    },
    setDataStrings(personalData, portraitImage) {
      this.surname = this.personalData.name[0];
      this.firstname = this.personalData.name[1];
      this.dateOfBirth = this.personalData.date_of_birth;

      this.sex = this.personalData.sex;
      this.nationality = this.personalData.nationality;
      this.bsn = this.personalData.optional_data;

      this.picture = this.portraitImage;
    },
    checkForData() {
      this.personalData = getItem('personal_data');
      this.portraitImage = getItem('personal_photo');

      if(this.personalData != null && this.portraitImage != null) {
        this.gotData = true;
        this.personalData = JSON.parse(this.personalData);
        this.setDataStrings(this.personalData, this.portraitImage)
      }
    }
  },
  mounted() {
    this.checkForData();
  },
  created() {
    this.checkForData();
  }
};
</script>

<style scoped>

#profile-view-content {
  /* border: 1px solid black; */
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
