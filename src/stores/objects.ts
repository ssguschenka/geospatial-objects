import { ref } from 'vue'
import { defineStore } from 'pinia'
import type  { MapObject } from '../types'

export const useObjectsStore = defineStore('objects', () => {
  const objects = ref<MapObject[]>([]);

  // Добавить обьект
  function addObject(object: MapObject) {
    objects.value.push(object);
  }

  // Удалить обьект
  function removeObject(object: MapObject) {
    objects.value = objects.value.filter(item => item.id !== object.id);
  }

  // Получить обьект по ID
  function getObjectById(id: string) {
    const object = objects.value.find(
      object => object.id === id
    );
    if (!object) return;

    return object;
  }

  // Получить обьект по кадастровому номеру
  function getObjectByCadastral(cadastrNumber: string) {
    return objects.value.find(
      object => object.cadastralNumber === cadastrNumber
    );
  }

  // Изменить видимость обьекта
  function toggleObjectVisibility(id: string) {
    const object = objects.value.find(
      object => object.id === id
    )

    if (!object) {
      return
    }

    object.visible = !object.visible
  }



  return { objects, addObject, removeObject, toggleObjectVisibility, getObjectById, getObjectByCadastral}
})
