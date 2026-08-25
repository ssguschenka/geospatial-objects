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

      <td>{{ object.floors ?? '—' }}</td>

      <td>{{
          object.wallMaterial
            ? objecteWallMaterial[object.wallMaterial]
            : '—'
        }}</td>

      <td>{{
          object.category
            ? objectCategory[object.category] : '—' }}</td>

      <td>{{ object.allowedUsage ?? '—' }}</td>

      <td>{{
          object.ownershipType
          ? objectOwnershipType[object.ownershipType] : '—' }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type {MapObject, ObjectType, WallMaterial, Category, OwnershipType} from '@/types'

defineProps<{
  objects: MapObject[]
}>()

const objectTypeLabels: Record<ObjectType, string> = {
  house: 'Дом',
  land: 'Участок',
}

const objecteWallMaterial: Record<WallMaterial, string> = {
  brick: 'Кирпич',
  panel: 'Панель',
  monolith: 'Монолит',
  wood: 'Дерево'
}

const objectCategory: Record<Category, string> = {
  agriculture: 'Сельхозназначение',
  settlement: 'Населенные пункты',
  industrial: 'Промышленное'
}

const objectOwnershipType: Record<OwnershipType, string> = {
  state: 'Государственная',
  municipal: 'Муниципальная',
  private: 'Частная',
}

</script>

<style scoped>

table {
  width: 70%;
  border-collapse: collapse;
  flex-shrink: 0;;
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
