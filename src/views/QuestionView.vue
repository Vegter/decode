<template>
  <div>
    <div v-if=!sessionId>
      <create-question :base="base"></create-question>
    </div>
    <div v-if="sessionId && !status">
      <show-q-r :base="base"></show-q-r>
    </div>
    <div v-if=status>
      <view-answer :base="base"></view-answer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { createQuestion, getRequest } from "../api";
import { socket, joinRoom, closeRoom, sessionStatus } from "../services/sockets";
import CreateQuestion from "../components/CreateQuestion";
import ViewAnswer from "../components/ViewAnswer";
import ShowQR from "../components/ShowQR";

export default {
  data() {
    return {
      identity: null,
      question: null,
      description: null,
      selectedQuestion: "name",
      selectedAgeRange: "equalOrGreater",
      selectedSex: "female",
      ageInput: 18,
      dobDay: null,
      dobMonth: null,
      dobYear: null,
      firstName: null,
      surname: null,
      status: null,
      valid: null,
      color: null,
      sessionId: null,
      url: null,
      finished: false
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
    create() {
      // TODO: take question inputs and create a session, then show QR of session ID
      this.description = this.identity + " wil een vraag stellen";
      if(this.selectedQuestion === 'age') {
        this.question = {type: this.selectedQuestion, subType: this.selectedAgeRange, data: this.ageInput};
      } else if(this.selectedQuestion === 'dateOfBirth') {
        this.question = {type: this.selectedQuestion, data: {day: this.dobDay, month: this.dobMonth, year: this.dobYear}};
      } else if(this.selectedQuestion === 'name') {
        this.question = {type: this.selectedQuestion, data: {firstName: this.firstName, surname: this.surname}};
      } else if(this.selectedQuestion === 'sex') {
        this.question = {type: this.selectedQuestion, data: this.selectedSex};
      }
      
      // console.log(this.description, this.question);

      this.sendQuestion(this.description, this.question);
    },
    async sendQuestion(description, question) {
      const response = await createQuestion(this.description, JSON.stringify(this.question));
      this.sessionId = response.session_id;

      joinRoom(this.sessionId);

      socket.on("status_update", data => {
        this.status = data.status;
        if(this.status == "FINALIZED" && !this.finished) {
          this.getAnswer();
          this.finished = true;
        }
      });
    },
    async getAnswer() {
      const response = await getRequest(this.sessionId);
      console.log(response);
    },
    cancel() {
      closeRoom(this.sessionId)
      this.sessionId = null
      this.question = null
      this.description = null
      this.status = null
    }
  },
  mounted() {}
};
</script>
