<template>
  <div class="home-page">
    <header class="header"></header>

    <main class="main">
      <div class="container">
        <LoginForm />
      </div>
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
}

.header {
  height: 60px;
  background-color: var(--main-black);
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.footer {
  height: 270px;
  background-color: var(--main-black);
}
</style>
