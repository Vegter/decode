<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <h1 class="title">Aan het wachten op antwoord...</h1>
    <br>
    <p>{{base.request.identity}} asks</p>
    <p>{{base.request.type}} {{base.request.subType}} {{base.request.data}}</p>
    <br>
    <br>
    <div>
      <button class="button is-link" @click="base.cancel()">Annuleren</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitForAnswer",
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
