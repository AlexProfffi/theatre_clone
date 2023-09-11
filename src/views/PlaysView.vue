<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div>
      <MainComponent />
    </div>
    <div>
      <FooterComponent />
    </div>
    <!-- <AnchorComponentVue /> -->
  </div>
</template>
  
  <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
// import AnchorComponentVue from "@/components/helpers/AnchorComponent.vue";

export default {
  name: "PlaysListView",
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
    // AnchorComponentVue,
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
  