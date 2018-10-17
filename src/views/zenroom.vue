<template>
    <div class="has-text-centered">
        <button class="button" @click="run()">
            Run Zenroom
        </button>
        <br>
        <div>
            Result: [{{result}}]
        </div>
    </div>
</template>

<script>
export default {
  name: "zenroom",
  data() {
    return {
      result: ""
    };
  },
  methods: {
    run() {
      window.Module = {
        ...window.Module,
        print: text => (this.result = text),
        exec_ok: () => (this.result += " OK"),
        exec_error: () => (this.result += " ERROR")
      };

      const zenroom = function() {
        const keys = null;
        const data = null;
        const conf = null;
        const script = "print('Hi there')";

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      zenroom();
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>
