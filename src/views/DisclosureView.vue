<template>
  <div>
    <div v-if="!continued">
      <answer-question :base="base"></answer-question>
    </div>
    <div v-if="continued">
      <show-answer :base="base"></show-answer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { denyRequest, acceptRequest } from "../api";
import { getItem } from "../services/persistent_storage";
import AnswerQuestion from "../components/AnswerQuestion";
import ShowAnswer from "../components/ShowAnswer";
import EnterPin from "../components/EnterPin";

export default {
  data() {
    return {
      request: null,
      qType: null,
      qSubtype: null,
      qData: null,
      continued: false,
      personalData: null,
      portraitImage: null,
      color: null,
      request_status: null,
      status: null
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
    ShowAnswer,
    EnterPin
  },
  methods: {
    ...mapActions(["setDisclosureRequest"]),
    async acceptQuestion() {
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
      this.handleResponse(response.response);
      // console.log(response);
      // this.status = response.response.status;

      // this.continued = true;
      // this.request_status = response.response.data.request_status;

      // if(response.response.data.secret) {
      //   this.color = response.response.data.secret;
      //   this.portraitImage = getItem('personal_photo');
      // }
    },
    handleResponse(response) {
      this.status = response.status;

      if (response.response == "INVALID") {
        // TODO: error message and return to profile
      }

      this.continued = true;
      this.request_status = response.data.request_status;

      if(response.data.secret) {
        this.color = response.data.secret;
        this.portraitImage = getItem('personal_photo');
      }

      this.setDisclosureRequest(null);
    },
    async denyQuestion() {
      const response = await denyRequest(this.request.id);
      console.log(response);
      this.handleResponse(response.response);
    },
    validateRequest() {
      this.personalData = getItem("personal_data");
      this.portraitImage = getItem("personal_photo")
      this.personalData = JSON.parse(this.personalData)
      
      const request = JSON.parse(this.request.request);
      if (request.type === "age") {
        const age = this.getAge(new Date(this.personalData.date_of_birth));
        // const age = this.getAge("2000-12-15");
        const checkAge = parseInt(request.data);
        if (request.subType === "equal" && age === checkAge) {
          return true;
        } else if(request.subType === "equalOrGreater" && age >= checkAge) {
          return true;
        } else if(request.status === "lesser" && age < checkAge) {
          return true;
        } else {
          return false;
        }
      } else if(request.type === "name") {
        const name = this.personalData.name;
        const firstName = name[1];
        if(request.data === firstName) {
          return true;
        }
      } else if(request.type === "sex") {
        const sex = this.personalData.sex;
        if (request.data === "female" && (sex === "F" || sex === "V")) {
          return true;
        } else if (request.data === "male" && sex === "M") {
          return true;
        } else if (request.data === "other") {
          if (sex === "M" || sex === "F" || sex === "V") {
            return false;
          } else {
            return true;
          }
        }

        return false;
      }

      return false;
    },
    getAge(dateOfBirthString) {
        const today = new Date();
        const dateOfBirth = new Date(dateOfBirthString);
        var age = today.getFullYear() - dateOfBirth.getFullYear();
        var m = today.getMonth() - dateOfBirth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
          age--;
        }
        return age;
    },
    return() {
      this.request = null;
      this.continued = false;
      this.personalData = null;
      this.portraitImage = null;
      this.color = null;
      this.$router.push("/profile")
    }
  },
  mounted() {
    //   this.request = this.disclosureRequest;
    //   console.log(this.request);
  },
  created() {
    this.request = this.disclosureRequest;
    const question = JSON.parse(this.request.request);

    this.qType = question.type;
    this.qData = question.data;
    
    if (question.subType) {
      this.qSubtype = question.subType;
    }
  }
};
</script>
