<template>
  <div v-if="!isMobile" class="d_flex_column j_content_space_around">
    <div class="d_flex_column j_content_end h_80">
      <div class="d_flex_column j_content_center">
        <img class="size_img_footer" :src="picture" alt="PlayWriters" />
      </div>
      <div class="footer_bg">
        <OffertsComponent />
      </div>
    </div>
    <div class="color_white d_flex_column j_content_end h_20">
      <div class="d_flex_row">
        <div>© <span>theatreofplaywrights.com</span> {{ new Date().getFullYear() }}</div>
      </div>

      <div id="statistic" class="t_left">
        <a class="font_1 color_white" href="/statistics">Для адміністраторів</a>
      </div>
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