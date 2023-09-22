<template>
  <div class="about">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column" v-for="about in aboutUs" :key="about.id">
      <div class="d_flex_row j_content_center">
        <div class="upper_case open_sans name_dep">
          {{ about.name }}
        </div>
      </div>
      <div class="d_flex_column w_100 ptb_40">
        <div>
          <PhotoPlayComponent
            :photo="about.photo"
            :photo_2="about.photo_2"
            :photo_3="about.photo_3"
            :photo_4="null"
            :photo_5="null"
            :photo_6="null"
            :photo_7="null"
            :photo_8="null"
            :photo_9="null"
            :photo_10="null"
          />
        </div>
        <div class="d_flex_row j_content_center ptb_40">
          <div v-html="about.description" class="w_75">

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
import PhotoPlayComponent from "@/components/photoPlay/PhotoPlayComponent.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "SuccessPayView",
  components: {
    HeaderComponent,
    FooterComponent,
    PhotoPlayComponent,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      satatusData: {},
      showSpiner: true,
      dataAndSign: {},
      currentOrderId: JSON.parse(localStorage.getItem("infoForTicket")),
      aboutUs: [],
    };
  },
  beforeCreate() {},
  created() {
    this.getAbout();
  },
  methods: {

    async getAbout() {
      this.aboutUs = await fetch(
        `${this.$store.getters.getServerUrl}/about_us/`
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
@media screen and (max-width: 1000px) {
  p {
    font-size: 12px;
  }
}
p {
  text-align: justify;
}
</style>
    