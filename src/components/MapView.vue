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
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {Draw} from "ol/interaction";

import 'ol/ol.css'

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;

const drawSource = new VectorSource()

const drawLayer =new VectorLayer({
  source: drawSource,
})

let draw: Draw | null = null;

function startDrawing(type: "house" | "plot") {
  console.log("выбоан обьект", type)

  if(!map) return

//если draw уже был включен - удаляем его
  if (draw) {
    map.removeInteraction(draw);
  }

  draw = new Draw({
    source: drawSource,
    type: "Polygon",
  });

  map.addInteraction(draw);

  draw.on("drawend", (event) => {
    console.log("нарисован", event.feature)
  })
}

defineExpose({
  startDrawing,
})

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
      center: [-11000000, 4600000],
      zoom: 15,
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
