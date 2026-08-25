<template>
  <table>
    <thead>
    <tr>
      <th>Кадастровый номер</th>
      <th>Площадь</th>
      <th>Категория</th>
      <th>Скрыть</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="object in objectsStore.objects"
      :key="object.id"
    >
      <td>{{ object.cadastralNumber }}</td>
      <td>{{ object.area }}</td>
      <td>{{ objectTypeLabels[object.type] }}</td>
      <td>
        <input type="checkbox" id="object.id" @change="toggleObjectVisibility(object.id)" />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import {useObjectsStore} from "@/stores/objects.ts";
import type {ObjectType} from "@/types.ts";

const objectsStore = useObjectsStore();

// для отображения в таблице названий обьектов на русском
const objectTypeLabels: Record<ObjectType, string> = {
  house: 'Дом',
  land: 'Участок',
};

function toggleObjectVisibility(id: string) {
  objectsStore.toggleObjectVisibility(id)
}

</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
  flex-shrink: 0;;
  margin-top: auto;
  margin-bottom: 50px;
}

table, th, td {
  border: 1px solid #1f3436;
  padding: 8px;
  text-align: left;
  font-size: 1.1em;
  font-family: Roboto, sans-serif;
}

th {
  background-color: #2563;
  color: #020303;
}

tr:nth-child(even) {
  background-color: rgb(72 140 164 / 0.2);
}

</style>
