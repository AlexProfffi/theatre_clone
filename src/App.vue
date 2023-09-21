<template>
  <div class="wrapper-main">
    <router-view></router-view>
    <AnchorComponent />
  </div>
</template>
<script>
import AnchorComponent from "./components/helpers/AnchorComponent.vue";
export default {
  components: {
    AnchorComponent,
  },
};
</script>

<style>
@media screen and (max-width: 1000px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 !important;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 1em;
  overflow: hidden;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.wrapper-main {
  width: 100%;
  height: 100%;
}
@import "assets/main.css";
</style>
