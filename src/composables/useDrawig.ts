import Map from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {Draw} from "ol/interaction";
import type { ObjectType } from "@/types.ts";
import {ref} from "vue";
import {Feature} from "ol";
import {Geometry} from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import {useObjectsStore} from "@/stores/objects.ts";

// Функция с логикой рисования и удаления полигонов на карте
export function useDrawing() {
  const drawSource = new VectorSource();

  const drawLayer = new VectorLayer({
    source: drawSource,
  });

  let draw: Draw | null = null;

  const selectedFeature = ref<Feature<Geometry> | null>(null);
  const selectedObjectType = ref<ObjectType | null>(null);

  /**
   * функция запуска рисования на карте
   * @param map - сама карта
   * @param type - тип выбранного обьекта
   */
  function startObjectDrawing(map: Map, type: ObjectType) {
    console.log("выбран обьект", type);
    selectedObjectType.value = type; //запоминаем какой обьект рисуем

    //если draw уже был включен - удаляем его
    if (draw) {
      map.removeInteraction(draw);
    }

    const newDraw = new Draw({
      source: drawSource,
      type: "Polygon",
    });

    draw = newDraw;

    map.addInteraction(newDraw);

    // при завершении рисования полигона - удаляем draw
    newDraw.on("drawend", (event) => {
      console.log("нарисован", event.feature);
      selectedFeature.value = event.feature as Feature<Geometry>; //нарисованный обьект

      map.removeInteraction(newDraw);
      draw = null;
    });
  }

  // удаление полигона с карты
  function cancelDrawing() {
    if(selectedFeature.value) {
      drawSource.removeFeature(selectedFeature.value  as Feature<Geometry>);
      selectedFeature.value = null;
    }
  }


  const geoJson = new GeoJSON();
  const objectsStore = useObjectsStore();

  // восстанавливаем нарисованные полигоны на карте
  function restoreObjectsOnMap() {
    objectsStore.objects.forEach((object) => {
      const feature = new Feature({
        geometry: geoJson.readGeometry(object.geometry),
      })

      feature.setProperties({
        objectId: object.id,
        type: object.type,
      })

      drawSource.addFeature(feature)
    })
  }

  return {
    drawLayer,
    startObjectDrawing,
    selectedFeature,
    selectedObjectType,
    cancelDrawing,
    restoreObjectsOnMap
  }
}


