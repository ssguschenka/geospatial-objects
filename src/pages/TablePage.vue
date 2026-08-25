<template>
  <div class="wrapper">
    <h1 class="table-title">Все объекты</h1>

    <div class="tabs">
      <button
        :class="{ active: selectedType === 'all' }"
        @click="selectedType = 'all'"
      >
        Все
      </button>

      <button
        :class="{ active: selectedType === 'house' }"
        @click="selectedType = 'house'"
      >
        Дома
      </button>

      <button
        :class="{ active: selectedType === 'land' }"
        @click="selectedType = 'land'"
      >
        Участки
      </button>
    </div>

    <DetailedTable :objects="filteredObjects"/>
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import DetailedTable from "@/components/DetailedTable.vue";
import { useObjectsStore } from '@/stores/objects'

const objectsStore = useObjectsStore();
const selectedType = ref<'all' | 'house' | 'land'>('all');

const filteredObjects = computed(() => {
  if (selectedType.value === 'all') {
    return objectsStore.objects
  }

  return objectsStore.objects.filter(
    object => object.type === selectedType.value
  )
})
</script>

<style scoped>
.wrapper {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3em;
}

.table-title {
  font-family: Roboto, sans-serif;
  font-size: 2em;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

}

.tabs button {
  padding: 10px 20px;
  border: 1px solid #2563;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 1.1em;
}

.tabs button.active {
  background: #2563;
}
</style>
