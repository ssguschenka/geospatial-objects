<template>
  <div class="panel">
  <AddObjectDropdown @select="addObject"/>
  </div>
</template>

<script setup lang="ts">
import AddObjectDropdown  from "./AddObjectDropdown.vue"
import {Draw} from "ol/interaction";

function addObject (type: string) {
  console.log(type)

  if (type) {
    const draw = new Draw({
      source: vectorSource,
      type: 'Polygon',
    })
    map.addInteraction(draw)
  }
}
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row: 1 / 3;
  grid-column: 1;
  //border: 2px solid #2563;
  padding: 20px;
}
</style>
