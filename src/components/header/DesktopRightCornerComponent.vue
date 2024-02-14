<template>
  <div
    id="main_right_corner"
    :class="{ direction_low_1000_row: !token, direction_low_1000: token }"
    class="d_flex_column ptb_40"
  >
    <div class="d_flex_row j_content_end p_1_px" v-if="showLanguage">
      <div
        v-for="lang in languagesData"
        :key="lang.value"
        class="font_1 font_corner_right"
      >
        <span
          class="hover_black pad_1"
          :class="{ c_pointer: lang.txt !== '|', c_black: lang.value == 0 }"
          :id="lang.idEl"
          @click="selectLanguage(lang.idEl, lang.value)"
        >
          {{ lang.txt }}
        </span>
      </div>
    </div>
    <div
      id="search_id_group"
      class="d_flex_row j_content_end p_1_px mb_1rem pad_low_1000 h_30_px"
    >
      <div class="d_flex_row_reverse">
        <div class="c_pointer search" @click="showSearcField()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </div>
        <div v-if="$store.state.currentLanguage == 0" class="margin_both_auto d_flex_row search_group">
          <div class="horizontal_line">
            <input
              v-model="dataInputSearch"
              class="s_field open_sans xtx"
              type="search"
              placeholder="Пошук по сайту..."
            />
          </div>

          <div>
            <input
              @click="clickSearchBtn()"
              type="button"
              value="Пошук"
              class="btn_srch upper_case exit_b font_2 open_sans w_50_px h_100 pad_both_3"
            />
          </div>
        </div>
        <div v-else-if="$store.state.currentLanguage == 2" class="margin_both_auto d_flex_row search_group">
          <div class="horizontal_line">
            <input
              v-model="dataInputSearch"
              class="s_field open_sans xtx"
              type="search"
              placeholder="Search on the site..."
            />
          </div>

          <div>
            <input
              @click="clickSearchBtn()"
              type="button"
              value="Search"
              class="btn_srch upper_case exit_b font_2 open_sans w_50_px h_100 pad_both_3"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      id="wrap_links_login"
      class="d_flex_row j_content_end p_1_px"
      v-if="!token"
    >
      <div
        id="icon_login"
        class="hover_black c_pointer icon_usr"
        @click="goToEnter('/auth')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
          />
        </svg>
      </div>
      <div id="links_auth_usr" class="d_flex_row j_content_end">
        <div
          v-for="auth in authLinks()"
          :key="auth.value"
          class="font_1 font_corner_right"
        >
          <span
            class="hover_black pad_1"
            :class="{ c_pointer: auth.txt !== '|' }"
            @click="goToEnter(auth.link)"
          >
            {{ auth.txt }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="d_flex_column">
      <div class="d_flex_row j_content_end p_1_px">
        <div class="font_corner_right">
          <span> Вітаємо, </span>
          <span
            class="hover_black pad_1 c_pointer upper_case"
            @click="goToEnter('/my_profile')"
          >
            {{ user.username }}
          </span>
        </div>
      </div>
      <div class="d_flex_row j_content_end p_1_px">
        <button @click="removeToken()" class="upper_case exit_b little_pad">
          exit
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DesktopRightCornerComponent",
  components: {},
  data() {
    return {
      showLanguage: true,
      languagesData: this.languages(),
      authLinksData: this.authLinks(),
      token: localStorage.getItem("token"),
      user: {},
      searchField: false,
      intrval: null,
      widthSearchField: 200,
      dataInputSearch: null,
      currentLanguage: 0,
      languagesAll: [
        { lang: "УКР", dts: 0 },
        { lang: "EN", dts: 2 },
      ],
    };
  },
  created() {
    this.getDataUser();
    localStorage.setItem("currentLanguage", this.currentLanguage);
  },
  methods: {
    showContent() {
      // Показує поле пошуку
      let cnt = 0;
      document.querySelector(".s_field").style.display = "block";
      document.querySelector(".btn_srch").style.display = "block";
      this.intrval = setInterval(() => {
        document.querySelector(".s_field").style.width = String(cnt) + "px";
        if (cnt >= this.widthSearchField) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 10;
      }, 30);
    },
    hideContent() {
      // Ховає поле пошуку
      let cnt = Number(document.querySelector(".s_field").offsetWidth);

      this.intrval = setInterval(() => {
        document.querySelector(".s_field").style.width = String(cnt) + "px";
        if (cnt <= 0) {
          clearInterval(this.intrval);

          document.querySelector(".s_field").style.display = "none";
          document.querySelector(".btn_srch").style.display = "none";
          document.querySelector("#search_id_group").style.height = "30px";
          return;
        }
        cnt -= 10;
      }, 30);
    },

    languages() {
      // Мови на сайті
      let arrLangs = ["УКР", "|", "EN"];

      let langs = [];
      for (let x = 0; x < arrLangs.length; x++) {
        langs.push({ value: x, txt: arrLangs[x], idEl: "lang" + String(x) });
      }
      return langs;
    },
    authLinks() {
      // Кнопки увійти\зареєструватися
      let arrAuths;


      if (this.$store.state.currentLanguage == 0) {
        arrAuths = ["УВІЙТИ", "|", "ЗАРЕЄСТРУВАТИСЯ"];
      } else {
        arrAuths = ["ENTER", "|", "REGISTARTION"];
      }
      
      let linkS = ["/auth", "|", "/registration"];
      let auth = [];
      for (let x = 0; x < arrAuths.length; x++) {
        auth.push({ value: x, txt: arrAuths[x], link: linkS[x] });
      }
      return auth;
    },
    isInclude(element, list) {
      // Перевіряє входження елемента в масив
      for (let x = 0; x < list.length; x++) {
        if (list[x] == element) {
          return true;
        }
      }
      return false;
    },
    selectLanguage(idElem, cl) {
      // Відстеження кліка по мові
      let el = document.querySelector("#" + idElem);
      if (el.innerHTML !== "|") {
        let prevEl = document.querySelector(".c_black");
        prevEl.classList.remove("c_black");
        el.classList.add("c_black");
        for (let x = 0; x < this.languagesAll.length; x++) {
          if (el.innerHTML == this.languagesAll[x].lang) {
            this.currentLanguage = this.languagesAll[x].dts;
          }
        }
        this.$store.state.currentLanguage = cl;
      }
    },
    goToEnter(lnk) {
      // Перехід на сторінку авторизації чи реєстрації
      this.$router.push({ path: lnk });
    },

    getHeaders(method, token, body = null) {
      // Return headers with token for fetch
      if (body) {
        let headers = {
          method: method,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
          body: body,
        };
        return headers;
      } else {
        let headers = {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        };
        return headers;
      }
    },

    async getDataUser() {
      //  Get data for current user
      if (localStorage.getItem("token")) {
        this.user = await fetch(
          `${this.$store.getters.getServerUrl}/user_profile/`,
          this.getHeaders("get", this.token.replace(/"/gi, ""))
        )
          .then((response) => response.json())
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // this.$router.push({ name: "Auth" });
        return;
      }
    },

    removeToken() {
      // Вихід
      this.setUserActivity().then(() => {
        localStorage.removeItem("token");
        this.$router.push({ name: "Auth" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("lon");
        localStorage.removeItem("lat");
        localStorage.removeItem("eml");
      });
    },
    async setUserActivity() {
      // Створює запис при вході користувача
      await fetch(`${this.$store.getters.getServerUrl}/user_activity_record/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("eml"),
          longitude: Number(localStorage.getItem("lon")),
          latitude: Number(localStorage.getItem("lat")),
        }),
      });
    },
    showSearcField() {
      this.searchField = !this.searchField;
      if (this.searchField) {
        document.querySelector("#search_id_group").style.height = "80px";
        this.showContent();
      } else {
        this.hideContent();
      }
    },
    clickSearchBtn() {
      // Подія кліку по кнопці пошуку
      localStorage.setItem("searchersDt", JSON.stringify(this.dataInputSearch));
      if (this.$route.name == "Search") {
        window.location.reload();
      } else {
        this.$router.push({ name: "Search" });
      }
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1000px) {
  #icon_login,
  #wrap_links_login {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 0 0 5px;
  }
  #main_right_corner {
    justify-content: flex-end;
  }
  #main_right_corner_auth {
    flex-direction: column;
    justify-content: flex-end;
  }

  #links_auth_usr {
    display: none;
  }
  .pad_low_1000 {
    padding: 0 !important;
  }
}
.font_corner_right {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  color: gray;
}
.c_black {
  color: #212121;
}
.hover_black:hover {
  color: #212121;
  transition: 0.5s;
}
.pad_1 {
  padding: 0.1em;
}

.exit_b {
  background-color: #212121;
  color: #ffffff;
  border: 2px solid #212121;
}
.search:hover {
  color: black;
}
input.xtx {
  display: none;
  font-size: 14px;
  width: 0;
  padding: 5px;
  outline: solid white;
}
.btn_srch {
  display: none;
}

.icon_usr {
  display: none;
}

.search_group {
  margin-top: 55px;
  height: max-content;
}
/* #main_right_corner {
  background: url("D:\театрДраматургівФото\snow.gif");
} */
</style>