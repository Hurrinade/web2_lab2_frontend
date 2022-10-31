<template>
  <div class="data-container">
    {{ data }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const sqlInjection = ref(false);
    const sqlText = ref("");

    const onSubmit = () => {
      console.log("submit");
      console.log(sqlInjection.value, sqlText.value);
    };

    return {
      sqlInjection,
      sqlText,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.injection-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85em;
  height: 55em;
  font-weight: 600;
  letter-spacing: 0.15em;
}
</style>