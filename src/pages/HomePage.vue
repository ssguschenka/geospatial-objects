<template>
  <SidebarView @select-object="startDrawing"/>
  <MapView ref="mapRef"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "@/components/MapView.vue";
import SidebarView from "@/components/SidebarView.vue";
import type { ObjectType } from "@/types.ts";

const mapRef = ref()

function startDrawing(type: ObjectType) {
  mapRef.value.startDrawing(type);
}
</script>
