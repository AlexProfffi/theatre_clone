<template>
  <div v-if="!isMobile" class="d_flex_column j_content_center">
    <img class="size_img_footer" :src="picture" alt="PlayWriters">
  </div>
</template>
<script>
export default {
  name: "DesktopPictureComponent",
  props: {
    picture: String,
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
.size_img_footer {
  width: 285px;
  height: 196px;
}
</style>