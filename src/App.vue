<template>
  <div id="app" class="container">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="./assets/decode-logo.png">
        </a>

        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>

      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/">Home</router-link>
          </a>
          <a class="navbar-item">
            <router-link to="/about">About</router-link>
          </a>
        </div>

        <div class="navbar-end">
          <!-- navbar items -->
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$primary: #8c67ef;
$primary-invert: findColorInvert($primary);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
