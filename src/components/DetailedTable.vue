<template>
  <table>
    <thead>
    <tr>
      <th>Кадастровый номер</th>
      <th>Тип</th>
      <th>Площадь</th>
      <th>Этажи</th>
      <th>Материал стен</th>
      <th>Категория</th>
      <th>Разрешённое использование</th>
      <th>Форма собственности</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="object in objects"
      :key="object.id"
    >
      <td>{{ object.cadastralNumber }}</td>

      <td>
        {{ objectTypeLabels[object.type] }}
      </td>

      <td>{{ object.area }}</td>

      <td>{{ object.floors ?? '-' }}</td>

      <td>{{
          object.wallMaterial
            ? objectWallMaterial[object.wallMaterial]
            : '-'
        }}</td>

      <td>{{
          object.category
            ? objectCategory[object.category] : '-' }}</td>

      <td>{{ object.allowedUsage ?? '-' }}</td>

      <td>{{
          object.ownershipType
          ? objectOwnershipType[object.ownershipType] : '-' }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type {MapObject } from '@/types'
import {
  objectTypeLabels,
  objectWallMaterial,
  objectCategory,
  objectOwnershipType,
} from '@/constants/ObjectLabels.ts';

defineProps<{
  objects: MapObject[]
}>()

</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
  flex-shrink: 0;;
}

table, th, td {
  border: 1px solid #1f3436;
  padding: 8px;
  text-align: left;
  font-size: clamp(10px, calc(8.919px + 0.338vw), 15px);
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
