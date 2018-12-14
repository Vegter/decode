<template>
  <div>
    <input class="input" type="text" placeholder="Your identity" v-model="base.identity">
    <br>
    <br>

    <h1>Select a question</h1>
    <select v-model="base.selectedQuestion">
      <option value="age">Leeftijd</option>
      <!-- <option value="dateOfBirth">Geboortedatum</option> -->
      <option value="name">Naam</option>
      <!-- <option value="nationality">Nationaliteit</option> -->
      <option value="sex">Geslacht</option>
    </select>
    <br>
    <!-- Age -->
    <div v-if="base.selectedQuestion == 'age'">
      <select v-model="base.selectedAgeRange">
        <option value="equalOrGreater">Gelijk of hoger dan</option>
        <option value="lesser">Lager dan</option>
        <option value="equal">Gelijk aan</option>
      </select>
      <input class="input" type="number" placeholder="Age" v-model="base.ageInput">
    </div>
    <!-- Date of birth -->
    <div v-if="base.selectedQuestion == 'dateOfBirth'">
      <input v-model="base.dobDay" class="input" type="number" placeholder="Dag">
      <input v-model="base.dobMonth" class="input" type="number" placeholder="Maand">
      <input v-model="base.dobYear" class="input" type="number" placeholder="Jaar">
    </div>
    <!-- Name -->
    <div v-if="base.selectedQuestion == 'name'">
      <input
        class="input"
        type="text"
        placeholder="Voornaam"
        v-model="base.firstName"
      >
      <!-- <input
        class="input"
        type="text"
        placeholder="Achternaam"
        v-model="base.surname"
      > -->
    </div>
    <!-- Sex -->
    <div v-if="base.selectedQuestion == 'sex'">
      <select v-model="base.selectedSex">
        <option value="female">Vrouw</option>
        <option value="male">Man</option>
        <option value="other">Overig</option>
      </select>
    </div>

    <br>
    <br>

    <button class="button is-link" @click="base.create()">Ask Question</button>
  </div>
</template>

<script>
export default {
  name: "CreateQuestion",
  props: ["base"]
};
</script>

<style scoped>
</style>
