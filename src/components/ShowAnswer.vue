<template>
  <div id="show-answer-content">
    <h1>{{base.request.description}} asked</h1>
    <h2><span id="question-attribute">{{base.qType }}</span><span id="question-logic">{{base.qSubtype}}</span> <span id="question-value">{{base.qData}}</span></h2>
    <br>

    <div v-if="base.status == 'FINALIZED'">
      <div v-if="base.request_status == 'VALID'" class="answer" :style="{'border-color': base.color}">
        <p>CORRECT</p>
        <img v-bind:src="'data:image/jpeg;base64,'+base.portraitImage">
      </div>
      <div v-if="base.request_status == 'INVALID'" class="answer">
        <p>INCORRECT</p>
      </div> 
      <div v-if="base.request_status == 'DENIED'">
        <p>YOU DENIED</p>
      </div>
    </div>
    <div>
      <button class="button is-link" @click="base.return()">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowAnswer",
  props: ["base"]
};
</script>

<style>

#show-answer-content {
  text-align: center;
  margin-top: 5vh;
}

.picture {
  border-style: solid;
  border-width: thick;
  border-radius: 5px;
}
.answer {
  border-style: solid;
  border-width: 20px;
  border-radius: 10px;
}
.isOK {
  color: green;
}
.isNotOK {
  color: red;
}

h1 { 
  font-size: 1.2em;
  font-weight: bold;
}

h2 { 
  font-size: 1.2em;
  font-weight: bold;
}

h3 { 
  font-size: 1.0em;
  font-weight: normal;
}

h2 span {
  margin-right: 10px;
}

</style>
