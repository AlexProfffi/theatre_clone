<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_row j_content_space_around d_flex_column_low_1100">
      <div
        class="d_flex_row w_100 ptb_5em"
        v-for="offs in offert"
        :key="offs.id"
      >
        <div class="wrapper_offerta">
          <div class="f_size_40 f_weight_bold font_low_1100">
            {{ offs.name }}
          </div>
          <div class="w_100 horizontal_line"></div>
          <div class="t_justify little_pad font_1" v-html="offs.text"></div>
        </div>
      </div>
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
      offert: [],
      showOffertOrNo: true,
    };
  },
  created() {
    this.setTitle();
    this.getOffert();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Публічна оферта";
    },
    async getOffert() {
      // Фільтр по місяцям
      this.offert = await fetch(
        `${this.$store.getters.getServerUrl}/offerta_new/`
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
@media screen and (max-width: 1100px) {
  .d_flex_column_low_1100 {
    flex-direction: column !important;
  }
  .font_low_1100 {
    font-size: 1.5em !important;
  }
}
.home_play {
  display: flex;
  flex-direction: column;
}
.wrapper_offerta {
  width: 100%;
  height: 800px;
  overflow-y: scroll;
}
</style>
    