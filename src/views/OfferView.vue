<template>
    <div v-if="!isMobile" class="home_play">
      <div>
        <HeaderComponent />
      </div>
      <div class="d_flex_column" v-for="offs in offert" :key="offs.id">
        <h3>
          Оферта
        </h3>
        <div>
          <iframe :src="offs.file_offer" width="900" height="1500" frameborder="0"></iframe>
        </div>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  </template>
    
    <script>
  // @ is an alias to /src
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  
  export default {
    name: "OfferView",
    components: {
      HeaderComponent,
      FooterComponent,
    },
    data() {
      return {
        isMobile: false,
        offert: null,
        contract: null,
      };
    },
    created() {
      this.setTitle();
      this.getOffert()
    },
    methods: {
      setTitle() {
        // Встановлює назву сторінки
        document.querySelector("title").innerHTML = "Оферта";
      },
      async getOffert() {
      // Фільтр по місяцям
      this.offert = await fetch(
        `${this.$store.getters.getServerUrl}/offert/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
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
    