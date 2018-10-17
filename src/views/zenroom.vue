<template>
    <div class="has-text-centered">
        <button class="button" @click="run('Encrypt')">
            Encrypt
        </button>
        <br>
        <div>
            Result
            <pre>{{encrypted}}</pre>
        </div>
        <button class="button" @click="run('Decrypt')">
            Decrypt
        </button>
        <br>
        <div>
            Result
            <pre>{{decrypted}}</pre>
        </div>
        <br>
        <div>
            Last result: {{result}}
        </div>
    </div>
</template>

<script>
import _keys from "raw-loader!../zenroom/keypair.keys";
import _encrypt from "raw-loader!../zenroom/encrypt_message.lua";
import _decrypt from "raw-loader!../zenroom/decrypt_message.lua";
import _attributes from "raw-loader!../zenroom/attributes.data";

export default {
  name: "zenroom",
  data() {
    return {
      result: "",
      encrypted: "",
      decrypted: ""
    };
  },
  methods: {
    run(method) {
      window.Module = {
        ...window.Module,
        exec_ok: () => (this.result += " OK"),
        exec_error: () => (this.result += " ERROR")
      };

      const encrypt = () => {
        window.Module.print = text => (this.encrypted = text);

        const keys = _keys;
        const data = _attributes;
        const conf = null;
        const script = _encrypt;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      const decrypt = () => {
        window.Module.print = text => (this.decrypted = text);

        const keys = _keys;
        const data = this.encrypted;
        const conf = null;
        const script = _decrypt;

        window.Module.ccall(
          "zenroom_exec",
          "number",
          ["string", "string", "string", "string", "number"],
          [script, conf, keys, data, 1]
        );
      };

      if (method === "Encrypt") {
        encrypt();
      } else if (method === "Decrypt") {
        decrypt();
      }
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped>
</style>
