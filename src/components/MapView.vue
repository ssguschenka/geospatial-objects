<template>
  <div ref="mapContainer" class="map-container" >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import 'ol/ol.css'

const mapContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!mapContainer.value) return

  new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 1,
    })
  })
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: 2;
}
</style>
