<template>
  <div>
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column p_40px padding_faces">
      <div class="margin_both_auto">
        <div id="faces_7" class="d_grid">
          <div v-for="playw in firstTwoRowsPlw" :key="playw.id" class="pad_1em padding_faces">
            <div class="c_pointer">
              <img
                :src="playw.image"
                :alt="playw.name"
                :title="
                  concat(
                    playw.to_playwriter.first_name,
                    playw.to_playwriter.last_name
                  )
                "
                class="size_pictures size_pictures_low_1000"
                :class="{
                  size_pictures: playw.id % 2 == 0,
                  size_pictures_2: playw.id % 2 != 0,
                }"
              />
            </div>
          </div>
        </div>
        <div id="faces_6" class="d_grid_6">
          <div v-for="playw in downRowPlw" :key="playw.id" class="pad_1em padding_faces">
            <div class="c_pointer">
              <img
                :src="playw.image"
                :alt="playw.name"
                :title="
                  concat(
                    playw.to_playwriter.first_name,
                    playw.to_playwriter.last_name
                  )
                "
                class="size_pictures size_pictures_low_1000"
                :class="{
                  size_pictures: playw.id % 2 == 0,
                  size_pictures_2: playw.id % 2 != 0,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div id="idea_main" class="d_flex_column margin_both_auto">
          <div
            class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
          >
            <div>ідея</div>
          </div>
        </div>
        <div id="idea_main_list" class="d_grid_3 ptb_5em margin_both_auto">
          <div v-for="idea in ideas" :key="idea.id" class="pad_b1em">
            <div v-html="idea.description" class="t_justify p_lr_1 padding_low_1000"></div>
            <hr class="line" />
          </div>
        </div>
      </div>

      <div class="mar_0_06_em">
        <div id="plays_main_name" class="d_flex_column margin_both_auto">
          <div
            class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
          >
            <div>вистави</div>
          </div>
        </div>
        <div id="plays_main_list" class="d_grid_3 ptb_5em">
          <div v-for="play in mainPlays" :key="play.id">
            <div
              class="w_22em h_35em margin_both_auto c_pointer overflow_hidden"
            >
              <img
                :src="repalcer(play.photo)"
                :alt="play.name"
                class="img_on_main h_100 w_100 zoom_hover"
              />
            </div>
            <div class="p_abs_text w_max_content color_white">
              <div class="f_oswald f_size_40">
                {{ play.name }}
              </div>
              <div class="d_flex_row j_content_start f_source_sans">
                <div>
                  {{ play.dramaturg[0].first_name }}
                  {{ play.dramaturg[0].last_name }}
                </div>
              </div>
            </div>
            <div
              class="p_abs_date w_max_content color_white open_sans f_size_32 f_weight_bold"
            >
              {{ checkDateToShow(play.id, play.on_play) }}
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "MainPageView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      imiterForPositionFaces: 14,
      playwritersCaricatures: [],
      ideas: [],
      mainPlays: [],
      subscribe: {},
    };
  },
  created() {
    this.getPlaywriters()
      .then(() => this.getIdea())
      .then(() => this.getPlaySMain());
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Головна";
    },

    concat(first, last) {
      // Конкатенує ім'я
      return `${first} ${last}`;
    },

    async getPlaywriters() {
      this.playwritersCaricatures = await fetch(
        `${this.$store.getters.getServerUrl}/owners_face/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },

    async getPlaySMain() {
      this.mainPlays = await fetch(
        `${this.$store.getters.getServerUrl}/date_plays_main/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
    async getIdea() {
      this.ideas = await fetch(`${this.$store.getters.getServerUrl}/ideas/`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
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
    datePlayGet(datePlay) {
      // Змінює формат дати вистави для показу на сторінці
      let dateOnly = String(datePlay).split("T")[0];
      let dates = dateOnly.split("-");
      let correctDate = `${dates[2]}|${dates[1]}`;
      return correctDate;
    },
    checkDateToShow(datePlayId, datesOfPlay = []) {
      // Вибирає потрібну дату
      for (let x = 0; x < datesOfPlay.length; x++) {
        if (datesOfPlay[x].id == datePlayId) {
          let neededDate = this.datePlayGet(datesOfPlay[x].date_pl);
          return neededDate;
        }
      }
      return;
    },
  },
  computed: {
    firstTwoRowsPlw() {
      return this.playwritersCaricatures.filter((playwritersCaricatures) => {
        return (
          this.playwritersCaricatures.indexOf(playwritersCaricatures) <
          this.imiterForPositionFaces
        );
      });
    },
    downRowPlw() {
      return this.playwritersCaricatures.filter((playwritersCaricatures) => {
        return (
          this.playwritersCaricatures.indexOf(playwritersCaricatures) >=
          this.imiterForPositionFaces
        );
      });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1210px) {
  #plays_main_list,
  #idea_main_list {
    grid-template-columns: repeat(2, 1fr);
  }
  .line {
    display: block !important;
  }
}
@media screen and (max-width: 1000px) {
  #plays_main_list,
  #idea_main_list {
    grid-template-columns: repeat(1, 1fr);
  }
  #faces_6 {
    padding-top: 5px;
  }
  .size_pictures_low_1000 {
    height: 50px !important;
    width: 40px !important;
    
  }
  .padding_faces{
    padding: 0 !important;
  }
  .padding_low_1000 {
    padding: 0.9em !important;
  }
}

.size_pictures,
.size_pictures_2 {
  height: 100px;
  width: 80px;
}

.size_pictures:hover,
.size_pictures_2:hover {
  /* height: 120px;
  width: 100px; */
  padding-left: 8px;
  transform: scale(1.2);
}

.size_pictures_2:hover {
  padding-top: 8px;
}
.zoom_hover {
  transition: all 1s ease-out;
}
.zoom_hover:hover {
  transform: scale(1.2);
}

.line {
  display: none;
}
</style>