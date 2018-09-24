<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          DECODE
        </h1>
        <h2 class="subtitle">
          Digital Identity, {{msg}}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { get_data } from "@/api";

export default {
  name: "home",
  data() {
    return {
      msg: ""
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    async getData() {
      var response = await get_data("");
      this.msg = await response.text();
    }
  },
  async mounted() {
    await this.getData();
  }
};
</script>
