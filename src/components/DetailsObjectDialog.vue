<template>
  <div class="dialog-container">
    <p>Тип: {{ objectTypeLabels[object.type] }}</p>
    <p>Площадь: {{ object.area }}</p>
    <p>Кадастровый номер: {{ object.cadastralNumber }}</p>
    <p>Этажей: {{ object.floors ?? '-' }}</p>
    <p>Материал стен: {{object.wallMaterial
      ? objectWallMaterial[object.wallMaterial]
      : '—'}}</p>
    <p>Категория: {{ object.category ? objectCategory[object.category] : '-' }}</p>
    <p>Разрешённое использование: {{ object.allowedUsage ?? '-' }}</p>
    <p>Форма собственности: {{ object.ownershipType ? objectOwnershipType[object.ownershipType] : '-' }}</p>
    <button @click="emit('close')">
      Закрыть
    </button>
    <button >
      Удалить
    </button>
  </div>
</template>

<script setup lang="ts">
import type {MapObject } from "@/types.ts";
import {objectTypeLabels, objectOwnershipType, objectCategory, objectWallMaterial} from "@/constants/ObjectLabels.ts";

defineProps<{
  object: MapObject,
}>();


const emit = defineEmits<{close: []}>()

</script>

<style scoped>

.dialog-container {
  width: 250px;
  height: 250px;

}
</style>
