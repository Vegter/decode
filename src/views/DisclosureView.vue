<template>
  <div>
    <answer-question :base="base"></answer-question>
    <div v-if="authenticate">
        <enter-pin :base="base"></enter-pin>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { denyRequest } from "../api";
import { getItem } from "../services/persistent_storage";
import AnswerQuestion from "../components/AnswerQuestion";
import EnterPin from "../components/EnterPin";

export default {
  data() {
    return {
        request: null,
        authenticate: false
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
    ...mapActions(['setDisclosureRequest']),
    async acceptQuestion() {
        authenticate = true;
    },
    async denyQuestion() {
        const response =  await denyRequest(this.request.id);
        if(response.response == "INVALID") {
            // TODO: error message and return to profile
        }
        
        this.setDisclosureRequest(null);
        this.$router.push("/profile");
    },
    checkPin(code) {
        // TODO: Decrypt local storage with PIN
        this.validateRequest();
    },
    validateRequest() {
        const personalData = getItem('personal_data');

        if(request.type == "age") {
            if(request.type.subType == "equal") {
                // const dateOfBirth = personal_data
            }
        }
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
