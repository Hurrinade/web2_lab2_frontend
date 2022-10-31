<template>
  <!-- <div class="sport">
    <div class="navigation">
      <a class="nav-button" @click="changeTab('table')">Table</a>
      <a class="nav-button" @click="changeTab('fixtures')">Fixtures</a>
      <a class="nav-button" @click="changeTab('results')">Results</a>

      <a v-if="!isAuthenticated" style="margin-left: 40em"><LoginPage /></a>
      <a v-if="isAuthenticated" style="margin-left: 35em"><LogoutPage /></a>
      <UserInfo v-if="isAuthenticated" style="" />
    </div>
    <Loading v-if="isLoading" />
  </div> -->
  <div class="atacks">
    <div class="navigation">
      <a class="nav-button" @click="changeTab('sql')">SQL injection</a>
      <a class="nav-button" @click="changeTab('auth')">Broken Authentication</a>
    </div>
    <SQLinjection v-if="tab === 'sql'" />
    <BrokenAuth v-if="tab === 'auth'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import LoginPage from "./components/LoginPage.vue";
import Loading from "./components/Loading,.vue";
import LogoutPage from "./components/LogoutPage.vue";
import BrokenAuth from "./components/BrokenAuth.vue";
import SQLinjection from "./components/SQLinjection.vue";
import UserInfo from "./components/UserInfo.vue";
import { useGlobalsStore } from "./stores/globals";

import type { Ref } from "vue";

export default defineComponent({
  name: "App",
  components: {
    SQLinjection,
    UserInfo,
    LoginPage,
    LogoutPage,
    Loading,
    BrokenAuth,
  },

  setup(props: any, ctx: any) {
    const tab = ref("sql");
    const isLoading: Ref<boolean> = ref(true);
    const globals = useGlobalsStore();

    const changeTab = (newTab: string) => {
      tab.value = newTab;
    };

    return {
      tab,
      isLoading,
      changeTab,
    };
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body,
html {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #222222;
  color: #e8e8e8;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.atacks {
  background-color: #2c3e50;
  border-radius: 1em;
  height: 55em;
  width: 85em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.navigation {
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #384e64;
}

.nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-decoration: none;
  width: 15em;
  height: 5em;
}

.nav-button:hover {
  cursor: pointer;
  background-color: #445f79;
  text-decoration: none;
}

.error {
  background-color: #445f79;
  color: rgb(255, 0, 0);
}
</style>
