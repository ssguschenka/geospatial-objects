<template>
  <div class="panel">
  <AddObjectDropdown @select="handleObjectSelect"/>
    <DynamicObjectForm v-if="isFormOpen && objectType" :object-type="objectType"  @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>

<script setup lang="ts">
import AddObjectDropdown  from "./AddObjectDropdown.vue"
import type { ObjectType } from "@/types.ts";
import DynamicObjectForm from "@/components/DynamicObjectForm.vue";

defineProps<{
  isFormOpen: boolean;
  objectType: ObjectType | null;
}>()

const emit = defineEmits<{selectObject: [type: ObjectType]}>();

function handleObjectSelect (type: ObjectType) {
  emit("selectObject", type)
}

const handleSubmit = (data) => {
  console.log("handleSubmit", data);
}

const handleCancel = () => {
  console.log("handleCancel");
}

</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  grid-row: 1 / 3;
  grid-column: 1;
  padding: 20px;
}
</style>
