<template>
  <div>
    <HeaderComponent />
    <div class="opacity_05 main_content">
      <div class="d_flex_column ptb_40">
        <div>
          <p
            v-if="$store.state.currentLanguage == 0"
            class="upper_case open_sans f_size_42"
          >
            {{ partnersName.ua }}
          </p>
          <p
            v-else-if="$store.state.currentLanguage == 2"
            class="upper_case open_sans f_size_42"
          >
            {{ partnersName.en }}
          </p>
        </div>
        <div
          v-if="$store.state.currentLanguage == 0"
          class="d_flex_row j_content_center"
          v-html="partnersThanksMain.ua"
        ></div>
        <div
          v-else-if="$store.state.currentLanguage == 2"
          class="d_flex_row j_content_center"
          v-html="partnersThanksMain.en"
        ></div>
      </div>
      <div class="d_flex_column p_40px bg_grey_custom m_bottom_5em">
        <div v-for="prtn in specialPartners" :key="prtn.id" class="pad_top">
          <a :href="prtn.link">
            <img
              :src="prtn.logo"
              :alt="prtn.name"
              class="img_max_w margin_1_em"
            />
          </a>
        </div>
      </div>
      <div
        v-if="$store.state.currentLanguage == 0"
        class="d_flex_row j_content_center"
        v-html="partnersThanksSimple.ua"
      ></div>
      <div
        v-else-if="$store.state.currentLanguage == 2"
        class="d_flex_row j_content_center"
        v-html="partnersThanksSimple.en"
      ></div>
      <div
        id="not_special"
        class="d_flex_row j_content_space_around padding_tb_15_em fl_grid"
      >
        <div v-for="prtn in notSpecialPartners" :key="prtn.id">
          <a class="" :href="prtn.link">
            <img
              :src="prtn.logo"
              :alt="prtn.name"
              class="img_max_w margin_1_em"
            />
          </a>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "PartnersView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isMobile: false,
      user: {},
      token: localStorage.getItem("token"),
      parners: [],
      partnersName: {
        ua: "партнери",
        en: "partners",
      },
      partnersThanksSimple: {
        ua: `<p class="font_1 open_sans w_30 t_justify" id="txt2">
          Дякуємо всім нашим партнерам за їхню відданість культурі та мистецтву.
          Ваша підтримка допомагає нам зберігати та розвивати театр драматургів,
          роблячи його доступним для широкої аудиторії.
        </p>`,
        en: `<p class="font_1 open_sans w_30 t_justify" id="txt2">
          Thank you to all our partners for their commitment to culture and the arts.
          Your support helps us preserve and develop the theater of playwrights,
          making it accessible to a wide audience.
        </p>`,
      },
      partnersThanksMain: {
        ua: `<p class="font_1 open_sans w_30 t_justify" id="txt1">
            Ми глибоко вдячні нашим <b>особливим партнерам</b> за їхню безмежну
            підтримку театру драматургів. Ваша віра в нашу міссію та фінансова
            підтримка дозволяють нам реалізовувати найкращі творчі задуми і
            надавати глядачам незабутні вистави.
          </p>`,
        en: `<p class="font_1 open_sans w_30 t_justify" id="txt1">
            We are deeply grateful to our <b>special partners</b> for their generosity
            support of dramatists' theater. Your faith in our mission and finances
            support refused us to implement the best creative ideas and
            to provide the audience with unforgettable performances
            </p>`,
      },
    };
  },
  created() {
    this.setTitle();
    this.getParners().then(() => {
      this.showContent();
    });

    // this.getUserLocation();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Партнери";
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

    async getParners() {
      this.parners = await fetch(
        `${this.$store.getters.getServerUrl}/partners/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    specialPartners() {
      return this.parners.filter((parners) => {
        return parners.is_special === true;
      });
    },
    notSpecialPartners() {
      return this.parners.filter((parners) => {
        return parners.is_special === false;
      });
    },
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
  #txt1,
  #txt2 {
    width: 75%;
  }
  #not_special {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .img_max_w {
    width: 6em !important;
    height: 5em !important;
  }

  .fl_grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.img_max_w {
  width: 9em;
  height: 8em;
}
</style>
    