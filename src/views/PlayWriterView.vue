<template>
  <div class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="opacity_05 main_content">
      <div id="wrapper_bio" class="d_flex_column p_40px">
        <div id="up_content" class="d_flex_row j_content_space_around ptb_5em">
          <div id="image_playwriter" class="d_flex_row j_content_center w_50">
            <div
              class="w_100 m_auto_both_1 d_flex_column j_content_start wrap_image"
            >
              <img
                id="imgDram"
                class="playwriter_photo zoom_hover_img"
                v-if="playwriter.photo != badPhoto && playwriter.photo"
                :src="repalcer(playwriter.photo, '')"
                :alt="playwriter.last_name"
              />
              <img
                id="imgDram"
                class="playwriter_photo"
                v-else
                :src="defaultPhoto"
                :alt="playwriter.last_name"
              />
            </div>
          </div>
          <div
            id="all_bio"
            class="d_flex_column w_50 f_source_sans color_black t_left p_l_2"
          >
            <div class="f_size_48 upper_case nowrap_space">
              {{ playwriter.first_name }} {{ playwriter.last_name }}
            </div>
            <div class="upper_case f_size_40 f_weight_bold pad_b1em">
              <span>
                {{ getAllRoles(playwriter.role) }}
              </span>
            </div>
            <div v-if="playwriter.about">
              <div
                v-html="sliceString(playwriter.about, maxCountSymbols)"
              ></div>
              <div v-if="showOpenerText(playwriter.about)">
                <span
                  class="c_pointer f_weight_bold font_1 nav_link_color d_flex_row_reverse j_content_center"
                  v-if="!isShowLargeContent"
                  @click="showLargeTextNews(playwriter.about.length)"
                >
                  <div
                    v-for="arrow in showAbout"
                    :key="arrow.value"
                    :class="{ md_arrow: arrow.value == 1 }"
                  >
                    <span v-html="arrow.htmlText"></span>
                  </div>
                </span>
                <span
                  class="c_pointer f_weight_bold font_1 nav_link_color d_flex_row j_content_center"
                  v-else
                  @click="showLargeTextNews(playwriter.about.length)"
                >
                  <div
                    v-for="arrow in showAbout"
                    :key="arrow.value"
                    :class="{
                      md_arrow_close: arrow.value == 1,
                    }"
                  >
                    <span v-html="arrow.htmlText"></span>
                  </div>
                </span>
              </div>
            </div>
            <div v-else>
              {{ defaultText }}
            </div>
          </div>
        </div>
        <div
          v-if="slugin == 'authors'"
          id="down_content"
          class="d_flex_row j_content_space_around f_source_sans color_black ptb_5em"
        >
          <div id="checked_texts" class="d_flex_column t_left w_50">
            <div class="d_flex_row j_content_center ptb_1em j_content_low_1300">
              <div class="upper_case f_size_40 f_weight_bold w_50 nowrap_space">
                вибрані тексти
              </div>
            </div>
            <div class="d_flex_row j_content_center j_content_low_1300">
              <div v-if="playwriter.texts" class="w_50">
                {{ playwriter.texts }}
              </div>
              <div class="w_50" v-else>
                {{ defaultText }}
              </div>
            </div>
          </div>
          <div id="projects" class="d_flex_column t_left w_50">
            <div class="d_flex_row j_content_start ptb_1em">
              <div class="upper_case f_size_40 f_weight_bold">проєкти</div>
            </div>
            <div v-if="playwriter.projects">
              {{ playwriter.projects }}
            </div>
            <div v-else>
              {{ defaultText }}
            </div>
          </div>
        </div>
        <div
          v-if="plWorks.length"
          id="his_her_works"
          class="d_flex_column f_source_sans color_black ptb_5em bg_grey_custom"
        >
          <div
            class="d_flex_row j_content_center ptb_1em j_content_center_low_1000"
          >
            <div class="upper_case f_size_40 f_weight_bold w_50 nowrap_space">
              вистави
            </div>
          </div>
          <div
            v-if="plWorks.length > 3"
            class="d_flex_row j_content_center ptb_1em"
          >
            <div class="little_pad c_pointer" @click="moveWorksToLeft()">
              <button
                class="bg_grey_custom b_none scale_hover"
                :disabled="firstIndex < 1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="25"
                  viewBox="0 0 10.605 15.555"
                >
                  <polygon
                    points="10.605 12.727 5.656 7.776 10.605 2.828 7.777 0 0 7.776 7.777 15.555 10.605 12.727"
                  />
                </svg>
              </button>
            </div>
            <div class="little_pad c_pointer" @click="moveWorksToRight()">
              <button
                class="bg_grey_custom b_none scale_hover"
                :disabled="secondIndex > plWorks.length - 1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="25"
                  viewBox="0 0 10.605 15.555"
                >
                  <polygon
                    points="2.828 15.555 10.605 7.776 2.828 0 0 2.828 4.949 7.776 0 12.727 2.828 15.555"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="d_flex_row j_content_center direction_low_1000">
            <div
              v-for="plwr in plWorks.slice(firstIndex, secondIndex)"
              :key="plwr.id"
              class="d_flex_column little_pad all_works_author"
            >
              <div class="d_flex_column">
                <div>
                  <img
                    class="img_on_list_work"
                    :src="repalcer(plwr.photo)"
                    :alt="plwr.name"
                  />
                </div>
                <div
                  class="d_flex_row j_content_center_low_1000 j_content_mobile_center"
                >
                  <div v-if="plwr.on_play.length && !plwr.on_play[0].cancel_event" class="f_oswald f_size_32">
                    <router-link
                      class="nav_link_color"
                      :to="{
                        name: 'play',
                        params: {
                          id: plwr.id,
                          date_id: plwr.on_play[0].id,
                          name: transcriptWord(plwr.name),
                        },
                      }"
                    >
                      {{ plwr.name }}
                    </router-link>
                  </div>
                  <div v-else class="f_oswald f_size_32">
                    {{ plwr.name }}
                  </div>
                </div>
                <div
                  class="d_flex_row j_content_space_between w_80 j_content_center_low_1000 w_low_1000 j_content_mobile_center w_low"
                  v-if="plwr.on_play.length && !plwr.on_play[0].cancel_event && plwr.is_show"
                >
                  <span class="p_low_100_5">
                    {{ inTimeDate }}
                  </span>
                  <span class="open_sans f_weight_bold font_1 p_low_100_5">
                    {{ brackeDate(plwr.on_play[0].date_pl) }}
                  </span>
                </div>
                <div
                  v-else
                  class="d_flex_row j_content_space_between w_80 j_content_center_low_1000 w_low_1000 j_content_mobile_center w_low"
                >
                  {{ plwr.alter_text }}
                </div>
              </div>
            </div>
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
import { transcription, setBrakeDate } from "../assets/main";

export default {
  name: "PlayWriterView",
  props: {
    id: String,
    slugin: String,
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      sizeScreen: document.body.offsetWidth,
      firstIndex: 0,
      secondIndex: 3,
      brackeDate: setBrakeDate,
      noDatePlay: "Ось, скоро вже буде показ...",
      inTimeDate: "Найближча дата:",
      transcriptWord: transcription,
      badPhoto:
        "/image_theatre/image_theatre/%D0%94%D1%80%D0%B0%D0%BC%D0%B0%D1%82%D1%83%D1%80%D0%B3%D0%B8Photo/anonim.png",
      showAbout: [
        {
          value: 0,
          htmlText: `<svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="26" height="26" fill="currentColor" 
        class="bi bi-arrow-left-short w_100" viewBox="0 0 18 18">
        <path 
        fill-rule="evenodd" 
        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg>`,
        },
        {
          value: 1,
          htmlText: `<div></div>`,
        },
        {
          value: 2,
          htmlText: `<svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="26" height="26" fill="currentColor" 
          class="bi bi-arrow-right-short w_100" viewBox="0 0 18 18">
          <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
          </svg>`,
        },
      ],
      playwriter: {},
      plWorks: [],
      defaultPhoto:
        "https://theatreofplaywrightsapi.space:8443/image_theatre/ДраматургиPhoto/anonim.png",
      defaultText: "Ось, скоро вже з'явиться...",
      maxCountSymbols: 1000,
      isShowLargeContent: false,
      workInterval: null,
    };
  },
  beforeCreate() {},
  created() {
    this.getPlayWriter()
      .then(() => {
        this.showContent();
      })
      .then(() => {
        this.getSizeImages(this.playwriter.photo);
      })
      .then(() => {
        this.setTitle();
      })
      .then(() => {
        this.plWorks = this.playwriter.works
          ? this.playwriter.works
          : (this.plWorks = []);
        if (this.sizeScreen < 750) {
          this.secondIndex = this.plWorks.length;
        }
      });
  },
  methods: {
    async movedRight() {
      let need = document.querySelectorAll(".all_works_author")[0];
      // let needNext = document.querySelectorAll(".all_works_author")[1];
      let needNextNext = document.querySelectorAll(".all_works_author")[2];

      // let count = need.offsetWidth;
      let pad = 0;
      let ops = 1;
      this.workInterval = setInterval(() => {
        if (need) {
          need.style.paddingRight = String(pad) + "px";
        }

        // needNext.style.paddingRight = String(pad) + "px";
        needNextNext.style.paddingRight = String(pad) + "px";

        need.style.opacity = String(ops);
        if (pad > 350) {
          clearInterval(this.workInterval);
          this.firstIndex++;
          this.secondIndex++;
          document.querySelectorAll(
            ".all_works_author"
          )[1].style.paddingRight = 0;
          document.querySelectorAll(
            ".all_works_author"
          )[2].style.paddingRight = 0;
          return;
        }
        pad += 25;
        ops -= 0.1;
      }, 5);
    },

    async movedLeft() {
      let need = document.querySelectorAll(".all_works_author")[0];
      let needNext = document.querySelectorAll(".all_works_author")[2];
      // let count = need.offsetWidth;
      let pad = 0;
      let ops = 1;
      this.workInterval = setInterval(() => {
        need.style.paddingLeft = String(pad) + "px";
        if (needNext) {
          needNext.style.paddingLeft = String(pad) + "px";
        }

        needNext.style.opacity = String(ops);

        if (pad > 350) {
          clearInterval(this.workInterval);
          this.firstIndex--;
          this.secondIndex--;
          document.querySelectorAll(".all_works_author")[0].style.paddingLeft =
            1.5 + "em";
          return;
        }
        pad += 25;
        ops -= 0.1;
      }, 5);
    },
    moveWorksToRight() {
      this.movedRight();
    },
    moveWorksToLeft() {
      this.movedLeft();
    },
    async setTitle() {
      // Встановлює назву сторінки
      document.querySelector(
        "title"
      ).innerHTML = `${this.playwriter.first_name} ${this.playwriter.last_name}`;
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
    async getPlayWriter() {
      let url = `${this.$store.getters.getServerUrl}/playwriters/${this.slugin}/${this.id}/`;
      this.playwriter = await fetch(url)
        .then((response) => response.json())

        .catch((error) => console.log(error));
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
    sliceString(str, n_symbols) {
      // Обрізає строку
      return String(str).length > n_symbols
        ? String(str).slice(0, Number(n_symbols)) + "..."
        : str;
    },
    showLargeTextNews(lengthDescription) {
      // Показує весь текст
      this.isShowLargeContent = !this.isShowLargeContent;
      if (this.isShowLargeContent) {
        this.maxCountSymbols = Number(lengthDescription) - 1;
      } else {
        this.maxCountSymbols = 1000;
      }
    },
    showOpenerText(txt) {
      // Перевіряє довжину текста
      return String(txt).length > this.maxCountSymbols ? true : false;
    },
    async getSizeImages(imgSrc) {
      let im = new Image();
      im.src = "https://theatreofplaywrightsapi.space:8443" + imgSrc;
      if (im.height > 499) {
        document.querySelector("#imgDram").style.height = "500px";
      } else if (im.height == 0 && imgSrc) {
        document.querySelector("#imgDram").style.height = "500px";
      }
    },
    getAllRoles(roles) {
      if (roles) {
        let str = roles.join(", ");
        return str;
      }
      return roles;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1650px) {
  .f_size_48 {
    font-size: 3.2em;
  }
}
@media screen and (max-width: 1330px) {
  #wrapper_bio {
    padding: 0;
  }
  #up_content,
  #down_content {
    flex-direction: column;
    padding: 5em 1em;
  }
  #all_bio {
    margin: auto;
    width: 90vw;
    text-align: justify;
    font-size: 14px;
    padding-left: 0;
    padding-bottom: 1em;
  }
  #image_playwriter {
    width: 100%;
  }
  #checked_texts,
  #projects {
    width: 100%;
    font-size: 14px;
  }
  .j_content_low_1300 {
    justify-content: start !important;
  }
}

@media screen and (max-width: 1000px) {
  #imgDram {
    position: static;
    transition: none;
    transform: none;
  }
  .zoom_hover_img {
    box-shadow: none !important;
  }
}
@media screen and (max-width: 700px) {
  img.playwriter_photo {
    width: 90vw;
  }
  .f_size_48 {
    font-size: 2em;
  }
}

p > a {
  color: black;
  text-decoration: underline !important;
}
.wrap_image {
  max-height: max-content;
  max-width: max-content;
}

img.playwriter_photo {
  position: relative;
  object-fit: contain;
}
.zoom_hover_img {
  transition: all 0.5s ease-out;

  box-shadow: 3px 3px 3px rgb(165, 165, 165);
}
.zoom_hover_img:hover {
  transform: scale(1.5);
  left: 8em;
  box-shadow: 15px 10px 15px rgb(165, 165, 165);
}

/* OPEN */
.md_arrow {
  transition: width 0.5s;
  width: 10px;
}
.md_arrow:hover {
  width: 50px;
}

/* CLOSE */
.md_arrow_close {
  transition: width 0.5s;
  width: 50px;
}
.md_arrow_close:hover {
  width: 10px;
}

.scale_hover:hover {
  transform: scale(1.2);
  box-shadow: none;
}
</style>
      