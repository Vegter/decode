<template>
  <div id="app" class="container">

    <div id="navbar">
        <div v-if="navPopup" id="popup">
          <div id="navbar-header">
            <a href="#" class="back-button"><img src="./assets/arrow_back.svg"></a>
            <h1>{{ pageTitle }}</h1>
          </div>
        </div>
        <div v-else id="main">
          <div id="navbar-header">
            <h1>{{ pageTitle }}</h1>
          </div>
          <div id="tabs">
                <a href="#" id="tab-id" class="tab-active" ><img src="./assets/id_selected.svg"></a>
                <a href="#" id="tab-claim"><img src="./assets/question_unselected.svg"></a>
          </div>
        </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Decode",
  data() {
    return {
      pageTitle: "Personal Identity",
      navPopup : false // true of false ( = main )
    };
  },
  components: {},
  methods: {},
  watch: {
    /*
    $route() {
      document.getElementById("navMenu").classList.remove("is-active");
      document.getElementById("navBurger").classList.remove("is-active");
    }
    */
  },
  mounted() {
    const sessionId = this.$route.query.session;
    if (sessionId) {
      // this.$router.push('/readQR');
      this.$router.push({ path: "readQR", query: { session: sessionId } });
    }
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #8c67ef;
$primary-invert: findColorInvert($primary);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";

@font-face {
    font-family: AvenirNextMedium;
    src: url("./assets/AvenirNextLTPro-Medium.woff") format("woff");
}

@font-face {
    font-family: AvenirNext;
    src: url("./assets/AvenirNextLTPro-Regular.woff") format("woff");
}

body {
  margin: 0;
  padding: 0;
  background: #f9fafc;
  font-family: 'AvenirNext', 'arial', 'sans-serif';
}

#app {
    display: block;
    width: 100%;
    height: 100vh;
    overflow: auto;
    background: #f9fafc;
}

/* main navbar */

#navbar {
  background:#f9fafc;
  text-align: center;
  padding: 0;
}

#navbar-header {
  display: block;
  height: 7vh;
}

#navbar #main {
  display: block;
  border-bottom: 2px solid #bdbdbd;
}

#navbar #popup {
  display: block;
}

#navbar h1 { 
  font-family: 'AvenirNextMedium', 'arial', 'sans-serif';
  font-size: 1.1em;
  font-weight: normal;
  color: #494949;
  padding: 0;
  margin: 0;
  line-height: 7vh;
}

a.back-button {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 10px;
}

a.back-button img {
  display: block;
  height: 25px;
  width: auto;
}

div#tabs {
  display: block;
  height: 7vh;
  width: 100%;
  position: relative;
}

div#tabs a {
  display: block;
  width: 50%;
  height: 100%;
  border-bottom: 3px solid transparent;
}

div#tabs a img {
  display: block;
  height: 60%;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1vh;
}

div#tabs a#tab-id {
    position: absolute;
    left: 0;
    top: 0;
}

div#tabs a#tab-claim {
    position: absolute;
    right: 0;
    top: 0;
}

.tab-active {
    border-bottom: 2px solid #f5a523 !important;
}


</style>
