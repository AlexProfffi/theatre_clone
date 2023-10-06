<template>
  <div class="news">
    <div>
      <HeaderComponent />
    </div>
    <div id="news_all" class="d_flex_column opacity_05 main_content p_40px">
      <div id="news_current" class="d_flex_column margin_both_auto">
        <div
          class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
        >
          <div>новини</div>
        </div>
      </div>
      <div
        v-for="new_one in news"
        :key="new_one.id"
        class="d_flex_row j_content_space_around ptb_5em bg_grey_custom horizontal_line"
      >
        <div class="w_30">
          <img
            :src="repalcer(new_one.image, '')"
            :alt="new_one.name"
            class="img_on_list_new img_on_list__low_1000"
          />
        </div>
        <div class="d_flex_row j_content_start w_50">
          <div class="t_left w_75">
            <div>
              <h2>
                {{ new_one.name }}
              </h2>
            </div>
            <div v-html="new_one.description"></div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>
    
    <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "ContactsView",
  components: {
    HeaderComponent,
    FooterComponent,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: true,
      news: [],
    };
  },
  created() {
    this.getNews().then(() => {
      this.showContent();
    });
    this.setTitle();
  },
  methods: {
    async showContent() {
      // Показує контент методом підвищення opacity
      let cnt = 0;

      this.intrval = setInterval(() => {
        document.querySelector(".main_content").style.opacity = String(cnt);
        if (cnt >= 1) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 0.1;
      }, 50);
    },

    async getNews() {
      this.news = await fetch(`${this.$store.getters.getServerUrl}/all_news/`)
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },

    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Новини";
    },

    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443" + str;
    },
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
}

.img_on_list_new {
  width: 400px;
  height: 400px;
  object-fit: cover;
}
</style>
        