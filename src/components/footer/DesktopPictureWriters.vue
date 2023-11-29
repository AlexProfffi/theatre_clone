<template>
  <div v-if="!isMobile" class="d_flex_column j_content_center">
    <div class="h_50 d_flex_column j_content_center">
      <img class="size_img_footer " :src="picture" alt="PlayWriters">
    </div>
    <div class="footer_bg ">
      <OffertsComponent />
    </div>
  </div>
</template>
<script>
import OffertsComponent from "@/components/offerts/OffertsComponent.vue";

export default {
  name: "DesktopPictureComponent",
  props: {
    picture: String,
  },
  components: {
    OffertsComponent,
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
.size_img_footer {
  width: 285px;
  height: 196px;
}
</style>