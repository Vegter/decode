<template>
  <div>
    <div v-if="!continued">
      <answer-question :base="base"></answer-question>
    </div>
    <div v-if="continued">
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { denyRequest, acceptRequest } from "../api";
import { getItem } from "../services/persistent_storage";
import AnswerQuestion from "../components/AnswerQuestion";
import EnterPin from "../components/EnterPin";

export default {
  data() {
    return {
      request: null,
      continued: false,
      personalData: null,
      portraitImage: null
    };
  },
  computed: {
    ...mapGetters(["disclosureRequest"]),
    base() {
      return this;
    }
  },
  components: {
    AnswerQuestion,
    EnterPin
  },
  methods: {
    ...mapActions(["setDisclosureRequest"]),
    async acceptQuestion() {
      this.continued = true;
      // 1. verify request with local storage
      const requestValid = this.validateRequest();
      if(requestValid) {
        var requestStatus = "VALID";
      } else {
        var requestStatus = "INVALID";
      }
      // 2. send answer
      const response = await acceptRequest(this.request.id, requestStatus);
      console.log(response);

      // get request for color
      // show color & portrait 
    },
    async denyQuestion() {
      const response = await denyRequest(this.request.id);
      if (response.response == "INVALID") {
        // TODO: error message and return to profile
      }

      this.setDisclosureRequest(null);
      this.$router.push("/profile");
    },
    validateRequest() {
      this.personalData = getItem("personal_data");
      this.portraitImage = getItem("personal_photo")
      this.personalData = JSON.parse(this.personalData)
      
      const request = JSON.parse(this.request.request);
      if (request.type === "age") {
        const dateOfBirth = this.personalData.date_of_birth;
        if (request.type.subType === "equal") {

          // const dateOfBirth = personal_data
        }
      }
      else if(request.type === "name") {
        const name = this.personalData.name;
        const firstName = name[1];
        if(request.data.firstName === firstName) {
          return true;
        }
      }

      return false;
    }
  },
  mounted() {
    //   this.request = this.disclosureRequest;
    //   console.log(this.request);
  },
  created() {
    this.request = this.disclosureRequest;
  }
};
</script>
