<template>
    <div class="">
      <div href="#">
        
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "ModalInfo",
    props: {},
    components: {},
    data() {
      return {
        isMobile: false,
      };
    },
    created() {},
    methods: {
      
    },
  };
  </script>
  <style scoped>
  #bi-bi {
    animation-duration: 1s;
    animation-name: slidein;
  }
  
  #bi-bi:hover {
    transition: 0.2s;
    transform: scale(1.2);
  }
  .position_sticky {
    position: fixed;
    top: 90%;
    left: 91%;
  }
  .bi-arrow-up-circle {
    color: #f9f9f9;
  }
  .bi-arrow-up-circle:hover {
    color: #e0e0e0;
  }
  </style>