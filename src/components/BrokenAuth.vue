<template>
  <div class="injection-container">
    <LoginPage />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import LoginPage from "./LoginPage.vue";
import { useGlobalsStore } from "../stores/globals";

export default defineComponent({
  components: {
    LoginPage,
  },
  setup() {},
});
</script>

<style scoped>
.info {
  padding: 2em;
  margin-bottom: 3em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: start;
}

.injection-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85em;
  height: 50em;
  font-weight: 600;
  letter-spacing: 0.15em;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  align-items: center;
  margin: 1em;
}

input[type="submit"] {
  border-radius: 1em;
  cursor: pointer;
  width: 10em;
  height: 3em;
  border: none;
  color: white;
  background-color: #3e5a77;
}

input[type="submit"]:hover {
  background-color: #515151;
}

input[type="text"] {
  width: 20em;
  margin: 1em;
  color: white;
  padding: 1em;
  background-color: #3e5a77;
  display: flex;
  justify-content: start;
  border: none;
}
</style>