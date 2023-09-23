<template>
  <div v-if="!isMobile" class="d_flex_row j_content_center">
    <ul
      class="none_decor_ul d_flex_row flex_wrap j_content_space_around f_family_sans w_100"
    >
      <li
        v-for="nav in navigationData"
        :key="nav.value"
        :id="nav.idEl"
        class=""
      >
        <a 
          :href="nav.linkTo" 
          @click="deleteDataFromFilter()" 
          class="upper_case none_text_decor nav_link_color" 
        >
          {{ nav.txt }}
        </a>
      </li>
    </ul>
  </div>
</template>
      <script>
export default {
  name: "DesktopNavigatorComponent",
  components: {},
  data() {
    return {
      isMobile: false,
      navigationData: this.naviPanel(),
    };
  },
  created() {},
  methods: {
    deleteDataFromFilter() {
      // Видаляє зі сховища дату для фільтрів
      // Скидує фільтри по місяцям
      localStorage.removeItem("dataYM")
    },

    naviPanel() {
      let listNavi = [
        // "головна",
        "афіша",
        // "новини",
        "про театр",
        // "архів",
        // "партнери",
        // "контакти",
      ];
      let listNaviLinks = [
        // "#/main",
        "/",
        // "/news",
        "#/about",
        // "#/archive",
        // "#/partners",
        // "#/contacts",
      ];
      let dataListNavi = [];
      for (let x = 0; x < listNavi.length; x++) {
        dataListNavi.push({
          value: x,
          txt: listNavi[x],
          idEl: "naviLink" + String(x),
          linkTo: listNaviLinks[x],
        });
      }
      return dataListNavi;
    },
  },
};
</script>
<style scoped>
.none_decor_ul {
  list-style: none;
  padding: 0 16.5em 0 16.5em;
}


</style>