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
          <p>Session: {{session.sesssion_id}}</p>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["session"])
  },
  components: {
    HelloWorld
  },
  methods: {},
  mounted() {}
};
</script>
