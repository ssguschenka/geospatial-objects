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
  grid-column: 2;
  display: flex;
  justify-content: end;
  gap: 3%;
  padding: 0 3%;
}

.nav-link {
  text-decoration: none;
  color: #1f3436;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid #2563;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}

.nav-link:hover {
  background-color: rgb(82 171 206 / 0.73);
}

.nav-link.router-link-active {
  background-color: #2563;
  font-weight: bold;
}
</style>
