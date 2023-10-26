<template>
  <div>
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column p_40px padding_faces">
      <div class="margin_both_auto">
        <div id="faces_7" class="d_grid">
          <div
            v-for="playw in firstTwoRowsPlw"
            :key="playw.id"
            class="pad_1em padding_faces"
          >
            <div class="c_pointer">
              <img
                :src="playw.image"
                :alt="playw.name"
                :title="
                  concat(
                    playw.to_playwriter.first_name,
                    playw.to_playwriter.last_name
                  )
                "
                class="size_pictures size_pictures_low_1000"
                :class="{
                  size_pictures: playw.id % 2 == 0,
                  size_pictures_2: playw.id % 2 != 0,
                }"
              />
            </div>
          </div>
        </div>
        <div id="faces_6" class="d_grid_6">
          <div
            v-for="playw in downRowPlw"
            :key="playw.id"
            class="pad_1em padding_faces"
          >
            <div class="c_pointer">
              <img
                :src="playw.image"
                :alt="playw.name"
                :title="
                  concat(
                    playw.to_playwriter.first_name,
                    playw.to_playwriter.last_name
                  )
                "
                class="size_pictures size_pictures_low_1000"
                :class="{
                  size_pictures: playw.id % 2 == 0,
                  size_pictures_2: playw.id % 2 != 0,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div id="idea_main" class="d_flex_column margin_both_auto">
          <div
            id="n_idea"
            class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
          >
            <div>ідея</div>
          </div>
        </div>
        <div id="idea_main_list" class="d_grid_3 ptb_5em margin_both_auto">
          <div v-for="idea in ideas" :key="idea.id" class="pad_b1em">
            <div
              v-html="idea.description"
              class="t_justify p_lr_1 padding_low_1000 f_size_low_1000 open_sans"
            ></div>
            <!-- <hr class="line" /> -->
          </div>
          <!-- <div class="upper_case f_weight_bold">
            більше
          </div> -->
        </div>
      </div>

      <div class="mar_0_06_em">
        <div id="plays_main_name" class="d_flex_column margin_both_auto">
          <div
            class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
          >
            <div>вистави</div>
          </div>
        </div>
        <div id="plays_main_list" class="d_grid_3 ptb_5em">
          <div v-for="play in mainPlays" :key="play.id">
            <router-link
              class="pad_b1em"
              :to="{
                name: 'play',
                params: {
                  id: play.id_play,
                  date_id: play.id,
                  name: transcription(play.name),
                },
              }"
            >
              <div
                class="w_22em h_35em margin_both_auto c_pointer overflow_hidden"
              >
                <img
                  :src="repalcer(play.photo)"
                  :alt="play.name"
                  class="img_on_main h_100 w_100 zoom_hover"
                />
              </div>
              <div
                class="p_abs_text w_max_content color_white p_abs_text_low_1000"
              >
                <div class="f_oswald f_size_40 pl_main">
                  {{ play.name }}
                </div>
                <div class="d_flex_row j_content_start f_source_sans">
                  <div class="pl_main">
                    {{ play.dramaturg[0].first_name }}
                    {{ play.dramaturg[0].last_name }}
                  </div>
                </div>
              </div>
              <div
                class="p_abs_date w_max_content color_white open_sans f_size_32 f_weight_bold pl_main"
              >
                {{ checkDateToShow(play.id, play.on_play) }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-show="answerSubscribe" class="open_sans upper_case padding_tb_2em">
        {{ answerSubscribe }}
      </div>
      <div id="subscribe" class="d_flex_row j_content_space_around w_70">
        <div
          id="lbl_subscribe"
          class="d_flex_column open_sans upper_case t_left"
        >
          <div>
            {{ subscribeLabel.text1 }}
          </div>
          <div class="f_weight_bold">
            {{ subscribeLabel.text2 }}
          </div>
        </div>

        <form
          id="form_subscribe"
          action="POST"
          class="d_flex_row j_content_space_between w_50"
          @submit="toSubscribe"
        >
          <div
            id="places_inputs"
            class="d_flex_row j_content_space_around w_50 h_max horizontal_line"
          >
            <input
              v-model="subscribe.email"
              class="w_100 b_none f_oswald padding_4path sibscribe_input"
              type="email"
              name="email_subscribe"
              id="e_subscribe"
              placeholder="e-mail"
            />
          </div>
          <div
            class="d_flex_row j_content_space_around f_oswald w_50 h_max f_size_32 pad_low_1000"
          >
            <input
              class="btn_black b_none pad_both_7 upper_case sibscribe_button"
              type="submit"
              value="підписатись"
            />
          </div>
        </form>
      </div>
      <div></div>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "MainPageView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      imiterForPositionFaces: 14,
      playwritersCaricatures: [],
      ideas: [],
      mainPlays: [],
      subscribe: {
        email: "",
      },
      subscribeLabel: {
        text1: "хочу отримувати листи від",
        text2: "театру драматургів",
      },
      showIdeas: false,
      mobile: true,
      answerSubscribe: "",
    };
  },
  created() {
    this.getPlaywriters()
      .then(() => this.getIdea())
      .then(() => this.getPlaySMain())
      .then(() => this.getUserAgent());
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Головна";
    },

    concat(first, last) {
      // Конкатенує ім'я
      return `${first} ${last}`;
    },

    async getPlaywriters() {
      this.playwritersCaricatures = await fetch(
        `${this.$store.getters.getServerUrl}/owners_face/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },

    async getPlaySMain() {
      this.mainPlays = await fetch(
        `${this.$store.getters.getServerUrl}/date_plays_main/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
    async getIdea() {
      this.ideas = await fetch(`${this.$store.getters.getServerUrl}/ideas/`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443/" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443/image_theatre/" + str;
    },
    datePlayGet(datePlay) {
      // Змінює формат дати вистави для показу на сторінці
      let dateOnly = String(datePlay).split("T")[0];
      let dates = dateOnly.split("-");
      let correctDate = `${dates[2]}|${dates[1]}`;
      return correctDate;
    },
    checkDateToShow(datePlayId, datesOfPlay = []) {
      // Вибирає потрібну дату
      for (let x = 0; x < datesOfPlay.length; x++) {
        if (datesOfPlay[x].id == datePlayId) {
          let neededDate = this.datePlayGet(datesOfPlay[x].date_pl);
          return neededDate;
        }
      }
      return;
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
    showMoreIdeas() {
      // hide or show all ideas
      this.showIdeas = !this.showIdeas;
    },

    async toSubscribe(e) {
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrl}/subscribe/`;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.subscribe),
      })
        .then((response) => {
          response.json().then((response) => {
            this.answerSubscribe = response.info;
            this.subscribe.email = "";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserAgent() {
      let sUsrAg = navigator.userAgent;
      if (sUsrAg.indexOf("Safari") > -1) {
        let all = document.querySelectorAll(".pl_main");
        for (let x = 0; x < all.length; x++) {
          all[x].style.color = "#212121";
        }
        //"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
      }
    },
  },
  computed: {
    firstTwoRowsPlw() {
      return this.playwritersCaricatures.filter((playwritersCaricatures) => {
        return (
          this.playwritersCaricatures.indexOf(playwritersCaricatures) <
          this.imiterForPositionFaces
        );
      });
    },
    downRowPlw() {
      return this.playwritersCaricatures.filter((playwritersCaricatures) => {
        return (
          this.playwritersCaricatures.indexOf(playwritersCaricatures) >=
          this.imiterForPositionFaces
        );
      });
    },
    renderIdea() {
      if (document.body.offsetWidth < 1000) {
        if (!this.showIdeas) {
          return this.ideas.filter((ideas) => {
            return this.ideas.indexOf(ideas) == 0;
          });
        } else {
          return this.ideas;
        }
      } else {
        return this.ideas;
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1500px) {
  #plays_main_list,
  #idea_main_list {
    grid-template-columns: repeat(2, 1fr);
  }
  .line {
    display: block !important;
  }
}
@media screen and (max-width: 1000px) {
  #plays_main_list,
  #idea_main_list {
    grid-template-columns: repeat(1, 1fr);
  }
  #faces_6 {
    padding-top: 5px;
  }
  #subscribe,
  #form_subscribe {
    flex-direction: column;
    width: 100%;
  }
  #form_subscribe {
    width: 90%;
    margin: 0 auto;
  }
  #places_inputs {
    width: 50%;
  }
  #lbl_subscribe {
    padding: 15px 10px;
  }
  #hider {
    display: block;
  }
  #unpack {
    display: block;
  }
  #n_idea {
    padding-bottom: 0;
  }

  .size_low_1000_img {
    height: 26em;
  }

  .size_pictures_low_1000 {
    height: 50px !important;
    width: 40px !important;
  }
  .padding_faces {
    padding: 0 !important;
  }
  .padding_low_1000 {
    padding: 0.9em !important;
  }
  .pad_low_1000 {
    padding: 15px 0;
  }
  .p_abs_text_low_1000 {
    left: calc(100% / 3.5) !important;
    left: 29% !important;
  }
  .p_abs_date {
    left: calc(100% / 1.7);
    left: 60%;
  }
  .f_size_low_1000 {
    font-size: 0.8em;
  }
}
@media screen and (max-width: 500px) {
  #places_inputs {
    width: 100%;
  }
  .p_abs_text_low_1000 {
    left: calc(100% / 20) !important;
    left: 5% !important;
  }
  .p_abs_date {
    left: calc(100% / 1.5);
    left: 70%;
  }
}
.size_pictures,
.size_pictures_2 {
  height: 100px;
  width: 80px;
}

.size_pictures:hover,
.size_pictures_2:hover {
  /* height: 120px;
  width: 100px; */
  padding-left: 8px;
  transform: scale(1.2);
}

.size_pictures_2:hover {
  padding-top: 8px;
}
.zoom_hover {
  transition: all 1s ease-out;
}
.zoom_hover:hover {
  transform: scale(1.2);
}

.line {
  display: none;
}
.sibscribe_input {
  outline: none;
  color: black;
}
.sibscribe_button:hover {
  font-weight: 600;
}
.unpack_ideas {
  display: none;
}
</style>