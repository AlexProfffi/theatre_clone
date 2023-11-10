<template>
    <div class="archives">
      <div>
        <HeaderComponent />
      </div>
      
      <h1>
        Події
      </h1>
      <div>
        <FooterComponent />
      </div>
    </div>
  </template>
        
        <script>
  // @ is an alias to /src
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  
  // import SpinerComponent from "@/components/helpers/SpinerComponent.vue";
  
  export default {
    name: "SiteSearchView",
    components: {
      HeaderComponent,
      FooterComponent,
      // SpinerComponent,
    },
    data() {
      return {
        
      };
    },
    created() {
        this.setTitle();
    },
    methods: {
      
      setTitle() {
        // Встановлює назву сторінки
        document.querySelector("title").innerHTML = "Події";
      },
    },
  };
  </script>
        <style scoped>
  @media screen and (max-width: 1000px) {
    
  }
  </style>
            