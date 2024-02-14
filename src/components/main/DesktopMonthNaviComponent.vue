<template>
  <div v-if="!isMobile" class="monthes d_flex_row j_content_center">
    <ul
      id="month_filter"
      class="none_decor_ul d_flex_row flex_wrap j_content_center f_family_sans w_100"
    >
      <li
        v-for="navMonth in monthes(2)"
        :key="navMonth.value"
        :id="navMonth.idEl"
        class="pad_both_7"
      >
        <a
          href="/plays"
          @click="filterToMonth(navMonth)"
          class="upper_case none_text_decor nav_link_color c_pointer"
        >
          {{ navMonth.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "DesktopMonthNaviComponent",
  components: {},
  data() {
    return {
      isMobile: false,
      yearMonth: null,
      needCountMonthes: 2,
      monthUa: [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень",
      ],
      monthEn: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  created() {},
  methods: {
    filterToMonth(month) {
      // Фільтрація по місяцям
      let year = new Date();
      let dataFilter = { year: year.getFullYear(), chooseMonth: month.value };
      localStorage.setItem("dataYM", JSON.stringify(dataFilter));
      // this.$router.push({name: "plays"})
      // window.location.reload()
    },
    monthData() {
      // Створює дані число: місяць
      let monthList;
      if (this.$store.state.currentLanguage == 0) {
        monthList = this.monthUa;
      } else {
        monthList = this.monthEn;
      }
      let dataMonth = [];
      for (let x = 0; x < monthList.length; x++) {
        dataMonth.push({ value: x + 1, text: monthList[x] });
      }
      return dataMonth;
    },
    monthes(countMonth) {
      // Повертає  countMonth наступних місяців
      let threeMontes = [];
      let date = new Date();
      let numMonth = date.getUTCMonth() + 1;
      let monthList = this.monthData();
      for (let x = 0; x < monthList.length; x++) {
        if (monthList[x].value === numMonth) {
          for (let y = 0; y < countMonth; y++) {
            let new_x = x;
            let new_y = y;
            if (new_x + new_y + 1 > 12) {
              new_x = x + y - 12;
              new_y = 0;
            }
            threeMontes.push({
              value: new_x + new_y + 1,
              text: monthList[new_x + new_y].text,
              idEl: "month" + String(new_x + new_y + 1),
            });
          }
          return threeMontes;
        }
      }
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1000px) {
  #month_filter {
    padding: 0;
  }
}
</style>