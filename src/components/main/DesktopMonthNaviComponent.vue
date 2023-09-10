<template>
  <div v-if="!isMobile" class="monthes d_flex_row j_content_center">
    <ul
      class="none_decor_ul d_flex_row flex_wrap j_content_center f_family_sans w_100"
    >
      <li
        v-for="navMonth in threeMontes"
        :key="navMonth.value"
        :id="navMonth.idEl"
        class="pad_both_7"
      >
        <a href="#" class="upper_case none_text_decor nav_link_color">
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
      threeMontes: [],
    };
  },
  created() {
    this.monthes();
  },
  methods: {
    monthData() {
      // Створює дані число: місяць
      let monthList = [
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
      ];
      let dataMonth = [];
      for (let x = 0; x < monthList.length; x++) {
        dataMonth.push({ value: x + 1, text: monthList[x] });
      }
      return dataMonth;
    },
    monthes() {
      // Повертає поточний місяць і + 2 наступних
      let date = new Date();
      let numMonth = date.getUTCMonth() + 1;
      let monthList = this.monthData();
      for (let x = 0; x < monthList.length; x++) {
        if (monthList[x].value === numMonth) {
          for (let y = 0; y < 3; y++) {
            let new_x = x;
            let new_y = y;
            if (new_x + new_y + 1 > 12) {
              new_x = x + y - 12;
              new_y = 0;
            }
            this.threeMontes.push({
              value: new_x + new_y + 1,
              text: monthList[new_x + new_y].text,
              idEl: "month" + String(new_x + new_y + 1),
            });
          }
          return;
        }
      }
    },
  },
};
</script>
<style scoped>



</style>