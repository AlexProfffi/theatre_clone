<template>
  <div class="text_page">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column" v-if="dataText.text">
      <div class="d_flex_row j_content_center">
        <div class="pad_4_path f_oswald f_size_40">
          {{ Object(dataText.name).name }}
        </div>
      </div>
      <div>
        <div
          id="text"
          class="pad_4_path f_source_sans t_justify"
          v-html="dataText.text"
        ></div>
      </div>
      <div class="">
        <div id="authors_txt" class="d_flex_row pad_4_path">
          <div v-if="Object(dataText.playwright).length == 1">Автор:</div>
          <div v-else-if="Object(dataText.playwright).length > 1">Автори:</div>
          <div>&nbsp;</div>
          <div
            class="d_flex_column"
            v-for="playwriter in dataText.playwright"
            :key="playwriter.id"
          >
            <!-- <div>
              {{ playwriter.first_name }} {{ playwriter.last_name }} &nbsp;
            </div> -->
            <router-link
              class="nav_link_color"
              :to="{
                name: 'playwriter',

                params: {
                  id: playwriter.id,
                  slugin: sluginToServerAuthor,
                  name: transcriptWord(
                    concat(playwriter.first_name, playwriter.last_name)
                  ),
                },
              }"
            >
              <span>
                {{ playwriter.first_name }}
              </span>
              <span>&nbsp;</span>
              <span>
                {{ playwriter.last_name }}
              </span>
              <span> &nbsp; </span>
              <span> &nbsp; </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="d_flex_column padding_tb_3em f_oswald f_size_41" v-else>
      <div>
        {{ dataText.info }}
      </div>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>
        
  <script>
import { transcription, concat } from "../assets/main";
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

// import axios from "axios";

export default {
  name: "TextsView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  props: {
    idCurrentPlay: String,
  },
  data() {
    return {
      dataText: {},
      intrval: null,
      plId: this.idCurrentPlay,
      sluginToServerAuthor: "authors",
      transcriptWord: transcription,
      concat: concat,
    };
  },
  beforeCreate() {},
  created() {
    this.setTitle();
    this.getText().then(() => this.showContent());
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Тексти вистав";
    },

    async getText() {
      this.dataText = await fetch(
        `${this.$store.getters.getServerUrl}/texts/${this.plId}/`
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
        document.querySelector(".text_page").style.opacity = String(cnt);
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
}

@media screen and (max-width: 650px) {
  #authors_txt {
    flex-direction: column;
    text-align: left;
  }
  #text {
    padding: 1em 2em;
  }
}
</style>
            