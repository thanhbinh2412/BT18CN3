<template>
  <div id="app">
    <div id="nav" style="display: none;">
    </div>
    <router-view />
  </div>
</template>
<script>
window.api_url = "http://localhost:3000"
export default {
    
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
