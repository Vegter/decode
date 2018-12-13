<template>
  <div>
    <div v-if="gotData">
      <profile :base="base"></profile>
    </div>
    <div v-if="!gotData">
      <!-- TODO: no profile component -->
    </div>
    <button class="button is-link" @click="openQrScanner()">Scan QR</button>
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
    }
  },
  mounted() {},
  created() {
    this.personalData = getItem('personal_data');
    this.portraitImage = getItem('personal_photo');

    if(this.personalData != null && this.portraitImage != null) {
      this.gotData = true;
      this.personalData = JSON.parse(this.personalData);
      this.setDataStrings(this.personalData, this.portraitImage)
    }
}
};
</script>
