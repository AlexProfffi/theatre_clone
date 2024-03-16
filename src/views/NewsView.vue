<template>
  <div class="news">
    <div>
      <HeaderComponent />
    </div>
    <div id="news_all" class="d_flex_column opacity_05 main_content p_40px">
      <div id="news_current" class="d_flex_column margin_both_auto">
        <div
          class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
        >
          <div>новини</div>
        </div>
      </div>
      <div v-if="news.length">
        <div
          v-for="new_one in news"
          :key="new_one.id"
          class="d_flex_row j_content_space_around ptb_5em bg_grey_custom position_low_1000 direction_low_1000 w_low horizontal_line"
        >
          <div
            class="w_30 w_low"
            @click="showModal(new_one.name, new_one.description, new_one.image)"
          >
            <img
              :src="repalcer(new_one.image, '')"
              :alt="new_one.name"
              class="img_on_list_new img_on_list__low_1000 c_pointer w_90vw"
            />
          </div>
          <div v-if="modal">
            <ModalShowPicture
              :picture="modalImage"
              :name="modalName"
              :description="null"
              :show="modal"
              @close="modal = false"
            />
          </div>
          <div class="d_flex_row j_content_start w_50 w_low">
            <div
              class="d_flex_column j_content_space_between t_left w_75 w_low position_content_low_1000"
            >
              <div class="d_flex_row j_content_center">
                <div class="w_max w_low_25 d_flex_for_mob j_content_start">
                  <h2 class="f_oswald">
                    {{ new_one.name }}
                  </h2>
                </div>
              </div>
              <div
                class="f_source_sans padding_tb_2em w_max"
                :class="{
                  c_pointer: new_one.description.length > maxCountSymbols,
                }"
                @click="showLargeTextNews(new_one.description.length)"
                v-html="sliceString(new_one.description, maxCountSymbols)"
              ></div>
              <div class="d_flex_row justify_low_1000 j_content_end">
                <div class="d_flex_row j_content_end w_low_25">
                  <div class="f_source_sans">
                    {{ formatDate(new_one.date_event) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="margin_both_2 mar_top_bot" />
        </div>
      </div>
      <div v-else-if="getNewsFb.length">
        {{ newsFb }}
      </div>
      <div v-else>
        {{ alterText.altUa }}
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
import ModalShowPicture from "@/components/helpers/ModalShowPicture.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "NewsView",
  components: {
    HeaderComponent,
    FooterComponent,
    ModalShowPicture,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: true,
      modal: false,
      news: [],
      newsFb: [],
      intrval: null,
      modalName: null,
      modalDescription: null,
      modalImage: null,
      maxCountSymbols: 550,
      isShowLargeContent: false,
      alterText: {
        altEn: "",
        altUa: "Скоро тут обов'язкво щось з'явиться...",
      },
    };
  },
  created() {
    this.getNews()
      .then(() => {
        this.showContent();
      });
    this.setTitle();
  },
  methods: {
    async getFbAnother() {},
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

    async getNews() {
      this.news = await fetch(`${this.$store.getters.getServerUrl}/all_news/`)
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },
    async getNewsFb() {
      this.newsFb = await fetch(
        `${this.$store.getters.getServerUrl}/fb_all_news/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },

    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Новини";
    },

    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443" + str;
    },
    formatDate(dates) {
      // Змінює '-' на '|'
      return String(dates).replace(/[-]/g, "|");
    },
    sliceString(str, n_symbols) {
      // Обрізає строку
      return String(str).length > n_symbols
        ? String(str).slice(0, Number(n_symbols)) + "..."
        : str;
    },

    showModal(nm, dscr, imgs) {
      // Діалогове вікно з драматургами
      this.modalName = nm;
      this.modalDescription = dscr;
      this.modalImage = imgs;
      this.modal = true;
    },

    showLargeTextNews(lengthDescription) {
      // Показує весь текст
      this.isShowLargeContent = !this.isShowLargeContent;
      if (this.isShowLargeContent) {
        this.maxCountSymbols = Number(lengthDescription) - 1;
      } else {
        this.maxCountSymbols = 550;
      }
    },
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
  #news_all {
    padding: 0;
  }

  .bg_grey_custom {
    background: #f3f3f3;
  }
  .horizontal_line {
    border: none !important;
  }
  .position_low_1000 {
    padding: 2em 0 !important;
  }

  .img_on_list__low_1000 {
    height: 330px !important;
  }

  .position_content_low_1000 {
    justify-content: center !important;
    text-align: justify;
    font-size: 14px;
    padding-top: 15px;
  }
}
</style>
        