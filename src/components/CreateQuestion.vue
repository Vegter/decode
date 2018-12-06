<template>
    <div>
        <input class="input" type="text" placeholder="Your identity" v-model="base.inputSession" @change="base">
        <br><br>

        <h1>Select a question</h1>
        <select>
            <option value="age">Age</option>
            <option value="name">Name</option>
            <option value="nationality">Nationality</option>
        </select>
        <br>
        <select>
            <option value="equals">Equals</option>
            <option value="notEquals">Is not</option>
            <option value="between">Is in between</option>
        </select>
        <input class="input" type="text" placeholder="Something" v-model="base.selectedQuestion" @change="base">
        <br><br>

        <button class="button is-link" @click="base.createQuestion()">Ask Question</button>
    </div>
</template>

<script>
export default {
  name: "CreateQuestion",
  props: ["base"],
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
