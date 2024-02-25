<template>
  <div class="landing_page">
    <div>
      <HeaderComponent />
    </div>
    <!-- ENG LANGUAGE -->
    <div v-if="$store.state.currentLanguage == 2">
      <div>
        <div>
          <img
            id="img_faces"
            class="w_100 img_on_main h_400px"
            src="https://kulturhusetstadsteatern.se/sites/default/files/styles/hero_landingpage_mini/public/2023-11/%D0%A2%D0%B5%D0%B0%D1%82%D1%80-%D0%94%D1%80%D1%83%D0%BA.jpg?h=5338a8a1&itok=9ZUBGwPP"
            alt="faces"
          />
        </div>
      </div>
      <div class="d_flex_column pt_10em">
        <div
          id="banner_landing"
          class="w_100 d_flex_column f_neue_plak_cond f_size_42 f_weight_bold_800 color_black upper_case"
        >
          <div
            class="scale_pressure_both w_100"
          >
            {{ Object(dataLanding[0]).name_en }}
          </div>
        </div>
        <div
          id="pre_description_landing"
          class="d_flex_column f_size_32 f_neue_plak color_black padding_tb_3em"
        >
          <div
            class="d_flex_row j_content_space_around padding_tb_2em"
          >
            <div
              class="w_700px"
              v-html="Object(dataLanding[0]).pre_description_en_f_2"
            ></div>
          </div>
        </div>
        <div id="description_landing" class="d_flex_column color_black f_18">
          <div
            class="d_flex_row j_content_space_around"
          >
            <div
              class="w_700px"
              v-html="Object(dataLanding[0]).description_en"
            ></div>
          </div>
        </div>
        <div id="link_landing" class="d_flex_column color_black f_18">
          <div class="d_flex_row j_content_space_around">
            <div class="w_700px">
              <div class="d_flex_row j_content_start ptb_05em">
                <div>
                  Read more about TUA at:
                </div>
              </div>
              <div
                v-for="lin in Object(dataLanding[0]).landing"
                :key="lin.id"
                class="d_flex_row j_content_start ptb_05em"
              >
                <div>
                  <a
                    :href="lin.the_link"
                    class="border_black nav_link_color w_100"
                  >
                    {{ lin.name_en }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ptb_1em d_flex_row j_content_center">
          <div class="w_70">
            <img
              class="w_100"
              src="https://kulturhusetstadsteatern.se/sites/default/files/styles/body_image_big/public/2023-12/EN_Co-fundedbytheEU_RGB_POS.jpg?itok=70sS3pt5"
              alt="EUR"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- UKR LANGUAGE -->
    <div v-else-if="$store.state.currentLanguage == 0">
      <div>
        <div>
          <img
            id="img_faces"
            class="w_100 img_on_main h_400px"
            src="https://kulturhusetstadsteatern.se/sites/default/files/styles/hero_landingpage_mini/public/2023-11/%D0%A2%D0%B5%D0%B0%D1%82%D1%80-%D0%94%D1%80%D1%83%D0%BA.jpg?h=5338a8a1&itok=9ZUBGwPP"
            alt="faces"
          />
        </div>
      </div>
      <div class="d_flex_column pt_10em">
        <div
          id="banner_landing"
          class="w_100 d_flex_column f_neue_plak_cond f_size_42 f_weight_bold_800 color_black upper_case"
        >
          <div
            class="scale_pressure_both w_100"
          >
            {{ Object(dataLanding[0]).name_ua }}
          </div>
        </div>
        <div
          id="pre_description_landing"
          class="d_flex_column f_size_32 f_neue_plak color_black padding_tb_3em"
        >
          <div
            class="d_flex_row j_content_space_around padding_tb_2em"
          >
            <div
              class="w_700px"
              v-html="Object(dataLanding[0]).pre_description_ua_f_2"
            ></div>
          </div>
        </div>
        <div id="description_landing" class="d_flex_column color_black f_18">
          <div
            class="d_flex_row j_content_space_around"
          >
            <div
              class="w_700px"
              v-html="Object(dataLanding[0]).description_ua"
            ></div>
          </div>
        </div>
        <div id="link_landing" class="d_flex_column color_black f_18">
          <div class="d_flex_row j_content_space_around">
            <div class="w_700px">
              <div class="d_flex_row j_content_start ptb_05em">
                <div>
                  Докладніше про TUA читайте на:
                </div>
              </div>
              <div
                v-for="lin in Object(dataLanding[0]).landing"
                :key="lin.id"
                class="d_flex_row j_content_start ptb_05em"
              >
                <div>
                  <a
                    :href="lin.the_link"
                    class="border_black nav_link_color w_100"
                  >
                    {{ lin.name_ua }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ptb_1em d_flex_row j_content_center">
          <div class="w_70">
            <img
              class="w_100"
              src="https://kulturhusetstadsteatern.se/sites/default/files/styles/body_image_big/public/2023-12/EN_Co-fundedbytheEU_RGB_POS.jpg?itok=70sS3pt5"
              alt="EUR"
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

// import axios from "axios";

export default {
  name: "LandingView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      dataLanding: [],
      intrval: null,
      currentLang: localStorage.getItem("currentLanguage"),
    };
  },
  beforeCreate() {},
  created() {
    this.setTitle();
    this.getLanding().then(() => this.showContent());
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Лендінг";
    },

    async getLanding() {
      this.dataLanding = await fetch(
        `${this.$store.getters.getServerUrl}/get_landing/`
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
        document.querySelector(".landing_page").style.opacity = String(cnt);
        if (cnt >= 1) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 0.1;
      }, 50);
    },
  },
};
</script>
      <style scoped>
@media screen and (max-width: 1000px) {
  .w_700px {
    width: 550px !important;
  }
  #banner_landing {
    padding: 1.5em 0;
    font-size: 2.5em;
  }
  #link_landing {
    font-size: 0.9em;
  }
}

@media screen and (max-width: 650px) {
  .w_700px {
    width: 90vw !important;
  }
  #description_landing {
    font-size: 16px;
  }
  #pre_description_landing {
    font-size: 1.2em;
  }
  #img_faces {
    width: 90%;
    object-fit: none;
    height: max-content;
  }
}
</style>
          