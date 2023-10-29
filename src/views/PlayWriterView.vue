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
            <div class="w_100 m_auto">
              <img
              class="playwriter_photo"
                v-if="playwriter.photo"
                :src="repalcer(playwriter.photo, '')"
                :alt="playwriter.last_name"
              />
              <img class="playwriter_photo" v-else :src="defaultPhoto" :alt="playwriter.last_name" />
            </div>
          </div>
          <div id="all_bio" class="d_flex_column w_50 f_source_sans color_black t_left p_l_2">
            <div class="f_size_48 upper_case nowrap_space">
              {{ playwriter.first_name }} {{ playwriter.last_name }}
            </div>
            <div
              class="upper_case f_size_40 f_weight_bold"
              v-for="rol in playwriter.role"
              :key="playwriter.role.indexOf(rol)"
            >
              <span>
                {{ rol }}
              </span>
            </div>
            <div v-if="playwriter.about">
              <div v-html="playwriter.about"></div>
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
      playwriter: {},
      defaultPhoto:
        "https://theatreofplaywrightsapi.space:8443/image_theatre/ДраматургиPhoto/anonim.png",
      defaultText: "Ось, скоро вже з'явиться...",
    };
  },
  beforeCreate() {},
  created() {
    this.getPlayWriter().then(() => {
      this.showContent();
    }).then(() => {this.setTitle()});
  },
  methods: {
    async setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = `${this.playwriter.first_name} ${this.playwriter.last_name}`;
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
  }
  #image_playwriter {
    width: max-content;
  }
  #checked_texts, #projects {
    width: 100%;
    font-size: 14px;
  }
  .j_content_low_1300 {
    justify-content: start !important;
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
</style>
      