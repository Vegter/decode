<template>
  <div>
    <h1 class="title">Beantwoord vraag</h1>
    <br>
    <h2 class="subtitle">{{base.request.description}}</h2>
    <h2 class="subtitle">{{base.request.request}}</h2>
    <div>
      <button class="button is-link" @click="base.acceptQuestion()">OK</button>
      &nbsp;
      <button class="button is-danger" @click="base.denyQuestion()">Weiger</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerQuestion",
  props: ["base"],
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
