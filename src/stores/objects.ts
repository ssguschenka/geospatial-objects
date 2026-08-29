import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type  { MapObject } from '../types'

export const useObjectsStore = defineStore('objects', () => {
  const objects = ref<MapObject[]>([]);

  // Загружаем объекты из localStorage
  const savedObjects = localStorage.getItem('objects');

  if (savedObjects) {
    objects.value = JSON.parse(savedObjects);
  }

  // Следим за изменениями и сохраняем обьекты
  watch(
    objects,
    (newObjects) => {
      localStorage.setItem(
        'objects',
        JSON.stringify(newObjects)
      );
    },
    { deep: true }
  );

  // Добавить обьект
  function addObject(object: MapObject) {
    objects.value.push(object);
  }

  // Удалить обьект
  function removeObject(id: string) {
    objects.value = objects.value.filter(item => item.id !== id);
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

  type UpdateObjectData = Partial<Omit<MapObject, 'id' | 'type'>>;

  function updateObject(id: string, data: UpdateObjectData) {
    const object = objects.value.find(
      object => object.id === id
    );

    if (!object) return;

    Object.assign(object, data);
  }

  return { objects, addObject, removeObject, toggleObjectVisibility, getObjectById, getObjectByCadastral, updateObject }
})
