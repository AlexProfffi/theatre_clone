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
        class="d_flex_row j_content_space_around ptb_5em bg_grey_custom position_low_1000 horizontal_line"
      >
        <div class="w_30 position_img_low_1000" @click="showModal()">
          <img
            :src="repalcer(new_one.image, '')"
            :alt="new_one.name"
            class="img_on_list_new img_on_list__low_1000 c_pointer"
          />
        </div>
        <ModalShowPicture
          :picture="new_one.image"
          :show="modal"
          @close="modal = false"
        />
        <div class="d_flex_row j_content_start w_50  margin_both_2 w_low_1000 ">
          <div
            class="d_flex_column j_content_space_between t_left w_75 position_content_low_1000"
          >
            <div class="w_max">
              <h2 class="f_oswald">
                {{ new_one.name }}
              </h2>
            </div>
            <div
              class="f_source_sans padding_tb_2em w_max"
              v-html="new_one.description"
            ></div>
            <div class="d_flex_row j_content_end">
              <div class="f_source_sans">
                {{ formatDate(new_one.date_event) }}
              </div>
            </div>
          </div>
          
        </div>
        <hr class="margin_both_2 mar_top_bot" />
        
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
import ModalShowPicture from "@/components/helpers/ModalShowPicture.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "ContactsView",
  components: {
    HeaderComponent,
    FooterComponent,
    ModalShowPicture,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: true,
      modal: false,
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
    formatDate(dates) {
      // Змінює '-' на '|'
      return String(dates).replace(/[-]/g, "|");
    },
    showModal() {
      // Діалогове вікно з драматургами
      this.modal = true;
    },
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
  #news_all {
    padding: 0;
  }

  .bg_grey_custom {
    background: linear-gradient(#ffffff, #f3f3f3) !important;
  }
  .horizontal_line {
    border: none !important;
  }
  .w_low_1000 {
    width: 100%;
  }
  .position_low_1000 {
    flex-direction: column !important;
    width: 100% !important;
    padding: 2em 0 !important;
  }
  .position_img_low_1000 {
    width: 100% !important;
    
  }



  .img_on_list__low_1000 {
    width: 95% !important;
    height: 330px !important;
  }

  .position_content_low_1000 {
    justify-content: center !important;
    text-align: justify;
    font-size: 14px;
    padding-top: 15px;
  }
}

.img_on_list_new {
  width: 400px;
  height: 400px;
  object-fit: cover;
}
</style>
        