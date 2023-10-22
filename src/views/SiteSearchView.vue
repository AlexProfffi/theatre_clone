<template>
  <div class="search">
    <div>
      <HeaderComponent />
    </div>
    <div class="p_40px" id="wrapper_search">
      <div id="news_current" class="d_flex_column margin_both_auto">
        <div
          class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
          id="name_id_dep"
        >
          <div>результати пошуку</div>
        </div>
      </div>
      <div
        id="searchers_all"
        class="d_flex_column main_content p_40px bg_grey_custom p_both_low_1000"
        v-for="srch in searchersObjects"
        :key="srch.id_obj"
      >
        <div class="d_flex_row j_content_space_around ptb_5em block_low_1000">
          <div class="w_30 position_img_low_1000">
            <img
              class="img_on_list_new img_on_list__low_1000 c_pointer"
              :src="repalcer(srch.photo, '')"
              :alt="srch.name"
            />
          </div>
          <div class="w_50 w_low_1000">
            <div
              class="d_flex_column j_content_space_between t_left w_75 position_content_low_1000 h_100 w_low_1000"
            >
              <div
                class="open_sans upper_case f_weight_bold_700 f_size_32"
                v-if="srch.type == 'play'"
              >
                <router-link
                  v-if="!srch.is_past"
                  :id="'link_play_' + srch.id_date"
                  :to="{
                    name: 'play',
                    params: {
                      id: srch.id_obj,
                      date_id: srch.id_date,
                      name: transcription(srch.name),
                    },
                  }"
                  class="nav_link_color"
                >
                  {{ srch.name }}
                </router-link>
                <div class="d_flex_column" v-else>
                  <div class="small_font_07">(Вистава вже відбулася)</div>
                  <div>
                    {{ srch.name }}
                  </div>
                </div>
              </div>
              <div
                class="open_sans upper_case f_weight_bold_700 f_size_32"
                v-else
              >
                {{ srch.name }}
              </div>
              <div
                class="padding_tb_2em f_source_sans"
                v-if="srch.type == 'play'"
              >
                {{ srch.description }}
              </div>
              <div
                class="padding_tb_2em f_source_sans"
                v-else
                v-html="srch.description"
              ></div>
              <div v-if="srch.type == 'play'" class="d_flex_row j_content_end">
                <div class="f_source_sans">
                  {{ formatDate(srch.date_time, true) }}
                </div>
              </div>
              <div
                v-else-if="srch.type == 'new'"
                class="d_flex_row j_content_end"
              >
                <div class="f_source_sans">
                  {{ formatDate(srch.date) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="margin_both_2 mar_top_bot" />
      </div>
    </div>

    <div
      v-if="!searchersObjects"
      class="padding_tb_2em open_sans upper_case f_weight_bold_700 f_size_32"
    >
      по вашому запиту нічого не знайдено
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

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "SiteSearchView",
  components: {
    HeaderComponent,
    FooterComponent,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: true,
      modal: false,
      news: [],
      intrval: null,
      modalName: null,
      modalDescription: null,
      modalImage: null,
      maxCountSymbols: 550,
      isShowLargeContent: false,
      dataFromSearchField: localStorage.getItem("searchersDt"),
      searchersObjects: [],
    };
  },
  created() {
    this.getSearcherData();
    this.setTitle();
  },
  methods: {
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

    

    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443/image_theatre/" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443/image_theatre/" + str;
    },

    formatDate(dates, time = false) {
      // Змінює '-' на '|'
      if (!time) {
        return String(dates).replace(/[-]/g, "|");
      }

      return String(dates).split("T")[0].replace(/[-]/g, "|");
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

    async getSearcherData() {
      // Пошукові обєкти
      let url = `${this.$store.getters.getServerUrl}/plays_all/search/?q=${this.dataFromSearchField}&n=${this.dataFromSearchField}`;
      this.searchersObjects = await fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },
    transcription(word) {
      // Транскрипція з кирилиці на латиницю
      let transcription_alpha = [
        { value: ["а", "a"] },
        { value: ["б", "b"] },
        { value: ["в", "v"] },
        { value: ["г", "g"] },
        { value: ["ґ", "g"] },
        { value: ["д", "d"] },
        { value: ["е", "e"] },
        { value: ["є", "ye"] },
        { value: ["ж", "zh"] },
        { value: ["з", "z"] },
        { value: ["и", "y"] },
        { value: ["і", "i"] },
        { value: ["ї", "i"] },
        { value: ["й", "y"] },
        { value: ["к", "k"] },
        { value: ["л", "l"] },
        { value: ["м", "m"] },
        { value: ["н", "n"] },
        { value: ["о", "o"] },
        { value: ["п", "p"] },
        { value: ["р", "r"] },
        { value: ["с", "s"] },
        { value: ["т", "t"] },
        { value: ["у", "u"] },
        { value: ["ф", "f"] },
        { value: ["х", "kh"] },
        { value: ["ц", "ts"] },
        { value: ["ч", "ch"] },
        { value: ["ш", "sh"] },
        { value: ["щ", "shch"] },
        { value: ["ь", ""] },
        { value: ["ю", "yu"] },
        { value: ["я", "ya"] },
        { value: ["0", "0"] },
        { value: ["1", "1"] },
        { value: ["2", "2"] },
        { value: ["3", "3"] },
        { value: ["4", "4"] },
        { value: ["5", "5"] },
        { value: ["6", "6"] },
        { value: ["7", "7"] },
        { value: ["8", "8"] },
        { value: ["9", "9"] },
        { value: [" ", "_"] },
        { value: ["a", "a"] },
        { value: ["b", "b"] },
        { value: ["c", "c"] },
        { value: ["d", "d"] },
        { value: ["e", "e"] },
        { value: ["f", "f"] },
        { value: ["g", "g"] },
        { value: ["h", "h"] },
        { value: ["i", "i"] },
        { value: ["j", "j"] },
        { value: ["k", "k"] },
        { value: ["l", "l"] },
        { value: ["m", "m"] },
        { value: ["n", "n"] },
        { value: ["o", "o"] },
        { value: ["p", "p"] },
        { value: ["q", "q"] },
        { value: ["r", "r"] },
        { value: ["s", "s"] },
        { value: ["t", "t"] },
        { value: ["u", "u"] },
        { value: ["v", "v"] },
        { value: ["w", "w"] },
        { value: ["x", "x"] },
        { value: ["y", "y"] },
        { value: ["z", "z"] },
      ];
      let list_new_word = [];
      for (let x = 0; x < word.length; x++) {
        for (let y = 0; y < transcription_alpha.length; y++) {
          if (transcription_alpha[y].value[0] == word[x].toLowerCase()) {
            list_new_word.push(transcription_alpha[y].value[1]);
          }
        }
      }
      return list_new_word.join("");
    },
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Результати пошуку";
    },
  },
};
</script>
      <style scoped>
@media screen and (max-width: 1000px) {
  #name_id_dep {
    font-size: 2em;
  }
  #wrapper_search {
    padding: 0;
  }
  .w_low_1000 {
    width: auto !important;
  }
  .p_both_low_1000 {
    padding: 10px 20px !important;
  }
  .block_low_1000 {
    flex-direction: column !important;
    padding: 10px 0;
  }
  .position_img_low_1000 {
    width: 100% !important;
  }
  .img_on_list__low_1000 {
    width: 95% !important;
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
          