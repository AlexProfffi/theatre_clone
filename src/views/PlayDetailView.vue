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
            :photo="pl.photo"
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
              id="pl_name"
              class="play_hame_h3 upper_case pad_top f_size_42 open_sans"
            >
              {{ pl.name }}
            </h3>
          </div>
        </div>
        <div class="margin_both_2 bg_grey_custom padding_tb_2em">
          <AboutPlayShortComponentVue
            :play="playOneDate"
            :idDatePlayOne="playOneDate.id"
            :withPhoto="false"
            :linkPay="linkPay"
          />
        </div>
        <div id="offerContract" class="d_flex_row j_content_start margin_both_2">
          <div class="t_left">Купуючи квиток Ви погоджуєтесь з</div>
          <div v-if="offert.length == 1">
            <div v-for="offs in offert" :key="offs.id">
              <div class="p_l_0_3">
                <span
                  @click="pay(offs.file_offer)"
                  class="nav_link_color c_pointer offerts"
                >
                  «Публічною офертою»
                </span>
                <span v-if="offs.file_contract">та</span>
                <span
                  v-if="offs.file_contract"
                  @click="pay(offs.file_contract)"
                  class="nav_link_color c_pointer offerts"
                >
                  «Договором»
                </span>
                <span
                  v-if="offs.file_lawyer"
                  @click="pay(offs.file_lawyer)"
                  class="nav_link_color c_pointer offerts"
                >
                  «Умовою повернення коштів»
                </span>
              </div>
            </div>
          </div>
          <div v-else-if="offert.length > 1" class="d_flex_row offert_site">
            
            <div v-for="offs in offert" :key="offs.id" class="">
              <div class="p_l_0_3 ">
                <span
                  @click="pay(offs.file_offer)"
                  class="nav_link_color c_pointer offerts nowrap_space"
                >
                «{{ offs.name }}» 
                </span>
                <span v-if="offert.indexOf(offs) < offert.length-1">та</span>
              </div>
            </div>
          </div>
        </div>
        <div class="h_7em"></div>
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
                >
                  про виставу
                </h2>
              </div>
              <div class="d_flex_row w_50 t_left pad_top" id="inner_descript">
                <p
                  v-if="playOneDate.description"
                  class="open_sans text_descript"
                >
                  {{ playOneDate.description }}
                </p>
                <p v-else>Інформація з`явиться незабаром</p>
              </div>
            </div>
            <div
              class="d_flex_column w_50"
              id="actors_list"
              name="actors_level"
            >
              <div class="d_flex_row">
                <h2 id="head_actors" class="upper_case open_sans f_weight_bold">
                  акторський склад
                </h2>
              </div>
              <div class="d_flex_row pad_top">
                <ul v-if="playOneDate.staff.length > 1">
                  <li
                    v-for="act in playOneDate.staff.slice(
                      1,
                      playOneDate.staff.length
                    )"
                    :key="act.name + act.surname"
                    class="open_sans t_left"
                  >
                    <span v-if="rolesAll(act.role)">
                      {{ act.name }}&#x20;{{ act.surname }}
                    </span>
                  </li>
                </ul>
                <p v-else>Інформація з`явиться незабаром</p>
              </div>
            </div>
          </div>
          <div class="d_flex_row"></div>
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

export default {
  name: "PlayDetailView",
  components: {
    HeaderComponent,
    FooterComponent,
    PhotoPlayComponent,
    SpinerComponent,
    AboutPlayShortComponentVue,
  },
  props: {
    id: String,
    date_id: String,
  },
  data() {
    return {
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
      allOffert: [
        "«Публічною офертою»",
        "«Договором»",
        "«Умовою повернення коштів»",
      ],
    };
  },
  created() {
    this.getDatePlay()
      .then(() => this.getLinkPay())
      .then(() => this.getOffert())
      .then(() => this.playList.push(this.playOneDate))
      .then(() => this.linkPayList.push(this.linkPay))
      // .then(() => this.getDatePlay())
      .then(() => this.setTitle())
      .then(() => {
        this.showSpiner = false;
      });
  },
  methods: {
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
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    async getLinkPay() {
      // Посилання на оплату
      this.linkPay = await fetch(
        `${this.$store.getters.getServerUrl}/buy_ticket/${this.id}/`
      )
        .then((response) => response.json())
        .catch(function (error) {
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
      let preparedData = ["про виставу", "команда", "кометарі", "деталі"];
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
  #spinner_is {
    margin-top: 10em;
  }
  #label_spiner {
    padding-top: 4em;
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
.offerts:hover {
  color: green;
}

.navigate_ul {
  list-style: none;
}
</style>
    