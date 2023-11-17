<template>
  <div class="new_one">
    <div>
      <HeaderComponent />
    </div>
    <div
      id="news_detail"
      class="d_flex_row j_content_space_around opacity_05 main_content p_40px"
    >
      <div class="d_flex_row j_content_center">
        <div class="h_600">
          <img class="h_100" :src="news.image" :alt="news.name" />
        </div>
      </div>
      <div class="d_flex_column">
        <div class="d_flex_row j_content_center">
          <div class="w_70 w_low_600">
            <div class="d_flex_row j_content_start f_source_sans f_size_40 f_weight_bold">
              {{ news.name }}
            </div>
          </div>
        </div>
        <div class="d_flex_row j_content_center ptb_1em">
          <div class="w_70 w_low_600">
            <div class="d_flex_row j_content_start t_left f_source_sans" v-html="news.description"></div>
          </div>
        </div>
        <div class="d_flex_row j_content_center ptb_1em">
          <div class="font_1 w_70 d_flex_row j_content_start w_low_600">
            {{ news.date_event }}
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
  name: "NewOneView",
  props: {
    id: String,
  },
  components: {
    HeaderComponent,
    FooterComponent,
    // SpinerComponent,
  },
  data() {
    return {
      news: {},
    };
  },
  created() {
    this.getNews()
      .then(() => {
        this.setTitle();
      })
      .then(() => this.showContent());
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
      this.news = await fetch(
        `${this.$store.getters.getServerUrl}/all_news/${this.id}/`
      )
        .then((response) => response.json())

        .catch((error) => {
          console.log(error);
        });
    },

    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Новина";
    },
  },
};
</script>
      <style scoped>
@media screen and (max-width: 600px) {
  #news_detail {
    flex-direction: column;
    padding: 5px;
  }
  .w_low_600 {
    width: 85vw !important;
  }
}
</style>
          