<template>
  <SidebarView @select-object="startDrawing" :is-form-open="isFormOpen" :object-type="selectedObjectType" />
  <MapView ref="mapRef" @drawing-finished="handleDrawingFinished"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "@/components/MapView.vue";
import SidebarView from "@/components/SidebarView.vue";
import type { ObjectType } from "@/types.ts";
// import {Feature} from "ol";
// import {Geometry} from "ol/geom";

const mapRef = ref();

const isFormOpen = ref(false);
const selectedObjectType = ref<ObjectType | null>(null);

function startDrawing(type: ObjectType) {
  mapRef.value.startDrawing(type);
}

function handleDrawingFinished(payload: {
  type: ObjectType
}) {
  selectedObjectType.value = payload.type;

  isFormOpen.value = true;
}

</script>
