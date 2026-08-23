<template>
  <SidebarView @select-object="startDrawing"/>
  <MapView ref="mapRef"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MapView from "@/components/MapView.vue";
import SidebarView from "@/components/SidebarView.vue";

const mapRef = ref()

function startDrawing(type: "house" | "plot") {
  mapRef.value.startDrawing(type);
}
</script>
