<template>
  <div class="margin_1px rectangle ">
    
  </div>
</template>
  <script>
export default {
  name: "RectangleComponent",
  props: {},
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
.rectangle{
    border: 1px solid black;
    border-radius: 2px;
    width: 10px;
    height: 10px;
}
.rectangle_black{
    border: 1px solid black;
    border-radius: 2px;
    width: 10px;
    height: 10px;
    background-color: gray;
}

</style>