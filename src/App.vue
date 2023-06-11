<script setup lang="ts">
import { RouterView } from 'vue-router'
// import axios from 'axios'

// axios.get('/api/start-push2answer')
//   .then(response => console.log(response.data))

</script>

<template>
  <div class="app-wrapper">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.png" height="125" />
    </header>

    <RouterView class="app-body" />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.app-body {
  height: 0;
  flex: 1;
}

header {
  display: flex;
  place-items: center flex-end;
  flex-shrink: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center flex-end;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
