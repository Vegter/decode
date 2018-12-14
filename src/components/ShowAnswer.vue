<template>
  <div>
    <h2 class="subtitle">{{base.request.description}} asked</h2> 
    <p>{{base.qType}}</p>
    <p>{{base.qSubtype}}</p>
    <p>{{base.qData}}</p>
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
</style>
