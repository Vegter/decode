<template>
    <div class="answer" :style="{'border-color':color}">
        <div v-if="pictureUrl && status === 'ACCEPTED' && valid" >
            <img :src="pictureUrl" width="50%">
        </div>
        <div>
            <h1 class="title">Antwoord</h1>
            <h2 class="subtitle">{{question}}</h2>

            <div class="has-text-centered">
                <div v-if="status === 'ACCEPTED'">
                    <p v-if="valid" class="isOK">
                        <span><i class="fa fa-check fa-3x" aria-hidden="true"></i></span>
                        &nbsp;
                        <span>OK</span>
                    </p>
                    <p v-else class="isNotOK">
                        <span><i class="fa fa-bolt fa-3x" aria-hidden="true"></i></span>
                        &nbsp;
                        <span>Nee</span>
                    </p>
                </div>
                <div v-else-if="status === 'DENIED'">
                    <p class="isNotOK">
                        <span><i class="fa fa-times fa-3x" aria-hidden="true"></i></span>
                        &nbsp;
                        <span>Vraag is geweigerd</span>
                    </p>
                </div>
            </div>

            <br>
        </div>
    </div>
</template>

<script>
export default {
  name: "Answer",
  props: ["question", "status", "valid", "color", "pictureUrl"]
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
