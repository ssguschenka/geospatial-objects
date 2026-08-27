<template>
  <div class="dialog-container">
    <p>Вы действительно хотите удалить объект?</p>
    <div class="btn-container">
      <button  @click="emit('cancel')">
        Нет
      </button>
      <button @click="emit('delete')">
        Да
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{delete: []; cancel: []}>();
</script>

<style scoped>
.dialog-container {
  width: clamp(270px, calc(241.892px + 8.784vw), 400px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-family: Roboto, sans-serif;
  font-size: clamp(14px, calc(13.135px + 0.27vw), 18px);
  padding:clamp(7px, calc(5.27px + 0.541vw), 15px);
}

.btn-container {
  display: flex;
  justify-content: space-around;
}

p {
  background-color: transparent;
  text-align: center;
}

button {
  padding: 7px 15px;
  border-radius: 8px;
  border: none;
  font-size: clamp(12px, calc(11.135px + 0.27vw), 16px);
  background-color: #d9d9dc;
  transition: box-shadow 0.2s;
}

button:hover {
  box-shadow: 0 0 0 2px rgb(62 97 100);
}
</style>
