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
  width: clamp(55px, calc(20.405px + 10.811vw), 215px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(2px, calc(-1.027px + 0.946vw), 16px);
  padding: 10px 12px;
  background: #2563;
  border: 1px solid #2563;
  border-radius: 10px;
  cursor: pointer;
  font-size: clamp(10px, calc(8.27px + 0.541vw), 18px);
}

.addButton:hover {
  background: rgb(82 171 206 / 0.73);
}

.dropdown-content {
  width: clamp(75px, calc(47.973px + 8.446vw), 200px);
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
}

.dropdown-item {
  width: 100%;
  padding: clamp(7px, calc(6.351px + 0.203vw), 10px) clamp(6px, calc(4.703px + 0.405vw), 12px);
  font-size: clamp(10px, calc(8.919px + 0.338vw), 15px);
  cursor: pointer;
  border: 1px solid #2563;
  border-radius: clamp(3px, calc(1.919px + 0.338vw), 8px);
}

.dropdown-item:hover {
  background: #2563;
}
</style>
