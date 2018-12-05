<template>
<div>
    <h1 class="title">Beantwoord vraag</h1>

    <h2 class="subtitle">
        {{mymodel.request.description}}
    </h2>
    <div>
        <button class="button is-link" @click="mymodel.acceptQuestion()">OK</button>
        &nbsp;
        <button class="button is-danger" @click="mymodel.denyQuestion()">Weiger</button>
    </div>
    <h2 class="subtitle">
        {{mymodel.sessionId}}
    </h2>

</div>
</template>

<script>
export default {
  name: "AnswerQuestion",
  props: ["mymodel"],
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>
