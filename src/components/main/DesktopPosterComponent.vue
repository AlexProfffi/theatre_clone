<template>
  <div v-if="!isMobile" class="posters d_flex_column j_content_center ptb_40">
    <div v-if="showSpiner">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
     
    <div
      v-for="play in playList"
      :key="play.id"
      
      class="d_flex_row p_bottom bg_grey_custom horizontal_line plays_for_sale"
    >
      <div class="w_20_percent plays_sl_component">
        <div>
          <h4
            class="f_oswald f_weight_300 m_0 p_l_2 short_day short_day_low_1000"
            :id="getMeDay(play.date_play).idEl"
          >
            {{ getMeDay(play.date_play).shortText }}
          </h4>
        </div>

        <div class="p_both_px">
          <div class="d_flex_row_reverse">
            <h2
              v-for="dt in datePlayVisibility(play.date_play)"
              :key="dt.value"
              :id="dt.idEl"
              class="f_oswald f_size_25 m_0"
            >
              {{ dt.text }}
            </h2>
          </div>
        </div>
      </div>
      <div class="d_flex_row w_20_percent plays_sl_component">
        <img
          :src="repalcer(play.photo, '')"
          :alt="play.photo"
          class="img_on_list img_on_list__low_1000"
        />
      </div>
      <div class="d_flex_column j_content_center w_20_percent plays_sl_component">
        <div class="d_flex_row">
          <h3 class="f_oswald f_weight_400 current_play">
            {{ play.name }}
          </h3>
        </div>
        <div
          class="d_flex_row f_source_sans f_size_0_9"
          v-if="play.dramaturg[0]"
        >
          <span>Драматург(и)</span>
          <div v-if="play.dramaturg.length < 2">
            <div v-for="pd in play.dramaturg" :key="pd.id">
              <span class="f_weight_bold p_l_0_5">
                {{ pd.first_name }}
              </span>
              <span class="f_weight_bold p_l_0_3">
                {{ pd.last_name }} 
              </span>
            </div>
          </div>
          <div v-else>
            <span class="c_pointer f_weight_bold p_l_0_5" @click="showModal()">
              Показати всіх 
            </span>
            <ModalInfo 
             :dramaturgs="play.dramaturg" 
             :show="modal"
             @close="modal = false" 
            />
          </div>
        </div>
        <div class="d_flex_row f_source_sans f_size_0_9" v-if="play.staff[0]">
          <span>Режисер</span>
          <span class="f_weight_bold p_l_0_5">{{ play.staff[0].name }}</span>
          <span class="f_weight_bold p_l_0_3">{{ play.staff[0].surname }}</span>
        </div>
        <div class="d_flex_row f_oswald pad_top play_sl_duration">
          <h4
            v-for="duration in setDurationPlay(
              play.date_play,
              play.duration_minutes
            )"
            :key="duration.value"
            class="f_weight_300"
          >
            {{ duration.text }}
          </h4>
        </div>
      </div>
      <div class="upper_case w_20_percent d_flex_column j_content_center plays_sl_component">
        <div class="open_sans f_size_32 c_pointer">
          <router-link
            :to="{
              name: 'play',
              params: { id: play.id, name: transcription(play.name) },
            }"
            class="nav_link_color"
          >
            купити квиток
          </router-link>
        </div>
        <div></div>
      </div>
      <div class="horizontal_line"></div>
    </div>
  </div>
</template>
  <script>
import ModalInfo from '../helpers/ModalInfo.vue';


export default {
  name: "DesktopPosterComponent",
  components: {
    ModalInfo,
  },
  data() {
    return {
      isMobile: false,
      playList: null,
      showSpiner: true,
      modal: false,
      yearMonth: JSON.parse(localStorage.getItem("dataYM")),
    };
  },
  created() {
    this.run();
    this.correctRange(14, 81);
    this.lickPay();
  },
  methods: {
    run() {
      if (!this.yearMonth) {
        this.getPlays().then(() => {
        this.showSpiner = false;
        });
      } else {
        this.getFilteredPlays(this.yearMonth).then(() => {
        this.showSpiner = false;
        });
      }
    },

    async getFilteredPlays(dataYearMonth) {
      // Фільтр по місяцям
      this.playList = await fetch(
        `${this.$store.getters.getServerUrl}/plays_all/dates/${dataYearMonth.year}-${dataYearMonth.chooseMonth}/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },


    showModal() {
      // Діалогове вікно з драматургами
      this.modal = true;
    },
    lickPay() {},
    async getPlays() {
      this.playList = await fetch(
        `${this.$store.getters.getServerUrl}/plays_all/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return "https://theatreofplaywrightsapi.space:8443" + str.replace(changeble, "");
      }
      return "https://theatreofplaywrightsapi.space:8443" + str;
    },
    datePlayVisibility(dt) {
      let newFormat = dt.split("T");
      let monthAndDay = newFormat[0].split("-");
      monthAndDay = [
        monthAndDay[monthAndDay.length - 1],
        "|",
        monthAndDay[monthAndDay.length - 2],
      ];
      let correctFormatDate = [];
      for (let x = monthAndDay.length - 1; x >= 0; x--) {
        correctFormatDate.push({
          value: x,
          text: monthAndDay[x],
          idEl: "date" + String(x),
        });
      }
      return correctFormatDate;
    },
    getMeDay(dat) {
      // Повертає день тижня
      let dt = String(dat).split("T");

      dt = dt[0].split("-");
      let day = dt[2];
      let month = dt[1];
      let date = new Date();
      date.setMonth(Number(month) - 1);
      date.setDate(Number(day));
      const daysOfWeek = [
        "неділя",
        "понеділок",
        "вівторок",
        "середа",
        "четвер",
        "п'ятниця",
        "субота",
      ];
      const daysOfWeekShort = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
      let daysAllData = [];
      for (let x = 0; x < daysOfWeek.length; x++) {
        daysAllData.push({
          value: x,
          text: daysOfWeek[x],
          shortText: daysOfWeekShort[x],
          idEl: "short_day_" + String(x),
        });
      }
      return daysAllData[date.getDay()];
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
  },
};
</script>
<style scoped>
@media screen and (max-width: 1000px) {
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