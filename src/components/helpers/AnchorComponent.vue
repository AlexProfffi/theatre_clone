<template>
  <div class="position_sticky c_pointer" @click="scrollToTop()">
    <div href="#">
      <svg
        id="bi-bi"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        fill="#f9f9f9"
        class="bi bi-arrow-up-circle"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
        />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: "AnchorComponent",
  props: {},
  components: {},
  data() {
    return {
      isMobile: false,
    };
  },
  created() {},
  methods: {
    scrollToTop() {
      // Scroll
      window.scroll({
        top: 50,
        left: 0,
        behavior: "smooth",
      });
    },
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