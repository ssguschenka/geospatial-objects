<template>
  <div class="panel">
  <AddObjectDropdown @select="handleObjectSelect"/>
  </div>
</template>

<script setup lang="ts">
import AddObjectDropdown  from "./AddObjectDropdown.vue"
import type { ObjectType } from "@/types.ts";

const emit = defineEmits<{selectObject: [type: ObjectType]}>();

function handleObjectSelect (type: ObjectType) {
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
  padding: 20px;
}
</style>
