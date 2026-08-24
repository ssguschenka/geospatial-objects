<template>
  <div class="dropdown">
    <button class="addButton" @click="isOpen = !isOpen">
      <span>+</span>
      Добавить объект
    </button>

    <div v-if="isOpen" class="dropdown-content">
    <button
      v-for="object in objects"
      :key="object.type"
      class="dropdown-item"
      @click="selectObject(object.type)">
      {{object.label}}
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ObjectType } from "@/types.ts";

const isOpen = ref(false)

const objects: {type: ObjectType, label: string}[] = [
  { type: 'house', label: "Дом" },
  { type: 'land', label: "Участок" }
]

const emit = defineEmits<{select: [type: ObjectType]}>();

function selectObject(type: ObjectType) {
  emit('select', type)
  isOpen.value = false
}
</script>


<style scoped>
.dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.addButton {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 10px 12px;
  background: #2563;
  border: 1px solid #2563;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
}

.addButton:hover {
  background: rgb(82 171 206 / 0.73);
}

.dropdown-content {
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
}

.dropdown-item {
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid #2563;
  border-radius: 8px;
}

.dropdown-item:hover {
  background: #2563;
}
</style>
