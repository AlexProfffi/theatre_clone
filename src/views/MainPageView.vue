<template>
  <div>
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column">
      <div class="d_grid margin_both_auto">
        <div
          v-for="playw in playwritersCaricatures"
          :key="playw.id"
          class="pad_1em"
        >
          <div class="c_pointer">
            <img
              :src="playw.image"
              :alt="playw.name"
              :title="concat(playw.to_playwriter.first_name, playw.to_playwriter.last_name)
              "
              class="size_pictures"
              :class="{'size_pictures': playw.id % 2 == 0, 'size_pictures_2': playw.id % 2 != 0,}"
            />
          </div>
        </div>
      </div>
      <div></div>
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
      playwritersCaricatures: [],
      mainPlays: [],
      subscribe: {},
    };
  },
  created() {
    this.getPlaywriters();
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Головна";
    },

    concat(first, last) {
      // Конкатенує ім'я
      return `${first} ${last}`
    },

    async getPlaywriters() {
      this.playwritersCaricatures = await fetch(
        `${this.$store.getters.getServerUrl}/owners_face/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1000px) {
}

.size_pictures, .size_pictures_2 {
  height: 100px;
  width: 80px;
}

.size_pictures:hover, .size_pictures_2:hover {
  /* height: 120px;
  width: 100px; */
  padding-left: 8px;
  transform: scale(1.2);
}

.size_pictures_2:hover {
  padding-top: 8px;
}
</style>