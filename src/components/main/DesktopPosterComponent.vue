<template>
  <div v-if="!isMobile" class="posters d_flex_column j_content_center ptb_40">
    <div
      v-for="play in playList"
      :key="play.id"
      class="d_flex_row p_bottom bg_grey_custom horizontal_line"
    >
      <div class="w_20_percent">
        <div>
          <h4 class="f_oswald f_weight_300 m_0 p_l_2" :id="getMeDay(play.date_play).idEl">
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
      <div class="d_flex_row w_20_percent">
        <img
          :src="repalcer(play.photo, '')"
          :alt="play.photo"
          class="img_on_list"
        />
      </div>
      <div class="w_20_percent">
        <p>
            {{ play.name }}
        </p>
        <p>
            {{ play.staff }}
        </p>
        <p>
            {{ play.dramaturg }}
        </p>
      </div>
      <div class="upper_case w_20_percent">купити квиток</div>
      <div class="horizontal_line"></div>
    </div>
  </div>
</template>
  <script>
export default {
  name: "DesktopPosterComponent",
  components: {},
  data() {
    return {
      isMobile: false,
      playList: null,
    };
  },
  created() {
    this.getPlays();
  },
  methods: {
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
        return "http://mysite.com:8000" + str.replace(changeble, "");
      }
      return "http://mysite.com:8000" + str;
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
  },
};
</script>
<style scoped>
@media screen and (max-width: 1550px) {
  #short_day_4, #short_day_1 {
    padding-left: 0.6em;
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

.horizontal_line {
  border-bottom: 2px solid gray;
}

.w_20_percent {
  width: 25%;
}

.f_oswald {
  font-family: "Oswald", sans-serif;
}

.f_size_25 {
  font-size: 2.5em;
  color: black;
}
.f_weight_300 {
  font-weight: 300;
  font-size: 1.5em;
}
.p_both_px {
  padding: 0.1em 4em 0.1em 3em;
}
</style>