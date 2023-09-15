<template>
    <div v-if="!isMobile" class="home_play">
      <div>
        <HeaderComponent />
      </div>
      <div>
        <h2>
            Платіж успішний!
        </h2>
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
    name: "SuccessPayView",
    components: {
      HeaderComponent,
      FooterComponent,
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
    