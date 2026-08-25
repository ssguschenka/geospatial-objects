import { ref } from 'vue'
import { defineStore } from 'pinia'
import type  { MapObject } from '../types'

export const useObjectsStore = defineStore('objects', () => {
  const objects = ref<MapObject[]>([]);


  function addObject(object: MapObject) {
    objects.value.push(object);
  }

  function removeObject(object: MapObject) {
    objects.value = objects.value.filter(item => item.id !== object.id);
  }

  function getObjectById(id: string) {
    const object = objects.value.find(
      object => object.id === id
    );
    if (!object) return;

    return object;
  }

  function toggleObjectVisibility(id: string) {
    const object = objects.value.find(
      object => object.id === id
    )

    if (!object) {
      return
    }

    object.visible = !object.visible
  }

  return { objects, addObject, removeObject, toggleObjectVisibility, getObjectById}
})
