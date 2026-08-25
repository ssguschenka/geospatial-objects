<template>
  <SidebarView @select-object="startDrawing" @cancel="cancelForm" @submit="submitForm" :is-form-open="isFormOpen" :object-type="selectedObjectType" />
  <MapView ref="mapRef" @drawing-finished="handleDrawingFinished"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "@/components/MapView.vue";
import SidebarView from "@/components/SidebarView.vue";
import type { ObjectType, ObjectData, MapObject } from "@/types.ts";
import {Feature} from "ol";
import {Geometry} from "ol/geom";
import { useObjectsStore } from "@/stores/objects.ts";
import GeoJSON from 'ol/format/GeoJSON'

const objectsStore = useObjectsStore();

const mapRef = ref();

const geoJson  = new GeoJSON();

const isFormOpen = ref(false);
const selectedObjectType = ref<ObjectType | null>(null);
const selectedFeature = ref<Feature<Geometry> | null>(null);

// при нажатии выбора участка - открывается рисование полигона
function startDrawing(type: ObjectType) {
  mapRef.value.startDrawing(type);
}

// нарисовали полигон - открылась форма
function handleDrawingFinished(payload: {
  type: ObjectType;
  feature: Feature<Geometry>;
}) {
  selectedObjectType.value = payload.type;
  selectedFeature.value = payload.feature;

  isFormOpen.value = true;
}


// сохраняем данные формы в стор
function submitForm(data: ObjectData) {
  if (!selectedFeature.value || !selectedObjectType.value) {
    return;
  }

  const geometry = geoJson.writeGeometryObject(
    selectedFeature.value.getGeometry()!
  )

  const object: MapObject = {
    id: crypto.randomUUID(),
    type: selectedObjectType.value,
    ...data,
    geometry,
    visible: true,
  };

  objectsStore.addObject(object);

  // сохраняем id обьекта в feature
  selectedFeature.value.setProperties({
    objectId: object.id,
  });

  isFormOpen.value = false;
}

// закрываем форму и удаляем полигон с карты
function cancelForm() {
  isFormOpen.value = false;
  mapRef.value.cancelObjectDrawing();
  selectedFeature.value = null;
  selectedObjectType.value = null;
}

</script>
