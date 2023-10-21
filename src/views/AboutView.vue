<template>
  <div class="about">
    <div>
      <HeaderComponent />
    </div>
    <div class="opacity_05 main_content">
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
              :photo_4="''"
              :photo_5="''"
              :photo_6="''"
              :photo_7="''"
              :photo_8="''"
              :photo_9="''"
              :photo_10="''"
              :ident="about.id"
              :domain="true"
            />
          </div>
          <div
            id="descript_about"
            class="d_flex_row j_content_space_around ptb_40"
          >
            <AboutUsDescriptionComponentVue
              :under_name="about.under_name_1"
              :description="about.description"
            />
            <AboutUsDescriptionComponentVue
              :under_name="about.under_name_2"
              :description="about.description_2"
            />
            <AboutUsDescriptionComponentVue
              :under_name="about.under_name_3"
              :description="about.description_3"
            />
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
import AboutUsDescriptionComponentVue from "../components/photoPlay/aboutus/AboutUsDescriptionComponent.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "AboutView",
  components: {
    HeaderComponent,
    FooterComponent,
    PhotoPlayComponent,
    AboutUsDescriptionComponentVue,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: true,
      aboutUs: [],
    };
  },
  beforeCreate() {},
  created() {
    this.getAbout().then(() => {
      this.showContent();
    });
    this.setTitle();
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
    async showContent() {
      // Показує контент методом підвищення opacity
      let cnt = 0;

      this.intrval = setInterval(() => {
        document.querySelector(".main_content").style.opacity = String(cnt);
        if (cnt >= 1) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 0.1;
      }, 50);
    },

    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Про театр";
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1000px) {
  p {
    font-size: 12px;
  }
  #descript_about {
    flex-direction: column;
  }
}
p {
  text-align: justify;
}
</style>
    