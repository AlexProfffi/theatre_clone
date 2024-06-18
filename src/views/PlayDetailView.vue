<template>
  <div v-if="!isMobile">
    <div v-if="showSpiner" id="spinner_is">
      <SpinerComponent />
    </div>
    <div id="detail" class="home_play" v-else>
      <div>
        <HeaderComponent />
      </div>
      <div class="d_flex_column">
        <div v-for="pl in playList" :key="pl.id_play">
          <PhotoPlayComponent
            :photo="''"
            :photo_2="pl.photo_2"
            :photo_3="pl.photo_3"
            :photo_4="pl.photo_4"
            :photo_5="pl.photo_5"
            :photo_6="pl.photo_6"
            :photo_7="pl.photo_7"
            :photo_8="pl.photo_8"
            :photo_9="pl.photo_9"
            :photo_10="pl.photo_10"
            :ident="0"
            :domain="false"
          />
          <div class="d_flex_row j_content_center pad_b3em pad_top">
            <h3
              v-if="$store.state.currentLanguage == 0"
              id="pl_name"
              class="play_hame_h3 upper_case pad_top f_size_42 open_sans"
            >
              {{ pl.name }}
            </h3>
            <h3
              v-else-if="$store.state.currentLanguage == 2"
              id="pl_name"
              class="play_hame_h3 upper_case pad_top f_size_42 open_sans"
            >
              {{ pl.name_en }}
            </h3>
          </div>
        </div>

        <div class="d_flex_row margin_both_2">
          <div
            class="small_font_09"
            v-for="tg in playOneDate.tags"
            :key="tg.id"
          >
            <a href=""> #{{ tg.name }}&nbsp; </a>
          </div>
        </div>
        <div class="margin_both_2 bg_grey_custom padding_tb_2em">
          <AboutPlayShortComponentVue
            :play="playOneDate"
            :idDatePlayOne="playOneDate.id"
            :withPhoto="false"
            :linkPay="linkPay"
            :idp="inId"
            :isPast="playOneDate.is_play_past"
            :isPastOnView="playOneDate.is_past"
          />
        </div>
        <div
          id="offerContract"
          class="d_flex_row j_content_start margin_both_2"
          v-if="$store.state.currentLanguage == 0"
        >
          <div class="t_left">Купуючи квиток Ви погоджуєтесь з</div>
          <div>
            <div class="p_l_0_3">
              <a
                :href="publicPath + 'offerts/publick_offert.pdf'"
                class="nav_link_color c_pointer offerts"
              >
                {{ dataTextOffert.ua.offerta }}
              </a>

              <a
                :href="publicPath + 'offerts/kurochkin-leschenko.pdf'"
                class="nav_link_color c_pointer offerts"
              >
                {{ dataTextOffert.ua.contract }}
              </a>
              <span>
                {{ dataTextOffert.ua.unionWord }}
              </span>
              <a
                :href="publicPath + 'offerts/return-money.pdf'"
                class="nav_link_color c_pointer offerts"
              >
                {{ dataTextOffert.ua.returtTicket }}
              </a>
            </div>
          </div>
        </div>
        <div
          id="offerContract"
          class="d_flex_row j_content_start margin_both_2"
          v-else-if="$store.state.currentLanguage == 2"
        >
          <div class="t_left">
            {{ dataTextOffert.en.txt }}
          </div>
          <div>
            <div class="p_l_0_3">
              <a
                :href="publicPath + 'offerts/publick_offert.pdf'"
                class="nav_link_color c_pointer offerts"
              >
                {{ dataTextOffert.en.offerta }}
              </a>

              <a
                :href="publicPath + 'offerts/kurochkin-leschenko.pdf'"
                class="nav_link_color c_pointer offerts"
              >
                {{ dataTextOffert.en.contract }}
              </a>
              <span>
                {{ dataTextOffert.en.unionWord }}
              </span>
              <a
                :href="publicPath + 'offerts/return-money.pdf'"
                class="nav_link_color c_pointer offerts"
              >
                {{ dataTextOffert.en.returtTicket }}
              </a>
            </div>
          </div>
        </div>
        <div v-if="playOneDate.source_video">
          <video width="530" height="440" controls autoplay>
            <source
              :src="repalcer(playOneDate.source_video, '')"
              type="video/mp4"
            />
          </video>
        </div>
        <div
          class="d_flex_column margin_both_2 horizontal_line"
          v-else-if="playOneDate.link_video"
        >
          <div
            class="d_flex_row j_content_center padding_tb_2em"
            v-html="playOneDate.link_video"
          ></div>
        </div>
        <div v-else class="h_7em"></div>
        <div class="d_flex_column j_content_space_between">
          <div class="d_flex_row margin_both_2" id="navigate_desc">
            <div
              class="d_flex_row upper_case navigate_ul open_sans f_size_15"
              name="current"
            >
              <span
                v-for="palyNav in dataNaviAboutPlay()"
                :key="palyNav.value"
                class="margin_1_em"
              >
                <span class="nav_link_color c_pointer">
                  {{ palyNav.txt }}
                </span>
              </span>
            </div>
          </div>
          <div
            id="about_play"
            class="d_flex_row j_content_space_between margin_both_2 ptb_70"
          >
            <div
              class="d_flex_column w_50"
              id="descript"
              name="description_level"
            >
              <div class="d_flex_row">
                <h2
                  id="head_description"
                  class="upper_case open_sans f_weight_bold"
                  v-if="$store.state.currentLanguage == 0"
                >
                  {{ dataText.aboutPlayUa }}
                </h2>
                <h2
                  id="head_description"
                  class="upper_case open_sans f_weight_bold"
                  v-else-if="$store.state.currentLanguage == 2"
                >
                  {{ dataText.aboutPlayEn }}
                </h2>
              </div>
              <div
                v-if="$store.state.currentLanguage == 0"
                class="d_flex_row w_50 t_left pad_top"
                id="inner_descript"
              >
                <p
                  v-if="playOneDate.description"
                  class="open_sans text_descript"
                  v-html="playOneDate.description"
                ></p>
                <p v-else>{{ dataText.alterTxtUa }}</p>
              </div>
              <div
                v-else-if="$store.state.currentLanguage == 2"
                class="d_flex_row w_50 t_left pad_top"
                id="inner_descript"
              >
                <p
                  v-if="playOneDate.description_en"
                  class="open_sans text_descript"
                  v-html="playOneDate.description_en"
                ></p>
                <p v-else>{{ dataText.alterTxtEn }}</p>
              </div>
              <div id="link_txt_play" class="d_flex_row">
                <a
                  class="nav_link_color horizontal_line"
                  :href="'/text-play/' + idPlay"
                  v-if="$store.state.currentLanguage == 0"
                >
                  {{ dataText.txtPlayUa }}
                </a>
                <a
                  class="nav_link_color horizontal_line"
                  :href="'/text-play/' + idPlay"
                  v-else-if="$store.state.currentLanguage == 2"
                >
                  {{ dataText.txtPlayEn }}
                </a>
              </div>
            </div>
            <div
              class="d_flex_column w_50"
              id="actors_list"
              name="actors_level"
            >
              <div class="d_flex_row">
                <h2
                  id="head_actors"
                  class="upper_case open_sans f_weight_bold t_left"
                  v-if="$store.state.currentLanguage == 0"
                >
                  {{ dataText.castUa }}
                </h2>
                <h2
                  id="head_actors"
                  class="upper_case open_sans f_weight_bold t_left"
                  v-else-if="$store.state.currentLanguage == 2"
                >
                  {{ dataText.castEn }}
                </h2>
              </div>
              <div class="d_flex_row pad_top">
                <ul v-if="playOneDate.staff.length > 1">
                  <li
                    v-for="act in playOneDate.staff"
                    :key="act.id"
                    class="open_sans t_left"
                  >
                    <router-link
                      class="nav_link_color"
                      :to="{
                        name: 'playwriter',

                        params: {
                          id: act.id,
                          slugin: actorOrDirector(act.role),
                          name: transcriptWord(
                            concat(act.first_name, act.last_name)
                          ),
                        },
                      }"
                    >
                      <span class="f_weight_bold p_l_0_5">
                        {{ act.first_name }}
                      </span>
                      <span class="f_weight_bold p_l_0_3">
                        {{ act.last_name }}
                      </span>
                    </router-link>
                  </li>
                </ul>
                <div v-else>
                  <p v-if="$store.state.currentLanguage == 0">
                    {{ dataText.alterTxtUa }}
                  </p>
                  <p v-else-if="$store.state.currentLanguage == 2">
                    {{ dataText.alterTxtEn }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="d_flex_row"></div>
        </div>

        <div id="cmnts" class="p_40px">
          <CommentsComponent :oneIdPlay="id" />
        </div>
      </div>

      <div>
        <FooterComponent />
      </div>
    </div>
  </div>
</template>
 
<script>
// @ is an alias to /src
// import lqPay from "../assets/main.js"
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import PhotoPlayComponent from "@/components/photoPlay/PhotoPlayComponent.vue";
import SpinerComponent from "@/components/helpers/SpinerComponent.vue";
import AboutPlayShortComponentVue from "@/components/main/AboutPlay/AboutPlayShortComponent.vue";
import CommentsComponent from "@/components/comments/CommentsComponent.vue";
import { transcription, concat, getBeginCoordElement } from "../assets/main";

export default {
  name: "PlayDetailView",
  components: {
    HeaderComponent,
    FooterComponent,
    PhotoPlayComponent,
    SpinerComponent,
    AboutPlayShortComponentVue,
    CommentsComponent,
  },
  props: {
    id: String,
    date_id: String,
    toReviews: Boolean,
  },
  data() {
    return {
      scrollToReview: this.toReviews,
      publicPath: process.env.BASE_URL,
      showSpiner: true,
      isMobile: false,
      play: {},
      playList: [],
      idPlay: this.id,
      linkPayList: [],
      linkPay: {},
      statusPay: {},
      statusPayList: [],
      interval: null,
      counterToErrorStatus: 0,
      offert: null,
      linkOffert: null,
      textRing: false,
      playOneDate: {},
      referalUrl: "Театр",
      inId: this.id,
      transcriptWord: transcription,
      concat: concat,
      sluginToServerActor: "actors",
      dataText: {
        alterTxtUa: "Інформація з`явиться незабаром",
        alterTxtEn: "Information will appear soon",
        castUa: "акторський та режисерський склад",
        castEn: "cast and director",
        txtPlayUa: "Текст вистави",
        txtPlayEn: "The text of the play",
        aboutPlayUa: "про виставу",
        aboutPlayEn: "about the play",
      },
      dataTextOffert: {
        ua: {
          txt: "Купуючи квиток Ви погоджуєтесь з",
          returtTicket: "«Повернення квитків»",
          contract: "«Договір»",
          offerta: "«Оферта» ",
          unionWord: " та ",
        },
        en: {
          txt: "By buying a ticket, you agree with",
          returtTicket: "«Refund of tickets»",
          contract: "«Contract»",
          offerta: "«Offer» ",
          unionWord: " and ",
        },
      },
    };
  },
  created() {
    this.getDatePlay()
      .then(() => this.getOffert())
      .then(() => this.playList.push(this.playOneDate))
      .then(() => this.linkPayList.push(this.linkPay))
      .then(() => this.setTitle())
      .then(() => {
        this.showSpiner = false;
      })
      .then(() => {
        this.goToReview();
      })
      .then(() => this.setReferalLink());
  },
  methods: {
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
    goToReview() {
      // Прокручує сторінку до відгуків
      if (this.toReviews == "true") {
        window.scrollTo(getBeginCoordElement("#cmnts"));
      }
    },

    async setReferalLink() {
      // Отримує реферальне посилання
      if (document.referrer) {
        this.referalUrl = document.referrer;
        localStorage.setItem("referal", this.referalUrl);
      }
    },

    actorOrDirector(rols) {
      if (rols.indexOf("Режисерка") > -1 || rols.indexOf("Режисер") > -1) {
        return "directors";
      } else if (rols.indexOf("Актор") > -1 || rols.indexOf("Акторка") > -1) {
        return "actors";
      }
      return "crew";
    },

    async getOffert() {
      // Фільтр по місяцям
      this.offert = await fetch(`${this.$store.getters.getServerUrl}/offert/`)
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },

    async getPlay() {
      this.play = await fetch(
        `${this.$store.getters.getServerUrl}/playss_all/${this.id}/`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    

    async getDatePlay() {
      this.playOneDate = await fetch(
        `${this.$store.getters.getServerUrl}/date_one_plays/${this.date_id}/`
      ).then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          console.log(response.status);
        }
      });
    },

    async getLinkPay() {
      // Посилання на оплату
      this.linkPay = await fetch(
        `${this.$store.getters.getServerUrl}/buy_ticket/${this.id}/`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    correctRange(hours, minutes) {
      // Коригує час тривалості
      let range = [hours, minutes];
      if (minutes > 59) {
        range[0] = Math.floor(minutes / 60) + hours;
        range[1] = minutes % 60;
      }
      return range;
    },

    setDurationPlay(time, duration) {
      // Діапазон тривалості вистав
      // від-до
      let onlytime = String(time).split("T")[1];
      onlytime = onlytime.split("+")[0].split(":").slice(0, 2);
      let dur;
      let minutes = duration;
      let hour = 0;
      let rangeLoc = this.correctRange(hour, minutes);
      dur = this.correctRange(
        rangeLoc[0] + Number(onlytime[0]),
        rangeLoc[1] + Number(onlytime[1])
      );
      if (dur[1] < 10) {
        dur[1] = `0${dur[1]}`;
      }

      let dataDuration = [
        { value: 0, text: onlytime.join(".") },
        { value: 1, text: " - " },
        { value: 2, text: dur.join(".") },
      ];
      return dataDuration;
    },
    async setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = this.playList[0].name;
    },
    pay(lnk, runSpiner = false) {
      //  Перехід на іншу сторінку з фокусом на ній
      if (runSpiner) {
        window.open(lnk, "_blank").focus();
        this.setOrderInToStorage();
        document.querySelector("#email").disabled = true;
        this.callBackData.email = "";
      } else {
        window.open(lnk, "_blank").focus();
      }
    },

    dataNaviAboutPlay() {
      // Навігація в інфо про виставу
      let dt = [];
      let preparedData = ["про виставу", "команда", "коментарі", "деталі"];
      let linksNav = [
        "#description_level",
        "#actors_level",
        "#current",
        "#current",
      ];
      for (let x = 0; x < preparedData.length; x++) {
        dt.push({ value: x, txt: preparedData[x], toNav: linksNav[x] });
      }
      return dt;
    },

    rolesAll(lst) {
      // Актор/ка
      let isActresses = lst.indexOf("Актор");
      let isActror = lst.indexOf("Акторка");
      if (isActresses > -1 || isActror > -1) {
        return true;
      }
      console.log(isActresses, isActror);
    },

    getActors(staffers) {
      // Повертає акторів
      let actors = [];
      for (let x = 0; x < staffers.length; x++) {
        if (staffers[x].role.indexOf("Актор") > -1) {
          actors.push(`${staffers[x].first_name} ${staffers[x].last_name}`);
        } else if (staffers[x].role.indexOf("Акторка") > -1) {
          actors.push(`${staffers[x].first_name} ${staffers[x].last_name}`);
        }
      }
      return actors;
    },
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1550px) {
  #form_pay {
    width: 35vw;
    padding: 20px 0 20px 0;
  }
  #pay_b {
    margin: 10px 0 0 0;
  }
  .play_hame_h3 {
    padding-top: 5px;
    font-size: 2.5em;
  }
}

@media screen and (max-width: 1000px) {
  #frame_youtube {
    width: 90vw;
    height: 300px;
  }
  #spinner_is {
    margin-top: 10em;
  }
  #label_spiner {
    padding-top: 4em;
    font-size: 14px;
  }

  #link_txt_play {
    padding-bottom: 2em;
  }

  #offerContract {
    flex-direction: column;
  }

  #about_play {
    flex-direction: column;
  }

  #actors_list,
  #descript,
  #inner_descript {
    width: 100%;
  }
  #navigate_desc {
    justify-content: space-around;
    font-size: 0.7em;
    margin: 0;
  }
  .offert_site {
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  .text_descript {
    font-size: 12px;
    text-align: justify;
  }

  .play_hame_h3 {
    padding-top: 20px;
    font-size: 1.5em;
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 9%;
  }
}

.home_play {
  display: flex;
  flex-direction: column;
}

.navigate_ul {
  list-style: none;
}
</style>
    