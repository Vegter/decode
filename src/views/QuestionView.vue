<template>
  <div>
    <!-- MN: TODO: add DEBUG VAR TO SWITCH VIEW AND HAVE DUMMY DATA -->
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
import { getItem } from "../services/persistent_storage";
import CreateQuestion from "../components/CreateQuestion";
import ViewAnswer from "../components/ViewAnswer";
import ShowQR from "../components/ShowQR";

export default {
  data() {
    return {
      identity: "",
      question: {},
      description: "",
      selectedQuestion: "name",
      selectedAgeRange: "equalOrGreater",
      selectedSex: "female",
      ageInput: 18,
      dobDay: 1,
      dobMonth: 1,
      dobYear: 2000,
      firstName: "",
      surname: "",
      status: "",
      request_status: "",
      color: "",
      sessionId: "",
      url: "",
      finished: false,
      qType: "",
      qSubtype: "",
      qData: ""
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
      if(this.identity == "") {
        this.identity = "Anonymous";
      }

      this.qType = this.selectedQuestion;
      
      if(this.selectedQuestion === 'age') {
        this.question = {type: this.selectedQuestion, subType: this.selectedAgeRange, data: this.ageInput};
        this.qSubtype = this.selectedAgeRange;
        this.qData = this.ageInput;
      } else if(this.selectedQuestion === 'dateOfBirth') {
        const date = this.dobYear + "-" + this.dobMonth + "-" + this.dobDay;
        this.question = {type: this.selectedQuestion, data: date};
        this.qData = date;
      } else if(this.selectedQuestion === 'name') {
        // this.question = {type: this.selectedQuestion, data: {firstName: this.firstName, surname: this.surname}};
        this.question = {type: this.selectedQuestion, data: this.firstName};
        this.qData = this.firstName;
      } else if(this.selectedQuestion === 'sex') {
        this.question = {type: this.selectedQuestion, data: this.selectedSex};
        this.qData = this.selectedSex;
      }

      this.sendQuestion(this.identity, this.question);
    },
    async sendQuestion(description, question) {
      const response = await createQuestion(description, JSON.stringify(question));
      this.sessionId = response.session_id;

      joinRoom(this.sessionId);

      console.log("FINISHED:", this.finished);

    },
    listenToStatusUpdate() {
      socket.on("status_update", data => {
        console.log("STATUS UPDATE", "DATA:", data, "FINISHED", this.finished);
        this.status = data.status;
        if(this.status == "FINALIZED" && !this.finished) {
          console.log("AFTER IF", "STATUS:", this.status, "FINISHED:", this.finished);
          this.getAnswer();
          this.finished = true;
        }
      });
    },
    async getAnswer() {
      var response = await getRequest(this.sessionId);
      this.request_status = response.response.data.request_status;

      if(response.response.data.secret) {
        this.color = response.response.data.secret;
      }
    },
    cancel() {
      closeRoom(this.sessionId);
      this.sessionId = null;
      this.question = null;
      this.description = null;
      this.status = null;
      this.finished = false;
      this.valid = null;
      this.color = null;
      this.identity = null;
    }
  },
  mounted() {
    // this.listenToStatusUpdate();
  },
  created() {
    var personalData = getItem('personal_data');

    if(personalData != null) {
      var personalData = JSON.parse(personalData);
      const firstname = personalData.name[1];
      this.identity = firstname;
    }
  }
};
</script>
