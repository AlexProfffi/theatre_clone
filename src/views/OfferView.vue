<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div v-if="offert.length > 1" class="d_flex_row j_content_space_around">
      <div
        class="d_flex_column j_content_space_around"
        v-for="offs in offert"
        :key="offs.id"
      >
        <div class="t_left">
          <h3>{{ offs.name }}</h3>
          <div>
            <span
              class="c_pointer hover_underline offerts"
              @click="openLinkInNewWindow(offs.file_offer)"
              >Переглянути</span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="offert.length == 1"
      class="d_flex_row j_content_space_around"
    >
      <div class="d_flex_column j_content_space_around">
        <div class="t_left">
          <h3>{{ offert.name }}</h3>
          <div>
            <span
              v-if="offert.file_offer"
              class="c_pointer hover_underline offerts"
              @click="openLinkInNewWindow(offert.file_offer)"
              >Переглянути</span
            >
          </div>
        </div>
      </div>
      <div class="d_flex_column j_content_space_around">
        <div class="t_left">
          <h3>{{ offert.name }}</h3>
          <div>
            <span
              v-if="offert.file_contract"
              class="c_pointer hover_underline offerts"
              @click="openLinkInNewWindow(offert.file_contract)"
              >Переглянути</span
            >
          </div>
        </div>
      </div>
      <div class="d_flex_column j_content_space_around">
        <div class="t_left">
          <h3>{{ offert.name }}</h3>
          <div>
            <span
              v-if="offert.file_lawyer"
              class="c_pointer hover_underline offerts"
              @click="openLinkInNewWindow(offert.file_lawyer)"
              >Переглянути</span
            >
          </div>
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
      contract: null,
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
      this.offert = await fetch(`${this.$store.getters.getServerUrl}/offert/`)
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },
    openLinkInNewWindow(lnk) {
      window.open(lnk, "_blank").focus();
    },
  },
};
</script>
    <style scoped>
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
    