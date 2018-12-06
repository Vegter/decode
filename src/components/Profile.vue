<template>
    <div>
        <img :src="base.picture" width="10%">
        <br><br>

        <h1>Surname</h1>
        <h2>{{base.surname}}</h2>
        <br>

        <h1>Firstname(s)</h1>
        <h2>{{base.firstname}}</h2>
        <br>

        <h1>Date of birth</h1>
        <h2>{{base.dateOfBirth}}</h2>
        <br>

        <h1>Sex</h1>
        <h2>{{base.sex}}</h2>
        <br>

        <h1>Nationality</h1>
        <h2>{{base.nationality}}</h2>
        <br>

        <h1>BSN</h1>
        <h2>{{base.bsn}}</h2>
        <br>

        <button class="button is-link" @click="base.scanQR()">Scan QR</button>
    </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["base"],
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>