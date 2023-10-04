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
        
          <div class="open_sans f_weight_bold upper_case" @click="dropMenu = !dropMenu">
            Меню
          </div>
          
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
  created() {
    this.eventScrollClick();
  },
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
        "контакти",
        "партнери",
        "профіль",
      ];
      let listNaviLinks = [
        // "#/main",
        "/",
        // "/news",
        "#/about",
        // "#/archive",
        // "#/partners",
        "#/contacts",
        "#/our_partners",
        "#/my_profile"
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

    eventScrollClick() {
      // Прибирає drop menu при прокрутці
      document.addEventListener("scroll", () => {
        if (this.dropMenu) {
          this.dropMenu = false;
        }
      })
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
  color: rgb(43, 43, 43);
  padding: 16px;
  font-size: 16px;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: none;
}

.dropdown-content {
  position: sticky;
  background-color: #ffffff;
  min-width: 100%;
  height: max-content;
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