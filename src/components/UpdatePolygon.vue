<template>
  <div class="update-polygon-container">
    <p>Передвигайте вершины полигона, чтобы его изменить</p>
    <button class="done-btn" @click="emit('done')">Готово</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{done: []}>();
</script>

<style scoped>
.update-polygon-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #ffffff;
  align-items: center;
  padding: 16px;
  display: flex;
  gap: 26px;
}

p {
  margin: 0;
  font-family: Roboto, sans-serif;
  font-size: 15px;
  background-color: transparent;
}

.done-btn {
  padding: 5px 16px;
  border-radius: 5px;
  font-size: 15px;
  background: #2563;
  border: 1px solid #2563;
}

.done-btn:hover {
  background: rgb(82 171 206 / 0.73);
}
</style>
