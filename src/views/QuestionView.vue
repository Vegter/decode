<template>
  <div>
    <!-- MN: TODO: add DEBUG VAR TO SWITCH VIEW AND HAVE DUMMY DATA -->
    <div v-if="stage == 'QUESTION'">
    <create-question :base="base"></create-question>
    </div>
    <div v-if="stage == 'QRCODE'">
      <show-q-r :base="base"></show-q-r>
    </div>
    <div v-if="stage == 'ANSWER'">
      <view-answer :base="base"></view-answer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { createQuestion, getRequest, getSessionStatus } from "../api";
import { getItem } from "../services/persistent_storage";
import CreateQuestion from "../components/CreateQuestion";
import ViewAnswer from "../components/ViewAnswer";
import ShowQR from "../components/ShowQR";
import { setInterval, clearInterval } from 'timers';


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
      firstName: "Mark",
      surname: "",
      status: "",
      request_status: "",
      color: "",
      sessionId: "",
      url: "",
      qType: "",
      qSubtype: "",
      qData: "",
      statusInterval: null,
      stage: "" // QUESTION, QRCODE or ANSWER
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
      
      this.stage = "QRCODE"
      this.listenToStatus();
    },
    // REST CALL LOOP
    listenToStatus() {
      this.statusInterval = setInterval(async () => {
        var response = await getSessionStatus(this.sessionId);
        this.status = response.response;
        if(this.status == "STARTED") {
          this.stage = "ANSWER"
        }
        if(this.status == "FINALIZED") {
          clearInterval(this.statusInterval);
          this.getAnswer();
        }
      }, 1000);
    },
    async getAnswer() {
      var response = await getRequest(this.sessionId);
      this.request_status = response.response.data.request_status;

      if (response.response.data.secret) {
        this.color = response.response.data.secret;
      }
    },
    cancel() {
      clearInterval(this.statusInterval);
      this.stage = "QUESTION"
      this.sessionId = null;
      this.question = null;
      this.description = null;
      this.status = null;
      this.valid = null;
      this.color = null;
      this.identity = null;
    }
  },
  created() {
    this.stage = "QUESTION";
    var personalData = getItem("personal_data");

    if (personalData != null) {
      personalData = JSON.parse(personalData);
      const firstname = personalData.name[1];
      this.identity = firstname;
    }
  },
  destroyed() {
    clearInterval(this.statusInterval);
  }
};
</script>
