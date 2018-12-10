<template>
  <div>
    <div v-if="base.status == 'STARTED'">
      <h1 class="title">Aan het wachten op antwoord...</h1>
    </div>
    <br>
    <h1>{{base.question}}</h1>
    <br>

    <div v-if="base.status == 'ACCEPTED'">
      <div v-if="valid" class="answer" :style="{'border-color': base.color}">
        <p>Antwoord ontvangen en valide</p>
      </div>
      <div v-if="!valid">
        <p>Antwoord ontvangen maar invalide</p>
      </div> 
    </div>
    <div v-if="base.status == 'DENIED'">
      <p>Vraag is geweigerd</p>
    </div>
    <!-- <div class="answer" :style="{'border-color':base.color}">
    <div v-if="pictureUrl && status === 'ACCEPTED' && base.valid">
      <img :src="pictureUrl" width="50%">
    </div>
    <div>
      <h1 class="title">Antwoord</h1>
      <h2 class="subtitle">{{base.question}}</h2>

      <div class="has-text-centered">
        <div v-if="base.status === 'ACCEPTED'">
          <p v-if="base.valid" class="isOK">
            <span>
              <i class="fa fa-check fa-3x" aria-hidden="true"></i>
            </span>
            &nbsp;
            <span>OK</span>
          </p>
          <p v-else class="isNotOK">
            <span>
              <i class="fa fa-bolt fa-3x" aria-hidden="true"></i>
            </span>
            &nbsp;
            <span>Nee</span>
          </p>
        </div>
        <div v-else-if="base.status === 'DENIED'">
          <p class="isNotOK">
            <span>
              <i class="fa fa-times fa-3x" aria-hidden="true"></i>
            </span>
            &nbsp;
            <span>Vraag is geweigerd</span>
          </p>
        </div>
      </div>

      <br>
    </div>
    </div> -->
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
