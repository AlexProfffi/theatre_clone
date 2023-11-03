<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <p></p>
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
                v-if="playwriter.photo"
                :src="repalcer(playwriter.photo, '')"
                :alt="playwriter.last_name"
              />
              <img
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
            <div
              class="upper_case f_size_40 f_weight_bold pad_b1em"
              v-for="rol in playwriter.role"
              :key="playwriter.role.indexOf(rol)"
            >
              <span>
                {{ rol }}
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
                    :class="{'md_arrow': arrow.value == 1}"
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
                      'md_arrow_close': arrow.value == 1
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
  name: "PlayWriterView",
  props: {
    id: String,
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
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
          value:1,
          htmlText: `<div></div>`
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
      defaultPhoto:
        "https://theatreofplaywrightsapi.space:8443/image_theatre/ДраматургиPhoto/anonim.png",
      defaultText: "Ось, скоро вже з'явиться...",
      maxCountSymbols: 1000,
      isShowLargeContent: false,
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
      });
  },
  methods: {
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
      this.playwriter = await fetch(
        `${this.$store.getters.getServerUrl}/playwriters/${this.id}/`
      )
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
      console.log(imgSrc);
      let im = new Image();
      im.src = "https://theatreofplaywrightsapi.space:8443" + imgSrc;
      console.log(im.height);
      if (im.height > 499) {
        document.querySelector("#imgDram").style.height = "600px";
      } else if (im.height == 0 && imgSrc) {
        document.querySelector("#imgDram").style.height = "600px";
      }
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1330px) {
  #wrapper_bio {
    padding: 40px 20px;
  }
  #up_content,
  #down_content {
    flex-direction: column;
    padding: 5em 0;
  }
  #all_bio {
    width: 100%;
    text-align: justify;
    font-size: 14px;
    padding-left: 0;
    padding-bottom: 1em;
  }
  #image_playwriter {
    width: max-content;
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
}
@media screen and (max-width: 700px) {
  img.playwriter_photo {
    width: 90vw;
    margin: auto;
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
</style>
      