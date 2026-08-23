import Map from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import {Draw} from "ol/interaction";
import type { ObjectType } from "@/types.ts";

// Функция с логикой рисования полигонов на карте
export function useDrawing() {
  const drawSource = new VectorSource();

  const drawLayer =new VectorLayer({
    source: drawSource,
  });

  let draw: Draw | null = null;

  /**
   * функция запуска рисования на карте
   * @param map - сама карта
   * @param type - тип выбранного обьекта
   */
  function startObjectDrawing(map: Map, type: ObjectType) {
    console.log("выбран обьект", type)

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

      map.removeInteraction(newDraw);
      draw = null;
    });
  }

  return {
    drawSource,
    drawLayer,
    startObjectDrawing,
  }
}


