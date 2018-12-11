<template>
  <div>
    <answer-question :base="base"></answer-question>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AnswerQuestion from "../components/AnswerQuestion"
import { denyRequest } from "../api";


export default {
  data() {
    return {
        request: null
    };
  },
  computed: {
    ...mapGetters(["disclosureRequest"]),
    base() {
      return this;
    }
  },
  components: {
      AnswerQuestion
  },
  methods: {
    ...mapActions(['setDisclosureRequest']),
    async acceptQuestion() {
        // TODO
    },
    async denyQuestion() {
        const response =  await denyRequest(this.request.id);
        if(response.response == "INVALID") {
            // TODO: error message and return to profile
        }
        
        this.setDisclosureRequest(null);
        this.$router.push("/profile");
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
