<template>
  <div>
    <div>
      <HeaderComponent />
    </div>

    <div class="p_40px">
      <div>
        <form
          class="d_flex_row j_content_space_between w_40 pad_1em"
          @submit="setFilterToStatistic"
        >
          <div class="d_flex_column t_left">
            <label class="font_1" for="fromDate">Від:</label>
            <input
              id="fromDate"
              type="date"
              v-model="filterDate.filterDateFrom"
            />
          </div>
          <div class="d_flex_column t_left">
            <label class="font_1" for="toDate">До:</label>
            <input id="toDate" type="date" v-model="filterDate.filterDateTo" />
          </div>
          <div class="d_flex_column j_content_end">
            <input type="submit" value="Застосувати" />
          </div>
        </form>
      </div>
      <div
        class="d_flex_row j_content_space_between bg_grey_custom border_td_like visualiseble"
      >
        <div class="border_td_like_right w_30">
          <div
            class="d_flex_column j_content_center h_100 f_source_sans f_weight_bold"
          >
            Дата вистави
          </div>
        </div>
        <div class="w_30">
          <div class="d_flex_row j_content_center pad_03em">
            <div
              class="d_flex_row j_content_space_between f_source_sans f_weight_bold"
            >
              Назва вистави
            </div>
          </div>
        </div>
        <div
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold"
        >
          Продані квитки
        </div>
        <div
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold"
        >
          Сумма
        </div>
      </div>
      <div class="" v-for="st in statistic" :key="st.id">
        <div
          class="d_flex_row j_content_space_between bg_grey_custom border_td_like visualiseble"
        >
          <div class="border_td_like_right w_30">
            <div class="d_flex_column j_content_center h_100 f_source_sans">
              {{ visibleDate(st.date_pl) }}
            </div>
          </div>
          <div class="w_30">
            <div class="d_flex_row j_content_center pad_03em">
              <div class="d_flex_row j_content_space_between f_source_sans">
                {{ Object(st.to_play).name }}
              </div>
            </div>
          </div>
          <div
            class="border_td_like_left w_30 pad_03em f_source_sans"
            :class="{ f_weight_bold: st.dateobj.length }"
          >
            {{ Object(st.dateobj).length }}
          </div>
          <div
            class="border_td_like_left w_30 pad_03em f_source_sans"
            :class="{ f_weight_bold: st.dateobj.length }"
          >
            {{ st.dateobj.length * Object(st.to_play).amount }}
          </div>
        </div>
      </div>
      <div
        class="d_flex_row j_content_space_between bg_grey_custom border_td_like visualiseble"
      >
        <div class="border_td_like_right w_30">
          <div
            class="d_flex_column j_content_center h_100 f_source_sans f_weight_bold"
          >
            Всього:
          </div>
        </div>
        <div class="w_30">
          <div class="d_flex_row j_content_center pad_03em">
            <div class="d_flex_row j_content_space_between">-</div>
          </div>
        </div>
        <div
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold"
        >
          {{ sumTicket }}
        </div>
        <div
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold"
        >
          {{ sumAmount }}
        </div>
      </div>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>
    <script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { concat } from "../assets/main";

export default {
  name: "StatisticView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      filterDate: {
        filterDateFrom: "",
        filterDateTo: "",
      },
      statistic: [],
      sumTicket: 0,
      sumAmount: 0,
      email: localStorage.getItem("eml"),
    };
  },
  created() {
    this.getStatistic()
      .then(() => {
        this.sumSeparateDataTickets();
      })
      .then(() => {
        this.sumSeparateDataAmounts();
      });
    this.setTitle();
  },
  methods: {
    async getStatistic() {
      // Statistic get
      if (this.email) {
        this.statistic = await fetch(
          `${this.$store.getters.getServerUrl}/statistic/?q=${this.email}`
        )
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async getStatisticFiltered() {
      // Statistic get
      if (this.email) {
        this.statistic = await fetch(
          `${this.$store.getters.getServerUrl}/statistic/?q=${this.email}&afrom=${this.filterDate.filterDateFrom}&ato=${this.filterDate.filterDateTo}`
        )
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
      }
    },

    async setFilterToStatistic(e) {
      e.preventDefault();
      this.getStatisticFiltered()
        .then(() => {
          this.sumSeparateDataTickets();
        })
        .then(() => {
          this.sumSeparateDataAmounts();
        });
    },

    visibleDate(date) {
      // Перетворює дату з UTC на нормальну
      let splited = String(date).split("T");
      let only_date = splited[0];
      let only_time = String(splited[1]).split("+")[0];
      return concat(only_date, only_time);
    },

    async sumSeparateDataTickets() {
      // Сортує окремо кількість квитків
      this.sumTicket = 0;
      for (let x = 0; x < this.statistic.length; x++) {
        this.sumTicket += this.statistic[x].dateobj.length;
      }
    },

    async sumSeparateDataAmounts() {
      // Сортує окремо сумму коштів квитків
      this.sumAmount = 0;
      for (let x = 0; x < this.statistic.length; x++) {
        this.sumAmount +=
          this.statistic[x].dateobj.length * this.statistic[x].to_play.amount;
      }
    },
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Статистика";
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
}

.visualiseble:hover {
  background-color: #d7d7d7;
}
</style>