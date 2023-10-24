<template>
  <div>
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column">
      <div class="margin_both_auto">
        <div class="d_grid">
          <div v-for="playw in firstTwoRowsPlw" :key="playw.id" class="pad_1em">
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
                class="size_pictures"
                :class="{
                  size_pictures: playw.id % 2 == 0,
                  size_pictures_2: playw.id % 2 != 0,
                }"
              />
            </div>
          </div>
        </div>
        <div class="d_grid_6">
          <div v-for="playw in downRowPlw" :key="playw.id" class="pad_1em">
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
                class="size_pictures"
                :class="{
                  size_pictures: playw.id % 2 == 0,
                  size_pictures_2: playw.id % 2 != 0,
                }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mar_0_06_em">
        <div id="plays_main" class="d_flex_column margin_both_auto">
          <div
            class="d_flex_row j_content_center upper_case open_sans name_dep t_left ptb_1em"
          >
            <div>вистави</div>
          </div>
        </div>
        <div class="d_grid_3 ptb_5em">
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
      mainPlays: [],
      subscribe: {},
    };
  },
  created() {
    this.getPlaywriters().then(() => this.getPlaySMain());
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
@media screen and (max-width: 1000px) {
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
</style>