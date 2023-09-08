<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div>
      <MainComponent />
    </div>
  </div>
</template>
  
  <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";

export default {
  name: "PlaysListView",
  components: {
    HeaderComponent,
    MainComponent,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  created() {},
  methods: {},
};
</script>
  <style scoped>
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
  