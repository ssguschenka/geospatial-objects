<template>
  <div ref="mapContainer" class="map-container" >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import { useDrawing } from "@/composables/useDrawig.ts";
import 'ol/ol.css'
import type { ObjectType } from "@/types.ts";
import {fromLonLat} from "ol/proj";

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;

//закончили рисовать полигон
const emit = defineEmits<{
  drawingFinished: [
    {
      type: ObjectType
    }
  ]
}>();

const {
  drawLayer,
  startObjectDrawing,
  selectedFeature,
  selectedObjectType,
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
      center: fromLonLat([30.3351, 59.9343 ]), // преобразуем координаты из обычных(широта и долгота) в проекцию EPSG:3857
      zoom: 15,
    }),
  });
});

// функция рисования полигона, которая вызывается при клике на кнопку выбора обьекта(дом/участок)
function startDrawing(type: ObjectType) {
  if (!map) return;
  startObjectDrawing(map, type);
}

// устанавливаем наблюдатель за  за свойством selectedFeature
// Второй аргумент — это колбэк-функция, которая выполняется при изменении значения selectedFeature
watch(selectedFeature, (feature) => {
  if(!feature || !selectedObjectType.value) {
    return
  }

  emit('drawingFinished', {
    type: selectedObjectType.value
  })
})

// делает доступной функцию рисования извне
defineExpose({
  startDrawing
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
