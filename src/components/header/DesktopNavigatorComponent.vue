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
          @click="deleteDataFromFilter(nav.linkTo)"
          @mouseover="drawHorizontalLine(nav.value, '.navigation_sites')"
          @mouseout="clearHorizontalLine(nav.value, '.navigation_sites')"
          class="upper_case none_text_decor nav_link_color navigation_sites"
          style="display: block"
          :class="{
            'f_weight_bold_700 color_black ': whatTitleIsit(nav.txt),
          }"
        >
          {{ nav.txt }}
          <div class="horizontal_line_hover"></div>
        </a>
      </li>
    </ul>
    <div class="dropdown">
      <div class="dropbtn nav_link_color d_flex_row p_abs">
        <div class="open_sans f_weight_bold upper_case" @click="setDarkLight()">
          <svg
            v-if="!dropMenu"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
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
            @click="deleteDataFromFilter(nav.linkTo)"
            @mouseover="drawHorizontalLine(nav.value, '.navigation_sites')"
            @mouseout="clearHorizontalLine(nav.value, '.navigation_sites')"
            class="upper_case none_text_decor nav_link_color navigation_sites"
            style="display: block"
            :class="{
              'f_weight_bold_700 color_black ': whatTitleIsit(nav.txt),
            }"
          >
            {{ nav.txt }}
            <div class="horizontal_line_hover"></div>
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
      navigationData: null,
      dropMenu: false,
      intrval: null,
      offert: [],
    };
  },
  created() {
    this.naviPanel();
    this.eventScrollClick();
  },
  methods: {
    drawHorizontalLine(index, classEl) {
      // Підкреслення по наведенню на елемент
      let navEl = document.querySelectorAll(classEl);
      let widthElem = navEl[index].offsetWidth - 1;
      let cnt = 1;
      this.intrval = setInterval(() => {
        navEl[index].firstElementChild.style.width = String(cnt) + "px";
        if (cnt >= Number(widthElem)) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 3;
      }, 5);
    },
    clearHorizontalLine(index, classEl) {
      // Скасування по прибиранню курсора миші на елемент
      let navEl = document.querySelectorAll(classEl);
      clearInterval(this.intrval);
      navEl[index].firstElementChild.style.width = 0;
    },

    deleteDataFromFilter(lnk = "", newWindow = false) {
      // Видаляє зі сховища дату для фільтрів
      // Скидує фільтри по місяцям
      if (!newWindow) {
        localStorage.removeItem("dataYM");
      } else {
        localStorage.removeItem("dataYM");
        this.openLinkNewWindow(lnk);
      }
    },

    whatTitleIsit(nameNav) {
      // Перевіряряє назву сторінки і поле навігації
      let namePage = document.querySelector("title").innerHTML;
      return String(nameNav).toLocaleLowerCase() ===
        String(namePage).toLocaleLowerCase()
        ? true
        : false;
    },

    async naviPanel() {
      let listNavi = [
        "головна",
        "афіша",
        "новини",
        "про театр",
        // "архів",
        "контакти",
        "партнери",
        "профіль",
        // ["Автори", "Режисери", "Актори", "Команда"],
      ];
      let listNaviLinks = [
        "/",
        "/plays",
        "/news",
        "/about",
        // "#/archive",
        "/contacts",
        "/our_partners",
        "/my_profile",
        // ["/authors", "/directors", "/actors", "/team"],
      ];

      let dataListNavi = [];
      for (let x = 0; x < listNavi.length; x++) {
        if (typeof listNavi[x] == "string") {
          dataListNavi.push({
            value: x,
            txt: listNavi[x],
            idEl: "naviLink" + String(x),
            linkTo: listNaviLinks[x],
          });
        } else {
          dataListNavi.push({
            value: x,
            txt: {text: "команда", underText: listNavi[x]},
            idEl: "naviLink" + String(x),
            linkTo: listNaviLinks[x],
          });
        }
      }
      this.navigationData = dataListNavi;
    },

    eventScrollClick() {
      // Прибирає drop menu при прокрутці
      document.addEventListener("scroll", () => {
        if (this.dropMenu) {
          this.dropMenu = false;
          document.querySelector(".dropdown").style.height = "0";
        }
      });
    },
    setDarkLight() {
      // Затемняє фон після випадання меню
      this.dropMenu = !this.dropMenu;
      if (this.dropMenu) {
        document.querySelector(".dropdown").style.height = "100vh";
        document.querySelector(".dropdown").style.width = "100%";
      } else {
        document.querySelector(".dropdown").style.height = "0";
      }
    },
    openLinkNewWindow(lnk) {
      window.open(lnk, "_blank").focus();
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1700px) {
  #non_drop {
    padding: 0 12em;
  }
}
@media screen and (max-width: 1500px) {
  #non_drop {
    padding: 0 12em;
  }
}

@media screen and (max-width: 1350px) {
  #non_drop {
    padding: 0 9em;
  }
}
@media screen and (max-width: 1300px) {
  #non_drop {
    padding: 0 6em;
  }
}
@media screen and (max-width: 1100px) {
  #non_drop {
    padding: 0 3em;
  }
}
@media screen and (max-width: 1000px) {
  #non_drop {
    display: none;
  }
  #wrapper_nav {
    flex-direction: column;
  }
  #drop {
    padding: 85px 0;
    width: 90vw;
  }
  .dropdown {
    display: inline-block !important;
    position: absolute !important;
    top: 7.5%;
    left: 0%;
    background-color: #ffffffdb;
    z-index: 12;
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
  width: max-content;
}

.dropdown {
  position: relative;
  display: none;
}

.dropdown-content {
  position: sticky;
  background: linear-gradient(#ffffffdb, #ffffffdb);
  min-width: 100%;
  height: max-content;
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
</style>