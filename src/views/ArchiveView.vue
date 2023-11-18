<template>
  <div class="archives">
    <div>
      <HeaderComponent />
    </div>

    <div class="opacity_05 main_content">
      <div class="upper_case open_sans name_dep p_1_px pad_b1em f_low_1000">
        {{ partName }}
      </div>
      <div>
        <span class="font_1 f_weight_bold">
          Сторінка: {{ page }}
        </span>
      </div>
      <div id="events_wrapper" class="d_flex_column p_40px">
        <div
          v-for="eventPast in pastEvents"
          :key="eventPast.id_obj"
          class="d_flex_column j_content_space_around bg_grey_custom"
        >
          <div
            class="d_flex_row j_content_space_around ptb_1em f_source_sans row_reverse_low_1000"
          >
            <div class="font_1">
              <div class="t_left txt_pos_low_1000">
                {{ eventWas }}
              </div>
              <div
                v-if="eventPast.type == 'play'"
                class="t_left txt_pos_low_1000"
              >
                {{ setBrakeDate(eventPast.date_time) }}
              </div>
              <div v-else class="t_left txt_pos_low_1000">
                {{ eventPast.date }}
              </div>
            </div>
            <div
              class="d_flex_column j_content_space_around flex_low_500 direction_low_1000_row"
            >
              <img
                class="img_on_list img_on_list_low_1000 zoom_hover_img_arch cancel_zoom"
                :src="repalcer(eventPast.photo)"
                :alt="eventPast.name"
                :title="eventPast.name"
              />
            </div>
            <div
              v-if="eventPast.type == 'play'"
              class="d_flex_column j_content_space_around w_50 f_low_1000 flex_low_500_c w_low p_low_1000"
            >
              <router-link
                class="nav_link_color t_left txt_pos_low_1000 f_oswald f_size_41 f_size_header_low_1000"
                :to="{
                  name: 'play',
                  params: {
                    id: eventPast.id_obj,
                    date_id: eventPast.id_date,
                    name: transcriptWord(eventPast.name),
                  },
                }"
              >
                {{ eventPast.name }}
              </router-link>
              <div
                class="nav_link_color t_left txt_pos_low_1000 f_size_22 f_size_low_1000 t_justify_low_1000"
                v-html="eventPast.description"
              ></div>
            </div>
            <div
              v-else
              class="d_flex_column j_content_space_around w_50 f_low_1000 flex_low_500_c w_low p_low_1000"
            >
              <div
                class="nav_link_color t_left txt_pos_low_1000 f_oswald f_size_41 f_size_header_low_1000"
              >
                <router-link
                  class="nav_link_color"
                  :to="{
                    name: 'new',
                    params: {
                      id: eventPast.id_obj,
                      name: transcriptWord(eventPast.name),
                    },
                  }"
                >
                  {{ eventPast.name }}
                </router-link>
              </div>

              <div
                class="nav_link_color t_left txt_pos_low_1000 f_size_22 f_size_low_1000 t_justify_low_1000"
                v-html="sliceString(eventPast.description, maxCountSymbols)"
              ></div>
            </div>
          </div>
          <div class="horizontal_line"></div>
        </div>
        <div class="d_flex_row j_content_center padding_tb_2em">
          <div class="w_30 d_flex_row j_content_space_around">
            <button
              :disabled="page == 1"
              class="bg_white_custom b_none scale_hover c_pointer"
              @click="goToPrev()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="25"
                viewBox="0 0 10.605 15.555"
              >
                <polygon
                  points="10.605 12.727 5.656 7.776 10.605 2.828 7.777 0 0 7.776 7.777 15.555 10.605 12.727"
                />
              </svg>
            </button>
            <span class="font_1 f_weight_bold">
              {{ page }}
            </span>
            <button
              :disabled="!showNext"
              class="bg_white_custom b_none scale_hover c_pointer"
              @click="goToNext()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="25"
                viewBox="0 0 10.605 15.555"
              >
                <polygon
                  points="2.828 15.555 10.605 7.776 2.828 0 0 2.828 4.949 7.776 0 12.727 2.828 15.555"
                />
              </svg>
            </button>
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
import { transcription, scrollToTop } from "../assets/main";

export default {
  name: "ArchiveView",
  props: {},
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      eventWas: "Подія відбулась:",
      pastEvents: [],
      transcriptWord: transcription,
      partName: "Минулі події",
      page: 1,
      showNext: true,
      maxCountSymbols: 50,
      isShowLargeContent: false,
    };
  },
  created() {
    this.getPastEvents(this.page).then(() => this.showContent());
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Події";
    },

    sliceString(str, n_symbols) {
      // Обрізає строку
      return String(str).length > n_symbols
        ? String(str).slice(0, Number(n_symbols)) + "..."
        : str;
    },

    async showContent() {
      // Показує контент методом підвищення opacity
      let cnt = 0;
      if (document.querySelector(".main_content")) {
        this.intrval = setInterval(() => {
          document.querySelector(".main_content").style.opacity = String(cnt);
          if (cnt >= 1) {
            clearInterval(this.intrval);
            return;
          }
          cnt += 0.1;
        }, 50);
      }
    },
    async getPastEvents(page) {
      this.pastEvents = await fetch(
        `${this.$store.getters.getServerUrl}/archive/?page=${page}`
      )
        .then((response) => response.json())

        .catch((error) => console.log(error));
    },
    async increment(inc = true) {
      if (inc) {
        this.page += 1;
      } else {
        this.page -= 1;
      }
    },
    goToNext() {
      // Next page
      this.increment(true)
        .then(() => this.getPastEvents(this.page))
        .then(() => {
          if (this.pastEvents.length < 5) {
            this.showNext = false;
          }
        });
      scrollToTop(200);
    },
    goToPrev() {
      // Previous page
      this.increment(false)
        .then(() => this.getPastEvents(this.page))
        .then(() => {
          this.showNext = true;
        });
      scrollToTop(200);
    },
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443/" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443/image_theatre/" + str;
    },
    setBrakeDate(dt) {
      // Ділить дату на добу та години
      let newDate = String(dt).split("T");
      let objDate = [
        { when: newDate[0], value: 0 },
        {
          when: newDate[1].split("+")[0].split(":").slice(0, 2).join(":"),
          value: 1,
        },
      ];
      let correctDate = `${objDate[0].when} о ${objDate[1].when}`;
      return correctDate;
    },
  },
};
</script>
        <style scoped>
@media screen and (max-width: 550px) {
  .cancel_zoom {
    transition: none !important;
    object-fit: cover !important;
    width: 85vw !important;
    height: 300px !important;
    margin: auto;
  }
  .cancel_zoom:hover {
    transform: none !important;
  }
}

@media screen and (max-width: 875px) {
  #events_wrapper {
    padding: 1em 0 5em 0;
  }

  .row_reverse_low_1000 {
    flex-direction: column;
  }
}

.scale_hover:hover {
  transform: scale(1.2);
  box-shadow: none;
}

.zoom_hover_img_arch {
  transition: all 0.5s ease-out;
}
.zoom_hover_img_arch:hover {
  transform: scale(1.5);
  object-fit: scale-down;
  width: 400px;
  height: 450px;
  margin: auto;
}
</style>
            