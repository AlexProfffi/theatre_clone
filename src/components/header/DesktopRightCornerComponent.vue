<template>
  <div id="main_right_corner" v-if="!isMobile" class="d_flex_column ptb_40">
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
          @click="selectLanguage(lang.idEl)"
        >
          {{ lang.txt }}
        </span>
      </div>
    </div>
    <div class="d_flex_row j_content_end p_1_px h_24_px mb_1rem pad_low_1000">
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
        <div class="margin_both_auto d_flex_row search_group">
          <input
            v-model="dataInputSearch"
            class="s_field open_sans xtx "
            type="search"
            placeholder="Пошук по сайту..."
          />
          <!-- <button @click="clickSearchBtn()" class="btn_srch upper_case exit_b font_2 open_sans w_50_px">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
          </button> -->
          <input
            @click="clickSearchBtn()"
            type="button"
            value="Пошук"
            class="btn_srch upper_case exit_b font_2 open_sans w_50_px pad_both_3"
          />
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
        @click="goToEnter('/registration')"
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
          v-for="auth in authLinksData"
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
      showLanguage: false,
      isMobile: false,
      languagesData: this.languages(),
      authLinksData: this.authLinks(),
      token: localStorage.getItem("token"),
      user: {},
      searchField: false,
      intrval: null,
      widthSearchField: 200,
      dataInputSearch: null,
    };
  },
  created() {
    this.getDataUser();
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
      let arrAuths = ["УВІЙТИ", "|", "ЗАРЕЄСТРУВАТИСЯ"];
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
    selectLanguage(idElem) {
      // Відстеження кліка по мові
      let el = document.querySelector("#" + idElem);
      if (el.innerHTML !== "|") {
        let prevEl = document.querySelector(".c_black");
        prevEl.classList.remove("c_black");
        el.classList.add("c_black");
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
      localStorage.removeItem("token");
      this.$router.push({ name: "Auth" });
    },
    showSearcField() {
      this.searchField = !this.searchField;
      if (this.searchField) {
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
    flex-direction: row;
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
}
.btn_srch {
  display: none;
}

.icon_usr {
  display: none;
}

.search_group {
  margin-top: 50px
}
</style>