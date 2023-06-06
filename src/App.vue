<script setup lang="ts">
import { RouterView } from 'vue-router'
// import axios from 'axios'

// axios.get('/api/start-push2answer')
//   .then(response => console.log(response.data))

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" height="125" />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  place-items: center flex-end;
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
