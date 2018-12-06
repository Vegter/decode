<template>
    <div>
        <div>
            <!-- <create-question :base="base"></create-question> -->
        </div>
        <div>
            <!-- <view-answer :base="base" :question="question" :status="status" :valid="valid" :color="color"></view-answer> -->
        </div>
        <div>
            <show-q-r :base="base" :session-id="sessionId" :url="url"></show-q-r>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateQuestion from "../components/CreateQuestion.vue";
import ViewAnswer from "../components/ViewAnswer.vue"
import ShowQR from "../components/ShowQR.vue"

export default {
  data() {
    return {
        selectedQuestion: null,
        question: "null",
        status: null,
        valid: null,
        color: null,
        sessionId: null,
        url: null
    };
  },
  computed: {
    base() {
      return this;
    }
  },
  components: {
      CreateQuestion,
      ViewAnswer,
      ShowQR
  },
  methods: {
      createQuestion() {
        console.log("Not yet implemented")
        // TODO: take question inputs and create a session, then show QR of session ID

        question = "What is your something?"
        sessionId = "1234"
        url = "http://decode.amsterdam"
      },
      return() {
        console.log("Not yet implemented")
        // TODO: return to ask question
      }
  },
  mounted() {
  }
};
</script>
