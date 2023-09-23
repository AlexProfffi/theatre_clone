<template>
  <div
    class="margin_1px"
    :class="{ rectangle_black: isBlack, rectangle: !isBlack }"
  ></div>
</template>
  <script>
export default {
  name: "RectangleComponent",
  props: {
    isBlack: Boolean,
  },
  components: {},
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
.rectangle, .rectangle_black {
  border: 1px solid black;
  border-radius: 2px;
  width: 10px;
  height: 10px;
  background-color: whitesmoke;
}
.rectangle_black {
  background-color: gray !important;
}
</style>