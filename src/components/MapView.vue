<template>
  <div ref="mapContainer" class="map-container" >

    <dialog ref="dialog">
      <DetailsObjectDialog
        v-if="selectedObject && !isEditMode"
        :object="selectedObject"
        @close="closeDialog"
        @delete="handleDeleteRequest"
        @update="handleUpdateObject"
      />

      <DynamicForm
        v-else-if="selectedObject && isEditMode"
        :object-type="selectedObject.type"
        :initial-data="selectedObject"
        @submit="handleUpdate"
        @cancel="handleCancelEdit"
      />
    </dialog>

    <dialog ref="dialogDelete" class="dialog-delete">
      <ConfirmDeleteDialog
        @delete="deleteObject"
        @cancel="cancelDelete"
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
import {Feature} from "ol";
import {Geometry} from "ol/geom";
import DetailsObjectDialog from "./DetailsObjectDialog.vue"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.vue"
import DynamicForm from "@/components/DynamicForm.vue";

import { useDrawing } from "@/composables/useDrawig.ts";
import 'ol/ol.css'
import type { ObjectType, MapObject } from "@/types.ts";
import {fromLonLat} from "ol/proj";
import {useObjectsStore} from "@/stores/objects.ts";
import XYZ from "ol/source/XYZ";

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;

const {
  drawLayer,
  startObjectDrawing,
  selectedFeature,
  selectedObjectType,
  cancelDrawing,
  restoreObjectsOnMap,
  centerOnObject,
  deleteObjectFeature,
  updateObjectsVisibility
} = useDrawing();

const selectedObject = ref<MapObject | null>(null);
const dialog = ref<HTMLDialogElement | null>(null);
const objectStore = useObjectsStore();
let isDrawing = true;
const dialogDelete = ref<HTMLDialogElement | null>(null);
const isDeleteDialogOpen = ref(false);
const objectToDeleteId = ref<string | null>(null);
const isEditMode = ref(false);

//закончили рисовать полигон
const emit = defineEmits<{
  drawingFinished: [
    {
      type: ObjectType,
      feature: Feature<Geometry>;
    }
  ]
}>();

onMounted(() => {
  if (!mapContainer.value) return

 map =  new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'https://map47.lenreg.ru/osm_tiles2/{z}/{x}/{y}.png'
        }),
      }),
      drawLayer,
    ],
    view: new View({
      center: fromLonLat([30.3351, 59.9343 ]), // преобразуем координаты из обычных(широта и долгота) в проекцию EPSG:3857
      zoom: 13,
    }),
  });
  map.on('click', (event) => {  // клик по полигону на карте - отрытие диалогового окна
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

// меняем видимость объекта на карте
function handleToggleObjectVisibility() {
  updateObjectsVisibility();
}

// Закрываем диалоговое окно
const closeDialog = () => {
  dialog.value?.close();
  selectedObject.value = null;
};

// Клик удалить в диалоговом окне - открытие окна подтверждения
function handleDeleteRequest (id: string) {
  objectToDeleteId.value = id;

  isDeleteDialogOpen.value = true;
  dialogDelete.value?.showModal();
}

// Удаляем объект из хранилища и карты
function deleteObject() {
  if (!objectToDeleteId.value) {
    return;
  }

  const id = objectToDeleteId.value;

  objectStore.removeObject(id);
  deleteObjectFeature(id);
  isDeleteDialogOpen.value = false;
  objectToDeleteId.value = null;

  dialogDelete.value?.close();
  dialog.value?.close();
  selectedObject.value = null;
}

// открываем окно редактирования
const handleUpdateObject = () => {
  isEditMode.value = true;
}

// сохраняем изменения в стор
const handleUpdate = (data: Record<string, unknown>): void => {
  if (!selectedObject.value) return;

  objectStore.updateObject(
    selectedObject.value.id,
    data
  );

  isEditMode.value = false;
};

// закрываем окно редактирования
const handleCancelEdit = () => {
  isEditMode.value = false;
};

// закрываем окно подтверждения удаления
function cancelDelete() {
  isDeleteDialogOpen.value = false;
  dialogDelete.value?.close();

  objectToDeleteId.value = null;
}

// делает доступной функции рисования, центрирования и удаления полигона извне
defineExpose({
  startDrawing,
  cancelObjectDrawing,
  centerMapOnObject,
  handleToggleObjectVisibility
});

</script>

<style scoped>
.map-container {
  width: 100%;
  grid-row: 2;
  grid-column: 2;
}

dialog {
  border: none;
  padding: 10px;
  border-radius: 15px;
}

</style>
