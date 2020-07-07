<template>
  <div id="app">
    <navbar />
    <b-container class="p-5">
      <router-view :key="$route.fullPath"/>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  height: 100%;
  background-color: #eee !important;
}
.spinner {
  margin: 50px auto;
}
</style>
