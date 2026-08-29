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
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Modify from 'ol/interaction/Modify';
import Collection from 'ol/Collection';

// Функция с логикой полигонов на карте
export function useDrawing() {

  const geoJson = new GeoJSON();
  const objectsStore = useObjectsStore();
  const drawSource = new VectorSource();
  let selectedMapObjectId: string | null = null;

  // Обычный стиль для полигона
  const defaultStyle = new Style({
    fill: new Fill({
      color: "rgb(227 242 246 / 0.51)",
    }),
    stroke: new Stroke({
      color: "#5da2c4",
      width: 2,
    }),
  });

  // Стиль для выбранного полигона
  const selectedStyle  = new Style({
    stroke: new Stroke({
      color: 'rgb(37 105 54 / 0.92)',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgb(130 190 125 / 0.63)',
    }),
  })

  const drawLayer = new VectorLayer({
    source: drawSource,
    style: (feature) => {
      const objectId = feature.get("objectId");

      // Новый полигон, который ещё не сохранён
      if (!objectId) {
        return defaultStyle;
      }

      const object = objectsStore.getObjectById(objectId);
      // Скрываем полигон если visible - false
      if (!object?.visible) {
        return undefined;
      }

      // Выбранный объект
      if (objectId === selectedMapObjectId) {
        return selectedStyle;
      }

      // Обычный объект
      return defaultStyle;
    },
  });

  const modifyFeatures = new Collection<Feature<Geometry>>();

  const modify = new Modify({
    source: drawSource,
    features: modifyFeatures,
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
      selectedFeature.value = event.feature as Feature<Geometry>; //нарисованный обьект

      map.removeInteraction(newDraw);
      draw = null;
    });
  }

  //  Редактирование полигона
  modify.on('modifyend', (event) => {
    event.features.forEach((feature) => {
      const objectId = feature.get('objectId');

      if (!objectId) return;

      const geometry = feature.getGeometry();

      if (!geometry) return;

      const geometryGeoJson = geoJson.writeGeometry(geometry);

      objectsStore.updateObject(objectId, {
        geometry: geometryGeoJson,
      });
    });
  });

  // Получаем объект по id для редактирования
  function getObjectFeature(id: string) {
    return drawSource
      .getFeatures()
      .find(feature => feature.get('objectId') === id);
  }

  function startPolygonModify(map: Map, feature: Feature<Geometry>) {
    modifyFeatures.clear();
    modifyFeatures.push(feature);

    map.addInteraction(modify);
  }

  function stopPolygonModify(map: Map) {
    map.removeInteraction(modify);
    modifyFeatures.clear();
  }

  // удаление полигона с карты
  function cancelDrawing() {
    if(selectedFeature.value) {
      drawSource.removeFeature(selectedFeature.value  as Feature<Geometry>);
      selectedFeature.value = null;
    }
  }

  // восстанавливаем нарисованные полигоны на карте
  function restoreObjectsOnMap() {
    drawSource.clear();

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

  // Центрируем карту на выбранном объекте в таблице
  function centerOnObject(map: Map, id: string) {

    const feature = drawSource.getFeatures().find(
      feature => feature.get("objectId") === id
    );

    if (!feature) {
      console.log("Полигон не найден:", id);
      return
    }

    // Запоминаем выбранный полигон
    selectedMapObjectId = id;

    drawSource.changed();

    const geometry = feature.getGeometry();

    if (!geometry) {
      return;
    }

    map.getView().fit(geometry.getExtent(), {
      duration: 400,
      padding: [50, 50, 50, 50],
      maxZoom: 15,
    });
  }

  function updateObjectsVisibility() {
    drawSource.changed();
  }

  // Удаляем полигон
  function deleteObjectFeature(id: string) {
    const feature = drawSource.getFeatures().find(feature => feature.get("objectId") === id);

    if(!feature) return
    drawSource.removeFeature(feature);
  }

  return {
    drawLayer,
    startObjectDrawing,
    selectedFeature,
    selectedObjectType,
    cancelDrawing,
    restoreObjectsOnMap,
    centerOnObject,
    deleteObjectFeature,
    updateObjectsVisibility,
    startPolygonModify,
    stopPolygonModify,
    getObjectFeature
  }
}


