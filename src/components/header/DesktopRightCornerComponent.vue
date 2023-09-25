<template>
  <div v-if="!isMobile" class="d_flex_column ptb_40">
    <div class="d_flex_row j_content_end p_1_px">
      <div
        v-for="lang in languagesData"
        :key="lang.value"
        class="font_1 font_corner_right"
      >
        <span
          class="hover_black pad_1"
          :class="{ c_pointer: lang.txt !== '|', c_black: lang.value == 0 }"
          :id="lang.idEl"
          @click="selectLanguage(lang.idEl,)"
        >
          
            {{ lang.txt }}
         
        </span>
      </div>
    </div>
    <div class="d_flex_row j_content_end p_1_px">
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
</template>
<script>
export default {
  name: "DesktopRightCornerComponent",
  components: {},
  data() {
    return {
      isMobile: false,
      languagesData: this.languages(),
      authLinksData: this.authLinks(),
    };
  },
  created() {},
  methods: {
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
    selectLanguage(idElem,) {
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
      this.$router.push({path: lnk})
    }
  },
};
</script>
<style scoped>
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
</style>