<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          DECODE
        </h1>
        <h2 class="subtitle">
          Digital Identity
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["session"])
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>
