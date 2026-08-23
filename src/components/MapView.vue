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

import { useDrawing } from "@/composables/useDrowig.ts";
import 'ol/ol.css'
import type { ObjectType } from "@/types.ts";

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;

const {
  drawLayer,
  startObjectDrawing,
} = useDrawing();

onMounted(() => {
  if (!mapContainer.value) return

 map =  new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      drawLayer,
    ],
    view: new View({
      center: [30.327590900146554, 60.0356849473825 ], // TODO: исправить координаты
      zoom: 15,
    }),
  });
});

// функция рисования полигона, которая вызывается при клике на кнопку выбора обьекта(дом/участок)
function startDrawing(type: ObjectType) {
  if (!map) return;

  startObjectDrawing(map, type);
}

// делает доступной функцию рисования извне
defineExpose({
  startDrawing,
});

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  grid-row: 2;
  grid-column: 2;
}
</style>
