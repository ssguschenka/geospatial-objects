<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="nav-bar">
    <RouterLink class="nav-link" to="/">Главная</RouterLink>
    <RouterLink class="nav-link" to="/table">Таблица</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
.nav-bar {
  grid-row: 1;
  grid-column: 1 / 3;
  display: flex;
  justify-content: end;
  gap: 5%;
  padding: 1% 5%;
  background-color: rgb(72 140 164 / 0.1);
}

.nav-link {
  text-decoration: none;
  color: #1f3436;
  padding: clamp(2px, calc(1.135px + 0.27vw), 6px) clamp(8px, calc(5.405px + 0.811vw), 20px);
  border-radius: 5px;
  border: 1px solid #2563;
  font-family: "Roboto", sans-serif;
  font-size: clamp(12px, calc(10.27px + 0.541vw), 20px);
}

.nav-link:hover {
  background-color: rgb(82 171 206 / 0.73);
}

.nav-link.router-link-active {
  background-color: #2563;
  font-weight: bold;
}
</style>
