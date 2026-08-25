<template>
  <div class="panel">
  <AddObjectDropdown @select="handleObjectSelect"/>
    <DynamicObjectForm v-if="isFormOpen && objectType" :object-type="objectType"  @submit="handleSubmit" @cancel="handleCancel" />
    <ObjectsTable />
  </div>
</template>

<script setup lang="ts">
import AddObjectDropdown  from "./AddObjectDropdown.vue"
import type { ObjectType, ObjectData } from "@/types.ts";
import DynamicObjectForm from "@/components/DynamicObjectForm.vue";
import ObjectsTable from "@/components/ObjectsTable.vue";

defineProps<{
  isFormOpen: boolean;
  objectType: ObjectType | null;
}>()

const emit = defineEmits<{selectObject: [type: ObjectType]; cancel: []; submit: [data: ObjectData]}>();

// выбрали тип участка
function handleObjectSelect (type: ObjectType) {
  emit("selectObject", type);
}

const handleSubmit = (data: ObjectData) => {
  console.log("handleSubmit", data);
  emit("submit", data);
}

// закрываем форму и удаляемм полигон
const handleCancel = () => {
  emit("cancel");
}

</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  grid-row: 2 / 3;
  grid-column: 1;
  padding: 20px;
}

</style>
