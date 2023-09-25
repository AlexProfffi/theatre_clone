<template>
    <div v-if="!isMobile" class="home_play">
      <div>
        <HeaderComponent />
      </div>
      <div class="d_flex_column">
        {{ user }}
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
        user: {},
      };
    },
    created() {
      this.setTitle();
      this.getCurrentUser()
    },
    methods: {
      setTitle() {
        // Встановлює назву сторінки
        document.querySelector("title").innerHTML = "Кабінет";
      },
      async getCurrentUser() {
      // Фільтр по місяцям
      this.user = await fetch(
        `${this.$store.getters.getServerUrl}/user_profile/`
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
    