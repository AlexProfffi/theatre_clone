<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="pad_b6em">
      <MainComponent />
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>
  
  <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "PlaysListView",
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  created() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Афіша";
    },
    
  },
};
</script>
  <style scoped>
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
  