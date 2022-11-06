<template>
  <div class="injection-container">
    <div class="info">
      <h3>
        Name to return game info:
        <span style="color: red">Call of Duty 4: Modern Warfare 2</span>
      </h3>
      <h3>
        Sql injection to test (<span style="color: #18ff47">tautology</span>):
        <span style="color: red">'OR '1'='1</span>
      </h3>
      <h3>
        Sql injection to test (<span style="color: #18ff47">chain</span>):
        <span style="color: red"
          >'; UPDATE games SET release_date = 2096 WHERE _id = '3
        </span>
        <div style="font-size: 0.8em">
          after this enter game name again to check release_date (year)
        </div>
      </h3>
    </div>
    <form action="" @submit.prevent="onSubmit">
      <label for="sql-text">Enter game name</label>
      <input id="sql-text" type="text" v-model="sqlName" />
      <div>
        <input
          style="margin-right: 1em"
          id="toggle-atack"
          type="checkbox"
          v-model="sqlInjection"
        />
        <label for="toggle-atack">Toggle atack option</label>
      </div>
      <input type="submit" value="Submit" />
    </form>
    <h1 style="margin: 2em 0em 1em 0em">Data to display</h1>
    <div v-if="isLoading" class="loading">...Loading...</div>
    <SqlData :data="fetchedData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import SqlData from "./SqlData.vue";
import { useGlobalsStore } from "../stores/globals";

export default defineComponent({
  components: {
    SqlData,
  },
  setup() {
    const sqlInjection = ref(false);
    const sqlName = ref("");
    const fetchedData = ref("data will be displayed here");
    const globals = useGlobalsStore();
    const isLoading = ref(false);

    const onSubmit = async () => {
      const dataToSend = { name: sqlName.value };

      isLoading.value = true;
      if (sqlInjection.value) {
        const resp = await fetch(`${globals.localUrl}/data/sqlNonprotected`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        const data = await resp.json();
        fetchedData.value = data;
      } else {
        const resp = await fetch(`${globals.localUrl}/data/sqlProtected`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        const data = await resp.json();
        fetchedData.value = data;
      }
      isLoading.value = false;
    };

    return {
      isLoading,
      fetchedData,
      sqlInjection,
      sqlName,
      onSubmit,
    };
  },
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
  height: 40em;
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