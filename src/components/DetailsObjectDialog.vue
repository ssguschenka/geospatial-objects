<template>
  <div class="dialog-container">
    <button @click="emit('close')" class="dialog-close">X</button>
    <p>Тип: {{ objectTypeLabels[object.type] }}</p>
    <p>Площадь: {{ object.area }}</p>
    <p>Кадастровый номер: {{ object.cadastralNumber }}</p>
    <p>Этажей: {{ object.floors ?? '-' }}</p>
    <p>Материал стен: {{object.wallMaterial
      ? objectWallMaterial[object.wallMaterial]
      : '-'}}</p>
    <p>Категория: {{ object.category ? objectCategory[object.category] : '-' }}</p>
    <p>Разрешённое использование: {{ object.allowedUsage ?? '-' }}</p>
    <p>Форма собственности: {{ object.ownershipType ? objectOwnershipType[object.ownershipType] : '-' }}</p>
    <div class="btn-container">
      <button class="change" @click="emit('update')">
        Изменить
      </button>
      <button class="delete" @click="emit('delete', object.id)">
        Удалить
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {MapObject} from "@/types.ts";
import {objectTypeLabels, objectOwnershipType, objectCategory, objectWallMaterial} from "@/constants/ObjectLabels.ts";

defineProps<{
  object: MapObject,
}>();

const emit = defineEmits<{close: []; delete: [id: string]; update: []}>();

</script>

<style scoped>

.dialog-container {
  width: clamp(300px, calc(235.135px + 20.27vw), 600px);
  box-sizing: border-box;
  position: relative;
  font-family: Roboto, sans-serif;
  font-size: clamp(12px, calc(10.703px + 0.405vw), 18px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(8px, calc(6.054px + 0.608vw), 17px);
}

p {
  background-color: transparent;
}

.btn-container {
  padding-top: 7%;
  display: flex;
  justify-content: space-around;
}

button {
  border: none;
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-size: clamp(14px, calc(12.703px + 0.405vw), 20px);
  padding: 3px 30px;
  transition: box-shadow 0.3s;
}

.dialog-close {
  position: absolute;
  top: -2%;
  right: 0;
  background-color: transparent;
  font-size: clamp(18px, calc(16.919px + 0.338vw), 23px);
  transition: transform 0.2s;
  padding: 0;
}

.dialog-close:hover {
  transform: scale(1.2);
}

.change {
  background-color: rgb(160 211 213 / 0.66);
}

.change:hover {
  box-shadow: 0 0 0 2px rgb(160 211 213);
}

.delete {
  background-color: rgb(217 83 79 / 0.6);
}

.delete:hover {
  box-shadow: 0 0 0 2px rgb(126 35 35);
}

</style>
