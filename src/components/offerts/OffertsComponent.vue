<template>
  <div v-if="!isMobile" class="home_play">
    <div v-if="offert.length > 1" class="d_flex_row j_content_start flex_wrap">
      <div
        class="d_flex_column j_content_space_around"
        v-for="offs in offert"
        :key="offs.id"
      >
        <div class="t_left color_white">
          <div>
            <span
              class="c_pointer hover_underline offerts"
              @click="openLinkInNewWindow(offs.file_offer)"
            >
              {{ offs.name }}
            </span>
            <span>
                &nbsp;/&nbsp;
            </span>
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
  </div>
</template>
      
      <script>
// @ is an alias to /src

export default {
  name: "OffertsComponent",
  components: {},
  data() {
    return {
      isMobile: false,
      offert: [],
      contract: null,
    };
  },
  created() {
    this.getOffert();
  },
  methods: {
    async getOffert() {
      // Offerts
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
      