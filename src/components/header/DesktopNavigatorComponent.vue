<template>
  <div id="wrapper_nav" v-if="!isMobile" class="d_flex_row j_content_center">
    <ul
      class="none_decor_ul d_flex_row flex_wrap j_content_space_around f_family_sans w_100"
      id="non_drop"
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
    <div class="dropdown">
      <div class="dropbtn nav_link_color">
        <svg
          @click="dropMenu = !dropMenu"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="black"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
      <ul
        v-if="dropMenu"
        class="none_decor_ul f_family_sans d_flex_column flex_wrap j_content_center dropdown-content"
        id="drop"
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
      dropMenu: false,
    };
  },
  created() {},
  methods: {
    deleteDataFromFilter() {
      // Видаляє зі сховища дату для фільтрів
      // Скидує фільтри по місяцям
      localStorage.removeItem("dataYM");
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
@media screen and (max-width: 1000px) {
  #non_drop {
    display: none;
  }
  #wrapper_nav {
    flex-direction: column;
  }
  #drop {
    padding: 0;
  }
  .dropdown {
    display: inline-block !important;
  }
}

.none_decor_ul {
  list-style: none;
  padding: 0 16.5em 0 16.5em;
}

.dropbtn {
  color: white;
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: none;
}

.dropdown-content {
  position: fixed;
  background-color: #ffffff;
  min-width: 100%;
  height: 20vh;
  /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
  z-index: 11;
  left: 0;
}


.dropdown-content li {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
}

.dropdown-content a:hover {
  background-color: #ffffff;
}

/* Show the dropdown menu on hover */
/* .dropdown:hover .dropdown-content {
  display: block;
} */
</style>