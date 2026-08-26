<template>
  <div ref="mapContainer" class="map-container" >

    <dialog ref="dialog">
      <DetailsObjectDialog
        v-if="selectedObject"
        :object="selectedObject"
        @close="closeDialog"
      />
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {Feature} from "ol";
import {Geometry} from "ol/geom";
import DetailsObjectDialog from "./DetailsObjectDialog.vue"

import { useDrawing } from "@/composables/useDrawig.ts";
import 'ol/ol.css'
import type { ObjectType, MapObject } from "@/types.ts";
import {fromLonLat} from "ol/proj";
import {useObjectsStore} from "@/stores/objects.ts";

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;

//закончили рисовать полигон
const emit = defineEmits<{
  drawingFinished: [
    {
      type: ObjectType,
      feature: Feature<Geometry>;
    }
  ]
}>();

const {
  drawLayer,
  startObjectDrawing,
  selectedFeature,
  selectedObjectType,
  cancelDrawing,
  restoreObjectsOnMap,
  centerOnObject
} = useDrawing();

const selectedObject = ref<MapObject | null>(null);
const dialog = ref<HTMLDialogElement | null>(null);
const objectStore = useObjectsStore();


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
      zoom: 13,
    }),
  });
  map.on('click', (event) => {
    map?.forEachFeatureAtPixel(event.pixel, (feature) => {
      const objectId = feature.get('objectId')

      if (!objectId || !isDrawing) {
        return
      }

      selectedObject.value = objectStore.getObjectById(objectId) ?? null;
      dialog.value?.showModal();
    })
  })
  restoreObjectsOnMap()
});

// Закрываем диалоговое окно
const closeDialog = () => {
  dialog.value?.close();
  selectedObject.value = null;
};

let isDrawing = true;

// функция рисования полигона, которая вызывается при клике на кнопку выбора обьекта(дом/участок)
function startDrawing(type: ObjectType) {
  if (!map) return;
  startObjectDrawing(map, type);
  isDrawing = false;
}

// При клике в форме "отмена" - полигон удаляется с карты
function cancelObjectDrawing() {
  if (!map) return;
  cancelDrawing();
}

// устанавливаем наблюдатель за  за свойством selectedFeature
// Второй аргумент — это колбэк-функция, которая выполняется при изменении значения selectedFeature
watch(selectedFeature, (feature) => {
  if(!feature || !selectedObjectType.value) {
    return
  }

  isDrawing = true;
  emit('drawingFinished', {
    type: selectedObjectType.value,
    feature: selectedFeature.value as Feature<Geometry>,
  })
});

// Центрируем карту на выбранном объекте в таблице
function centerMapOnObject(id: string) {
  if (!map) {
    return;
  }

  centerOnObject(map, id);
}


// делает доступной функции рисования и удаления полигона извне
defineExpose({
  startDrawing,
  cancelObjectDrawing,
  centerMapOnObject,
});

</script>

<style scoped>
.map-container {
  width: 100%;
  grid-row: 2;
  grid-column: 2;
}
</style>
