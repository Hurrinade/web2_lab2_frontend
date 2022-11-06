<template>
  <div class="login-container">
    <div class="form-container">
      <form action="" @submit.prevent="onSubmit">
        <input
          id="sql-text"
          type="text"
          v-model="username"
          placeholder="...Username"
        />
        <input
          id="sql-text"
          type="password"
          v-model="password"
          placeholder="...Password"
        />
        <div>
          <input
            style="margin-right: 1em"
            id="toggle-atack"
            type="checkbox"
            v-model="brokenAuthToggle"
          />
          <label for="toggle-atack">Toggle atack option</label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <div v-if="isLoading" class="loading">...Loading...</div>
      <div v-if="!isLoading" class="notification" style="color: #f3d660">
        {{ responseMsg.msg }}
      </div>
      <div
        v-if="responseMsg.cookie"
        class="cookie-info"
        style="margin-top: 5em"
      >
        <h3>
          Only to show what cookie has when session is created. 'This comes from
          server'
        </h3>
        <br />
        <span style="color: #f3d660">{{ responseMsg.cookie }}</span>
      </div>
    </div>
    <div class="info">
      <div>To test use: (marko, password123)</div>
      <span style="color: #ff4343"
        >Some Broken auth implemented features with passwords</span
      >
      <ul>
        <li>Weak password (password123)</li>
        <li>GET request for form submit</li>
        <li>No login timer after 3 failed attempts</li>
        <li>Error message with a lot of info</li>
        <li>Session cookie unprotected</li>
      </ul>

      <div style="margin-top: 1em">To test use: (marko, ^Ys358J7XnDKr*Yc)</div>
      <span style="color: #18ff47"
        >Fixed auth implemented features with passwords</span
      >
      <ul>
        <li>Strong password (^Ys358J7XnDKr*Yc)</li>
        <li>POST request for form submit</li>
        <li>Login timer after 3 failed attempts</li>
        <li>Error message with low info</li>
        <li>
          Session cookie:
          <ul class="inside-ul">
            <li>age</li>
            <li>expires</li>
            <li>httponly</li>
            <li>secure</li>
            <li>sameSite</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useGlobalsStore } from "../stores/globals";

export default defineComponent({
  setup() {
    const brokenAuthToggle = ref(false);
    const username = ref("");
    const password = ref("");
    const responseMsg = ref("");
    const globals = useGlobalsStore();
    const isLoading = ref(false);

    const onSubmit = async () => {
      const dataToSend = { username: username.value, password: password.value };

      isLoading.value = true;
      if (brokenAuthToggle.value) {
        const resp = await fetch(
          `${globals.localUrl}/data/authNotProtected?` +
            new URLSearchParams(dataToSend),
          {
            method: "GET",
            mode: "cors",
          }
        );

        const data = await resp.json();
        responseMsg.value = data;
      } else {
        const resp = await fetch(`${globals.localUrl}/data/authProtected`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        const data = await resp.json();
        responseMsg.value = data;
      }
      isLoading.value = false;
    };

    return {
      isLoading,
      responseMsg,
      brokenAuthToggle,
      username,
      password,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.login-container {
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: start;
  width: 70em;
  height: 40em;
  gap: 5em;
  font-weight: 600;
  letter-spacing: 0.15em;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  letter-spacing: 0.15em;
}

.info {
  padding: 3em;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #46627e;
  width: 70em;
  height: 42em;
  font-size: 0.9em;
  gap: 1em;
  letter-spacing: 0.15em;
}

.cookie-container {
  padding: 3em;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #46627e;
  width: 40em;
  height: 10em;
  font-size: 0.9em;
  gap: 1em;
  letter-spacing: 0.15em;
}

ul {
  display: flex;
  gap: 1em;
  flex-direction: column;
  align-items: start;
}

.inside-ul {
  padding: 1em;
  display: flex;
  gap: 0.5em;
  flex-direction: column;
  align-items: start;
}

ul > li {
  font-size: 0.8em;
  color: rgb(255, 216, 166);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  align-items: center;
  margin: 1em;
}

button,
input[type="submit"] {
  padding: 0.5em;
  border-radius: 1em;
  cursor: pointer;
  width: 10em;
  height: 3em;
  border: none;
  color: white;
  background-color: #3e5a77;
}

button:hover,
input[type="submit"]:hover {
  background-color: #515151;
}

input[type="text"],
input[type="password"] {
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