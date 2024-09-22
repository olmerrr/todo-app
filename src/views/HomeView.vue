<template>
  <div class="home-page">
    <header class="header"></header>

    <main class="main">
      <LoginForm />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>

<style>
:root {
  --main-black: #474747;
}

.home-page {
  background-color: #545454;
  min-height: 100vh;
}

.header {
  height: 60px;
  background-color: var(--main-black);
}

.main {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.footer {
  height: 270px;
  background-color: var(--main-black);
}
</style>
