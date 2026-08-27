<template>
  <div class="table-wrapper">
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
      :class="{ selected: selectedObjectId === object.id }"
      @click="selectRow(object.id)"
    >
      <td>{{ object.cadastralNumber }}</td>
      <td>{{ object.area }}</td>
      <td>{{ objectTypeLabels[object.type] }}</td>
      <td>
        <input @click.stop type="checkbox" id="object.id"  @change="emit('toggleVisibility', object.id)" />
      </td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useObjectsStore} from "@/stores/objects.ts";
import {objectTypeLabels} from "@/constants/ObjectLabels.ts";

const objectsStore = useObjectsStore();
const emit = defineEmits<{select: [id: string]; toggleVisibility: [id: string]}>();

const selectedObjectId = ref<string | null>(null);

// Клик на строку в таблице
function selectRow(id: string) {
  console.log(objectsStore.getObjectById(id))
  selectedObjectId.value = id;
  emit("select", id);
}

</script>

<style scoped>
.table-wrapper {
  width: 100%;
  flex-shrink: 0;;
  margin-top: auto;
  margin-bottom: 50px;
  max-height: 400px;
  overflow-y: scroll;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
  flex-shrink: 0;
}

table, th, td {
  border: 1px solid #1f3436;
  padding: 8px;
  text-align: left;
  font-size: 1.1em;
  font-family: Roboto, sans-serif;
}

th {
  position: sticky;
  top: 0;
  background-color: rgb(167 199 211);
  color: #020303;
}

tr {
  cursor: pointer;
}

tr:hover {
  font-weight: bold;
}

tr.selected {
  font-weight: bold;
  color: rgb(37 105 54 / 0.92);
}

tr:nth-child(even) {
  background-color: rgb(72 140 164 / 0.1);
}

</style>
