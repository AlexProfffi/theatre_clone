<template>
  <div>
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column p_40px padding_faces opacity_05 main_content">
      <!-- ENG LANGUAGE -->
      <div
        v-if="$store.state.currentLanguage == 2"
      >
        <div id="faces_dramats" class="m_both_0_12">
          <div id="faces_7" class="d_grid">
            <div
              v-for="playw in firstTwoRowsPlw"
              :key="playw.id"
              class="pad_1em padding_faces"
            >
              <div class="c_pointer">
                <router-link
                  :to="{
                    name: 'playwriter',
                    params: {
                      id: playw.to_playwriter.id,
                      slugin: 'authors',
                      name: transcriptWord(
                        concat(
                          playw.to_playwriter.first_name,
                          playw.to_playwriter.last_name
                        )
                      ),
                    },
                  }"
                >
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
                </router-link>
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
                <router-link
                  :to="{
                    name: 'playwriter',
                    params: {
                      id: playw.to_playwriter.id,
                      slugin: 'authors',
                      name: transcriptWord(
                        concat(
                          playw.to_playwriter.first_name,
                          playw.to_playwriter.last_name
                        )
                      ),
                    },
                  }"
                >
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
                </router-link>
              </div>
            </div>
          </div>
          <div class="d_flex_row_reverse">
            <div class="small_font">
              The author of the logo - Luda Timoshenko
            </div>
          </div>
        </div>
        <marquee
          v-if="runTxt.length"
          class="upper_case ptb_1em"
          truespeed
          :scrollamount="runTxt[0].speed"
          scrolldelay="15"
        >
          {{ runTxt[0].text }}
        </marquee>
        <div class="">
          <div id="idea_main" class="d_flex_column margin_both_auto">
            <div
              id="n_idea"
              class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
            >
              <div>
                {{ nameIdea.txt_en }}
              </div>
            </div>
          </div>
          <div
            id="idea_main_list"
            class="ptb_5em margin_both_auto"
            :class="{
              d_grid_3: ideas.length == 3,
              d_grid_1: ideas.length == 1,
              d_grid_2: ideas.length == 2,
            }"
          >
            <div
              v-for="idea in ideas"
              :key="idea.id"
              class="d_flex_row j_content_center pad_b1em"
            >
              <div
                v-html="idea.description_new_en"
                class="t_justify p_lr_1 padding_low_1000 f_size_low_1000 f_source_sans f_18"
              ></div>
            </div>
          </div>
        </div>

        <div class="mar_0_06_em">
          <div id="plays_main_name" class="d_flex_column margin_both_auto">
            <div
              class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
            >
              <div>
                {{ namePage.txt_en }}
              </div>
            </div>
          </div>
          <div id="plays_main_list" class="d_grid_3 ptb_5em">
            <div class="p_relative" v-for="play in mainPlays" :key="play.id">
              <div
                class="w_22em h_35em margin_both_auto c_pointer overflow_hidden"
                :class="{ opacity_0_3: play.is_past }"
              >
                <div
                  class="p_absolute z_20 color_white open_sans f_size_32 f_weight_bold"
                  v-if="play.is_past"
                >
                  <div class="f_16">
                    {{ playPast.txt_en }}
                  </div>
                </div>
                <router-link
                  class="pad_b1em color_white"
                  :to="{
                    name: 'play',
                    params: {
                      id: play.id_play,
                      date_id: play.id,
                      name: transcriptWord(play.name),
                    },
                  }"
                >
                  <img
                    :src="repalcer(play.photo)"
                    :alt="play.name"
                    class="img_on_main h_100 w_100 zoom_hover"
                  />
                </router-link>
              </div>

              <div class="p_relative h_100">
                <div
                  class="p_relative p_abs_date top_800 w_max_content color_white open_sans f_size_32 f_weight_bold pl_main_date"
                >
                  {{ checkDateToShow(play.id, play.on_play) }}
                </div>
                <div
                  class="p_relative p_abs_text top_85 w_max_content t_left p_abs_text_low_1000 pl_plw_main"
                >
                  <router-link
                    class="pad_b1em color_white"
                    :to="{
                      name: 'play',
                      params: {
                        id: play.id_play,
                        date_id: play.id,
                        name: transcriptWord(play.name),
                      },
                    }"
                  >
                    <div class="f_oswald f_size_40 pl_main">
                      {{ play.name }}
                    </div>
                    <div class="d_flex_row j_content_start f_source_sans">
                      <div
                        v-if="play.dramaturg.length == 1"
                        class="pl_main nowrap_space"
                      >
                        {{ play.dramaturg[0].first_name }}
                        {{ play.dramaturg[0].last_name }}
                      </div>
                      <div
                        v-else-if="play.dramaturg.length > 1"
                        class="pl_main nowrap_space"
                      >
                        <span v-if="play.dramaturg.length % 10 == 2">
                          {{ play.dramaturg.length }} драматурга
                        </span>
                        <span v-else-if="play.dramaturg.length % 10 == 3">
                          {{ play.dramaturg.length }} драматурга
                        </span>
                        <span v-else-if="play.dramaturg.length % 10 == 4">
                          {{ play.dramaturg.length }} драматурга
                        </span>
                        <span v-else>
                          {{ play.dramaturg.length }} драматургів
                        </span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="answerSubscribe"
          class="open_sans upper_case padding_tb_2em"
        >
          {{ answerSubscribe }}
        </div>
        <div class="p_sticky z_20">
          <div id="subscribe" class="d_flex_row j_content_center">
            <div
              id="lbl_subscribe"
              class="d_flex_column f_source_sans upper_case t_left little_pad"
            >
              <div>
                {{ subscribeLabelEn.text1 }}
              </div>
              <div class="f_weight_bold">
                {{ subscribeLabelEn.text2 }}
              </div>
            </div>

            <form
              id="form_subscribe"
              action="POST"
              class="d_flex_row j_content_start"
              @submit="toSubscribe"
            >
              <div
                id="places_inputs"
                class="d_flex_row j_content_space_around w_50 h_max horizontal_line little_pad"
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
                class="d_flex_row j_content_start f_oswald w_50 h_max little_pad f_size_32 pad_low_1000"
              >
                <input
                  class="btn_black b_none pad_both_7 upper_case sibscribe_button"
                  type="submit"
                  value="subscribe"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- UKR LANGUAGE -->
      <div
        
        v-else-if="$store.state.currentLanguage == 0"
      >
        <div id="faces_dramats" class="m_both_0_12">
          <div id="faces_7" class="d_grid">
            <div
              v-for="playw in firstTwoRowsPlw"
              :key="playw.id"
              class="pad_1em padding_faces"
            >
              <div class="c_pointer">
                <router-link
                  :to="{
                    name: 'playwriter',
                    params: {
                      id: playw.to_playwriter.id,
                      slugin: 'authors',
                      name: transcriptWord(
                        concat(
                          playw.to_playwriter.first_name,
                          playw.to_playwriter.last_name
                        )
                      ),
                    },
                  }"
                >
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
                </router-link>
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
                <router-link
                  :to="{
                    name: 'playwriter',
                    params: {
                      id: playw.to_playwriter.id,
                      slugin: 'authors',
                      name: transcriptWord(
                        concat(
                          playw.to_playwriter.first_name,
                          playw.to_playwriter.last_name
                        )
                      ),
                    },
                  }"
                >
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
                </router-link>
              </div>
            </div>
          </div>
          <div class="d_flex_row_reverse">
            <div class="small_font">Автор лого - Люда Тимошенко</div>
          </div>
        </div>
        <marquee
          v-if="runTxt.length"
          class="upper_case ptb_1em"
          truespeed
          :scrollamount="runTxt[0].speed"
          scrolldelay="15"
        >
          {{ runTxt[0].text }}
        </marquee>
        <div class="">
          <div id="idea_main" class="d_flex_column margin_both_auto">
            <div
              id="n_idea"
              class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
            >
              <div>
                {{ nameIdea.txt_ua }}
              </div>
            </div>
          </div>
          <div
            id="idea_main_list"
            class="ptb_5em margin_both_auto"
            :class="{
              d_grid_3: ideas.length == 3,
              d_grid_1: ideas.length == 1,
              d_grid_2: ideas.length == 2,
            }"
          >
            <div
              v-for="idea in ideas"
              :key="idea.id"
              class="d_flex_row j_content_center pad_b1em"
            >
              <div
                v-html="idea.description_new_ua"
                class="t_justify p_lr_1 padding_low_1000 f_size_low_1000 f_source_sans f_18"
              ></div>
            </div>
          </div>
        </div>

        <div class="mar_0_06_em">
          <div id="plays_main_name" class="d_flex_column margin_both_auto">
            <div
              class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
            >
              <div>
                {{ namePage.txt_ua }}
              </div>
            </div>
          </div>
          <div id="plays_main_list" class="d_grid_3 ptb_5em">
            <div class="p_relative" v-for="play in mainPlays" :key="play.id">
              <div
                class="w_22em h_35em margin_both_auto c_pointer overflow_hidden"
                :class="{ opacity_0_3: play.is_past }"
              >
                <div
                  class="p_absolute z_20 color_white open_sans f_size_32 f_weight_bold"
                  v-if="play.is_past"
                >
                  <div>
                    {{ playPast.txt_ua }}
                  </div>
                </div>
                <router-link
                  class="pad_b1em color_white"
                  :to="{
                    name: 'play',
                    params: {
                      id: play.id_play,
                      date_id: play.id,
                      name: transcriptWord(play.name),
                    },
                  }"
                >
                  <img
                    :src="repalcer(play.photo)"
                    :alt="play.name"
                    class="img_on_main h_100 w_100 zoom_hover"
                  />
                </router-link>
              </div>

              <div class="p_relative h_100">
                <div
                  class="p_relative p_abs_date top_800 w_max_content color_white open_sans f_size_32 f_weight_bold pl_main_date"
                >
                  {{ checkDateToShow(play.id, play.on_play) }}
                </div>
                <div
                  class="p_relative p_abs_text top_85 w_max_content t_left p_abs_text_low_1000 pl_plw_main"
                >
                  <router-link
                    class="pad_b1em color_white"
                    :to="{
                      name: 'play',
                      params: {
                        id: play.id_play,
                        date_id: play.id,
                        name: transcriptWord(play.name),
                      },
                    }"
                  >
                    <div class="f_oswald f_size_40 pl_main">
                      {{ play.name }}
                    </div>
                    <div class="d_flex_row j_content_start f_source_sans">
                      <div
                        v-if="play.dramaturg.length == 1"
                        class="pl_main nowrap_space"
                      >
                        {{ play.dramaturg[0].first_name }}
                        {{ play.dramaturg[0].last_name }}
                      </div>
                      <div
                        v-else-if="play.dramaturg.length > 1"
                        class="pl_main nowrap_space"
                      >
                        <span v-if="play.dramaturg.length % 10 == 2">
                          {{ play.dramaturg.length }} драматурга
                        </span>
                        <span v-else-if="play.dramaturg.length % 10 == 3">
                          {{ play.dramaturg.length }} драматурга
                        </span>
                        <span v-else-if="play.dramaturg.length % 10 == 4">
                          {{ play.dramaturg.length }} драматурга
                        </span>
                        <span v-else>
                          {{ play.dramaturg.length }} драматургів
                        </span>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="answerSubscribe"
          class="open_sans upper_case padding_tb_2em"
        >
          {{ answerSubscribe }}
        </div>
        <div class="p_sticky z_20">
          <div id="subscribe" class="d_flex_row j_content_center">
            <div
              id="lbl_subscribe"
              class="d_flex_column f_source_sans upper_case t_left little_pad"
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
              class="d_flex_row j_content_start"
              @submit="toSubscribe"
            >
              <div
                id="places_inputs"
                class="d_flex_row j_content_space_around w_50 h_max horizontal_line little_pad"
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
                class="d_flex_row j_content_start f_oswald w_50 h_max little_pad f_size_32 pad_low_1000"
              >
                <input
                  class="btn_black b_none pad_both_7 upper_case sibscribe_button"
                  type="submit"
                  value="підписатись"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="p_sticky z_20">
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { transcription } from "../assets/main";

export default {
  name: "MainPageView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      transcriptWord: transcription,
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
      subscribeLabelEn: {
        text1: "I want to receive letters from",
        text2: "the Playwrights Theater",
      },
      namePage: {
        txt_ua: "вистави",
        txt_en: "plays",
      },
      nameIdea: {
        txt_ua: "ідея",
        txt_en: "idea",
      },
      playPast: {
        txt_ua: "вистава вже минула",
        txt_en: "the performance has already passed",
      },
      showIdeas: false,
      mobile: true,
      answerSubscribe: "",
      lengthElNamePlay: 350,
      coefficientTop: 1.1,
      coefficientTopDate: 3.1,
      intrval: null,
      runTxt: [],
    };
  },
  created() {
    this.getPlaywriters()

      .then(() => this.getIdea())
      .then(() => this.getPlaySMain())
      .then(() => this.getRunningText())
      .then(() => this.instanceNewWidth(this.lengthElNamePlay))
      .then(() => this.showContent())
      .then(() => {
        this.delInfoBuyTicket();
      });
    this.setTitle();
    localStorage.removeItem("youAuth");
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Головна";
    },

    async showContent() {
      // Показує контент методом підвищення opacity
      let cnt = 0;
      if (document.querySelector(".main_content")) {
        this.intrval = setInterval(() => {
          document.querySelector(".main_content").style.opacity = String(cnt);
          if (cnt >= 1) {
            clearInterval(this.intrval);
            return;
          }
          cnt += 0.1;
        }, 50);
      }
    },

    concat(first, last) {
      // Конкатенує ім'я
      return `${first} ${last}`;
    },

    async getRunningText() {
      this.runTxt = await fetch(
        `${this.$store.getters.getServerUrl}/running_txt/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },

    async delInfoBuyTicket() {
      if (localStorage.getItem("infoForTicket")) {
        localStorage.removeItem("infoForTicket");
      }
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
      if (sUsrAg.indexOf("Safari") > -1 && document.body.offsetWidth < 500) {
        let all = document.querySelectorAll(".pl_plw_main");
        for (let x = 0; x < all.length; x++) {
          all[x].style.color = "#212121";
          all[x].style.position = "static";
          all[x].style.display = "flex";
          all[x].style.flexDirection = "column";
        }
        //"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
      }
      return;
    },
    async instanceNewWidth(lenElement) {
      // Змінює розашування елемента, якщо його довжина більша за lenElement
      let all = document.querySelectorAll(".pl_plw_main");
      // let allDate = document.querySelectorAll(".pl_main_date");
      for (let x = 0; x < all.length; x++) {
        let lenW = all[x].offsetWidth;
        if (lenW > Number(lenElement)) {
          all[x].style.width = "min-content";
          let lenH = all[x].offsetHeight + all[x].offsetHeight * 0.17;

          let imiter = lenH * this.coefficientTop;
          all[x].style.top = `${imiter * -1}px`;
        }
      }
      //"Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
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
@media screen and (max-width: 2565px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 29% !important;
  }
}

@media screen and (max-width: 2400px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 30% !important;
  }
}
@media screen and (max-width: 2200px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 28% !important;
  }
}

@media screen and (max-width: 2000px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 25% !important;
  }
  .p_abs_date {
    z-index: 15;
    left: 65%;
  }
}

@media screen and (max-width: 1600px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 17% !important;
  }
}

@media screen and (max-width: 1500px) {
  #plays_main_list {
    grid-template-columns: repeat(2, 1fr);
  }
  #idea_main_list {
    grid-template-columns: repeat(1, 1fr);
  }
  .line {
    display: block !important;
  }
  .p_abs_text_low_1000 {
    left: calc(100% / 4);
    left: 25%;
  }
}

@media screen and (max-width: 1490px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 26% !important;
  }
}

@media screen and (max-width: 1260px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 21% !important;
  }
}

@media screen and (max-width: 1100px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 3.1) !important;
    left: 15% !important;
  }
}

@media screen and (max-width: 1000px) {
  #faces_dramats {
    margin: 0 auto;
  }
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
    left: calc(100% / 3.1) !important;
    left: 32%;
  }
  .p_abs_date {
    left: calc(100% / 1.7);
    left: 60%;
  }
  .f_size_low_1000 {
    font-size: 0.8em;
  }
}
@media screen and (max-width: 725px) {
  .p_abs_text_low_1000 {
    left: calc(100% / 4) !important;
    left: 5% !important;
  }
  .w_22em {
    width: 95vw;
  }
  .p_abs_date {
    z-index: 15;
    left: 85%;
  }
}

@media screen and (max-width: 500px) {
  #places_inputs {
    width: 100%;
  }
  .p_abs_text_low_1000 {
    left: calc(100% / 8) !important;
    left: 1em !important;
  }
  .p_abs_date {
    left: calc(100% / 1.5);
    left: 70%;
  }
}
@media screen and (max-width: 376px) {
  #places_inputs {
    width: 100%;
  }
  .p_abs_text_low_1000 {
    left: calc(100% / 26) !important;
    left: 1em !important;
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

.sibscribe_button {
  transition: all 0.2s ease-out;
}
.sibscribe_button:hover {
  transform: scale(1.1);
}
.unpack_ideas {
  display: none;
}

/* runjing text */

.block {
  height: 90px;
  width: 80%;
  margin: 0 auto;
  background: #ffffff;
}

.block p {
  text-align: center;
  color: #212121;
  text-transform: uppercase;
  padding-top: 35px;
  animation: text 25s infinite linear;
  padding-left: 100%;
  white-space: nowrap;
}

@keyframes text {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-185%, 0);
  }
}
</style>