<template>
  <div v-if="!isMobile" class="posters d_flex_column j_content_center ptb_40">
    <div v-if="showSpiner">
      <SpinerComponent />
    </div>
    <div class="d_flex_column j_content_center opacity_05 main_content">
      <div v-for="play in playList" :key="play.id" class="bg_grey_custom for_mobile_center">
        <AboutPlayShortComponentVue :play="play" :withPhoto="true" />
      </div>
    </div>
  </div>
</template>
  <script>
// import ModalInfo from "../helpers/ModalInfo.vue";
import SpinerComponent from "@/components/helpers/SpinerComponent.vue";
import AboutPlayShortComponentVue from "./AboutPlay/AboutPlayShortComponent.vue";

export default {
  name: "DesktopPosterComponent",
  components: {
    // ModalInfo,
    SpinerComponent,
    AboutPlayShortComponentVue,
  },
  data() {
    return {
      isMobile: false,
      playList: null,
      showSpiner: true,
      yearMonth: JSON.parse(localStorage.getItem("dataYM")),
      intrval: null,
    };
  },
  created() {
    this.run();
  },
  methods: {
    run() {
      if (!this.yearMonth) {
        this.getPlays()
          .then(() => {
            this.showSpiner = false;
          })
          .then(() => {
            this.showContent();
          });
      } else {
        this.getFilteredPlays(this.yearMonth).then(() => {
          this.showSpiner = false;
        });
      }
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

    async getFilteredPlays(dataYearMonth) {
      // Фільтр по місяцям
      this.playList = await fetch(
        `${this.$store.getters.getServerUrl}/date_plays/${dataYearMonth.year}-${dataYearMonth.chooseMonth}/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },

    async getPlays() {
      this.playList = await fetch(
        `${this.$store.getters.getServerUrl}/date_plays/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1000px) {

  .for_mobile_center{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .plays_for_sale {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 !important;
  }
  .plays_sl_component {
    margin: auto;
    width: max-content !important;
  }
  .play_sl_duration {
    justify-content: center;
  }
  .short_day_low_1000 {
    padding: 0 !important;
  }
  .img_on_list__low_1000 {
    width: 350px !important;
    height: 225px;
  }
  .name_play_sale {
    justify-content: center;
  }
}
@media screen and (max-width: 1550px) {
  .short_day {
    padding-left: 0.6em;
  }
  .current_play {
    font-size: 1.2em !important;
  }
}
.img_on_list {
  width: 226px;
  height: 223px;
  object-fit: cover;
}

.p_bottom {
  padding: 40px;
}

.w_20_percent {
  width: 25%;
}

.f_size_0_9 {
  font-size: 0.9em;
}

.f_size_25 {
  font-size: 2.5em;
  color: black;
}
.f_weight_300 {
  font-weight: 300;
  font-size: 1.5em;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  padding-top: 0;
}
</style>