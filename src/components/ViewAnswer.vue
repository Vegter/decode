<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <div v-if="base.status == 'STARTED'">
      <h1 class="title">Aan het wachten op antwoord...</h1>
    </div>
    <br>
    <h1>{{base.question}}</h1>
    <br>

    <div v-if="base.status == 'FINALIZED'">
      <div v-if="base.request_status == 'VALID'" class="answer" :style="{'border-color': base.color}">
        <p>Antwoord ontvangen en valide</p>
      </div>
      <div v-if="base.request_status == 'INVALID'" class="anwser">
        <p>Antwoord ontvangen maar invalide</p>
      </div> 
      <div v-if="base.request_status == 'DENIED'">
        <p>Vraag is geweigerd</p>
      </div>
    </div>
    <br>
    <div>
      <button class="button is-link" @click="base.cancel()">Annuleren</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Answer",
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
