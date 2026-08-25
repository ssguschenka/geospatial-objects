<template>
  <div class="dialog-container">
    <p>Тип: {{ objectTypeLabels[object.type] }}</p>
    <p>Площадь: {{ object.area }}</p>
    <p>Кадастровый номер: {{ object.cadastralNumber }}</p>
    <p>Этажей: {{ object.floors ?? '—' }}</p>
    <p>Материал: {{ object.wallMaterial ?? '—' }}</p>
    <button @click="emit('close')">
      Закрыть
    </button>
  </div>
</template>

<script setup lang="ts">
import type {MapObject, ObjectType } from "@/types.ts";

defineProps<{
  object: MapObject,
}>();

const objectTypeLabels: Record<ObjectType, string> = {
  house: 'Дом',
  land: 'Участок',
}

const emit = defineEmits<{close: []}>()

</script>

<style scoped>

.dialog-container {
  width: 250px;
  height: 250px;

}
</style>
