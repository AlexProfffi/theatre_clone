<template>
  <div>
    <div>
      <HeaderComponent />
    </div>

    <div id="wrapTbl" class="p_40px">
      <div class="d_flex_row j_content_space_between">
        <form
          id="formDate"
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
            <div class="d_flex_column j_content_center f_size_low_1000">
              Дата вистави
            </div>
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
                class="bi bi-caret-up-fill f_size_low_1000"
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
                class="bi bi-caret-down-fill f_size_low_1000"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w_30 f_basis_low_1000">
          <div class="d_flex_row j_content_center pad_03em">
            <div
              class="d_flex_row j_content_space_between f_source_sans f_weight_bold f_size_low_1000"
            >
              Назва вистави
            </div>
          </div>
        </div>
        <div
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold f_size_low_1000"
        >
          Продані квитки
        </div>
        <div
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold f_size_low_1000"
        >
          Сумма
        </div>
      </div>
      <div class="" v-for="st in statistic" :key="st.id">
        <div
          class="d_flex_row j_content_space_between bg_grey_custom border_td_like visualiseble"
        >
          <div class="border_td_like_right w_30">
            <div
              class="d_flex_column j_content_center h_100 f_source_sans f_size_low_1000"
            >
              {{ visibleDate(st.date_pl) }}
            </div>
          </div>
          <div class="w_30 f_basis_low_1000">
            <div class="d_flex_row j_content_center pad_03em">
              <div
                class="d_flex_row j_content_space_between f_source_sans f_size_low_1000"
              >
                {{ Object(st.to_play).name }}
              </div>
            </div>
          </div>
          <div
            class="d_flex_column j_content_center border_td_like_left w_30 pad_03em f_source_sans"
            :class="{ f_weight_bold: Object(st.dateobj).length }"
          >
            <div class="d_flex_row">
              <div class="d_flex_row j_content_end w_50">
                {{ Object(st.dateobj).length }}
              </div>
              <div
                class="d_flex_row j_content_start w_50"
                v-if="Object(st.dateobj).length"
              >
                <svg
                  :id="'svgShow' + st.id"
                  @click="showTicket(st.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down-fill c_pointer"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  />
                </svg>
                <svg
                  :id="'svgHide' + st.id"
                  @click="hideTicket(st.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-up-fill c_pointer d_none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                  />
                </svg>
              </div>
            </div>
            <div
              class="d_none f_weight_light_300 font_1"
              :id="'statistic' + st.id"
            >
              <div
                class="bg_grey_custom d_flex_column j_content_center"
                v-for="oneTckt in Object(st.dateobj)"
                :key="oneTckt.id"
              >
                {{ oneTckt.name_usr }}:
                {{ visibleDate(oneTckt.date_create, true) }}
                <hr />
              </div>
            </div>
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
            class="d_flex_column j_content_center h_100 f_source_sans f_weight_bold f_size_low_1000"
          >
            Всього:
          </div>
        </div>
        <div class="w_30 f_basis_low_1000">
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
          class="border_td_like_left w_30 pad_03em f_source_sans f_weight_bold f_size_low_1000"
        >
          {{ sumAmount }}
        </div>
      </div>
      <div class="w_30">
        <form @submit="toXlsx" id="formXls" action="" class="d_flex_column">
          <label class="t_left font_1" for="xlxs">
            Сформувати файл *.xlsx
          </label>
          <input type="submit" name="xlxs" id="xlxs" value="Сформувати" />
        </form>
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
      show: false,
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
    async toXlsx(e) {
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrl}/export_xlsx/`;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.filterDate),
      });
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

    visibleDate(date, mls = false) {
      // Перетворює дату з UTC на нормальну
      let splited = String(date).split("T");
      let only_date = splited[0];
      let only_time = String(splited[1]).split("+")[0];
      if (mls) {
        return concat(only_date, only_time.split(".")[0]);
      }
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
    showTicket(elId) {
      //
      // this.show = true;
      let element = document.querySelector("#statistic" + elId);
      let elementSvg = document.querySelector("#svgShow" + elId);
      let elementSvg2 = document.querySelector("#svgHide" + elId);

      elementSvg2.style.display = "block";
      elementSvg.style.display = "none";
      element.style.display = "block";
    },
    hideTicket(elId) {
      //
      // this.show = false;
      let element = document.querySelector("#statistic" + elId);
      let elementSvg = document.querySelector("#svgShow" + elId);
      let elementSvg2 = document.querySelector("#svgHide" + elId);

      elementSvg2.style.display = "none";
      elementSvg.style.display = "block";
      element.style.display = "none";
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
  #wrapTbl {
    padding: 2px 2px 55px 2px;
  }
  #formDate {
    flex-direction: column;
    width: 50%;
  }
  .f_basis_low_1000 {
    flex-basis: 9.5em;
  }
}

.visualiseble:hover {
  background-color: #d7d7d7;
}
</style>