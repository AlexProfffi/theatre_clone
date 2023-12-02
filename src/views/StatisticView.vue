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
              required
            />
          </div>
          <div class="d_flex_column t_left">
            <label class="font_1" for="toDate">До:</label>
            <input
              id="toDate"
              type="date"
              v-model="filterDate.filterDateTo"
              required
            />
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
            class="d_flex_row j_content_space_around h_100 f_source_sans f_weight_bold"
          >
            <div class="d_flex_column j_content_center">Дата вистави</div>
            <div
              class="d_flex_column j_content_center c_pointer"
              @click="reverseDataStatistic()"
            >
              <svg
                v-if="!isReverse"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-up-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-caret-down-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                />
              </svg>
            </div>
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
            :class="{ f_weight_bold: Object(st.dateobj).length }"
          >
            {{ Object(st.dateobj).length }}
          </div>
          <div
            class="border_td_like_left w_30 pad_03em f_source_sans"
            :class="{ f_weight_bold: Object(st.dateobj).length }"
          >
            {{ Object(st.dateobj).length * Object(st.to_play).amount }}
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
      isReverse: false,
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
          `${this.$store.getters.getServerUrl}/statistic/?q=${this.email}&afrom=0&ato=0`
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

    reverseDataStatistic() {
      // Розвертає список статистики
      for (let x = 0; x < this.statistic.length; x++) {
        if (x > this.statistic.length - (1 + x)) {
          let temp = this.statistic[x];
          this.statistic[x] = this.statistic[this.statistic.length - (x + 1)];
          this.statistic[this.statistic.length - (x + 1)] = temp;
        }
      }
      this.isReverse = !this.isReverse;
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