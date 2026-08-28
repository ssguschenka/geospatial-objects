<template>
  <div class="panel">
    <AddObjectDropdown @select="handleObjectSelect"/>
    <DynamicForm v-if="isFormOpen && objectType" :validate="validateObjectField" :object-type="objectType"  @submit="handleSubmit" @cancel="handleCancel" />
    <TableObjects  @select="handleSelectRow" @toggleVisibility="handleToggleObjectVisibility"/>
  </div>
</template>

<script setup lang="ts">
import AddObjectDropdown  from "./AddObjectDropdown.vue"
import type { ObjectType, ObjectData } from "@/types.ts";
import DynamicForm from "@/components/DynamicForm.vue";
import TableObjects from "@/components/TableObjects.vue";
import { useObjectsStore } from "@/stores/objects.ts";

defineProps<{
  isFormOpen: boolean;
  objectType: ObjectType | null;
}>()

const emit = defineEmits<{selectObject: [type: ObjectType]; cancel: []; submit: [data: ObjectData]; selectObjectRow: [id: string]; toggleObjectVisibility: [id: string]}>();

// выбрали тип участка
function handleObjectSelect (type: ObjectType) {
  emit("selectObject", type);
}

// Выбрали обьект в таблице
function handleSelectRow (id: string) {
  emit("selectObjectRow", id);
}

// Сохраняем обьект в форме
const handleSubmit = (data: ObjectData) => {
  emit("submit", data);
}

// закрываем форму и удаляемм полигон
const handleCancel = () => {
  emit("cancel");
}

// Изменяем видимость обьекта
const handleToggleObjectVisibility = (id: string) => {
  emit("toggleObjectVisibility", id);
}

const objectStore = useObjectsStore();

const validateObjectField = (
  fieldName: string,
  value: unknown
) => {
  if(fieldName === "cadastralNumber" && objectStore.getObjectByCadastral(String(value))) {
    return "Такой номер уже существует";
  }

  return undefined;
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
  min-width: 0;
  padding: clamp(5px, calc(1.757px + 1.014vw), 20px);
}

</style>
