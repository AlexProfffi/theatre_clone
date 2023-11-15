<template>
  <div class="archives">
    <div>
      <HeaderComponent />
    </div>

    <div class="opacity_05 main_content">
      <div class="upper_case open_sans name_dep p_1_px pad_b1em f_low_1000">
        {{ partName }}
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
            <div class="flex_low_500">
              <img
                class="img_on_list img_on_list_low_1000"
                :src="repalcer(eventPast.photo)"
                :alt="eventPast.name"
                :title="eventPast.name"
              />
            </div>
            <div
              v-if="eventPast.type == 'play'"
              class="d_flex_column j_content_space_around f_size_41 w_50 f_oswald f_low_1000 flex_low_500 w_low"
            >
              <router-link
                class="nav_link_color t_left txt_pos_low_1000"
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
            </div>
            <div
              v-else
              class="d_flex_column j_content_space_around f_size_41 w_50 f_oswald f_low_1000 flex_low_500 w_low"
            >
              <div class="nav_link_color t_left txt_pos_low_1000">
                {{ eventPast.name }}
              </div>
            </div>
          </div>
          <div class="horizontal_line"></div>
        </div>
        <div class="d_flex_row j_content_center padding_tb_2em">
          <div class="w_30 d_flex_row j_content_space_around">
            <button
              :disabled="page == 1"
              class="bg_white_custom b_none scale_hover"
              @click="goToPrev()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                class="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            </button>
            <span>
              {{ page }}
            </span>
            <button
              :disabled="!showNext"
              class="bg_white_custom b_none scale_hover"
              @click="goToNext()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-arrow-right-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
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
import { transcription } from "../assets/main";

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
    },
    goToPrev() {
      // Previous page
      this.increment(false)
        .then(() => this.getPastEvents(this.page))
        .then(() => {
          this.showNext = true;
        });
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
</style>
            