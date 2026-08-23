<template>
  <div class="panel">
  <AddObjectDropdown @select="handleObjectSelect"/>
  </div>
</template>

<script setup lang="ts">
import AddObjectDropdown  from "./AddObjectDropdown.vue"
const emit = defineEmits<{selectObject: [type: "house" | "plot"]}>();

function handleObjectSelect (type: "house" | "plot") {
  emit("selectObject", type)
}
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row: 1 / 3;
  grid-column: 1;
  //border: 2px solid #2563;
  padding: 20px;
}
</style>
