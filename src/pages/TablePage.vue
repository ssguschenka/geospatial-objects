<template>
  <div class="wrapper">
    <h1 class="table-title">Все объекты</h1>

    <div class="tabs">
      <button
        :class="{ active: selectedType === 'all' }"
        class="btn"
        @click="selectedType = 'all'"
      >
        Все
      </button>

      <button
        class="btn"
        :class="{ active: selectedType === 'house' }"
        @click="selectedType = 'house'"
      >
        Дома
      </button>

      <button
        class="btn"
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
  padding: clamp(15px, calc(11.757px + 1.014vw), 30px);
  display: flex;
  //align-items: center;
  flex-direction: column;
  gap: clamp(15px, calc(11.757px + 1.014vw), 30px);
  overflow-x: scroll;

}

.table-title {
  font-family: Roboto, sans-serif;
  font-size: 3em;
  text-align: center;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

}

.btn {
  padding: 10px 20px;
  border: 1px solid #2563;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 1.1em;
}

.btn:hover {
  background: rgb(82 171 206 / 0.73);
}

.btn.active {
  background: #2563;
}
</style>
