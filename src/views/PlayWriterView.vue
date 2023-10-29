<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <p></p>
    <div>
      <div class="d_flex_column p_40px">
        <div class="d_flex_row j_content_space_around ptb_5em">
          <div id="image_playwriter" class="d_flex_row j_content_center w_50">
            <img
              v-if="playwriter.photo"
              class="w_50"
              :src="playwriter.photo"
              :alt="playwriter.last_name"
            />
            <img
              v-else
              class="w_50"
              :src="defaultPhoto"
              :alt="playwriter.last_name"
            />
          </div>
          <div class="d_flex_column w_50 f_source_sans color_black t_left">
            <div class="f_size_48 upper_case">
              {{ playwriter.first_name }} {{ playwriter.last_name }}
            </div>
            <div
              class="upper_case f_size_40 f_weight_bold"
              v-for="rol in playwriter.role"
              :key="playwriter.role.indexOf(rol)"
            >
              <span>
                {{ rol }}
              </span>
            </div>
            <div v-if="playwriter.about ">
              {{ playwriter.about }}
            </div>
            <div v-else>
              {{ defaultText }}
            </div>
          </div>
        </div>
        <div
          class="d_flex_row j_content_space_around f_source_sans color_black ptb_5em"
        >
          <div class="d_flex_column t_left w_50">
            <div class="d_flex_row j_content_center ptb_1em">
              <div class="upper_case f_size_40 f_weight_bold w_50">
                вибрані тексти
              </div>
            </div>
            <div class="d_flex_row j_content_center">
              <div v-if="playwriter.texts" class="w_50">
                {{ playwriter.texts }}
              </div>
              <div class="w_50" v-else>
              {{ defaultText }}
            </div>
            </div>
          </div>
          <div class="d_flex_column t_left w_50">
            <div class="d_flex_row j_content_start ptb_1em">
              <div class="upper_case f_size_40 f_weight_bold">
                проєкти
              </div>
            </div>
            <div v-if="playwriter.projects">
              {{ playwriter.projects }}
            </div>
            <div v-else>
              {{ defaultText }}
            </div>
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

export default {
  name: "PlayWriterView",
  props: {
    id: String,
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      playwriter: {},
      defaultPhoto: "https://theatreofplaywrightsapi.space:8443/image_theatre/ДраматургиPhoto/anonim.png",
      defaultText: "Ось, скоро вже з'явиться..."
    };
  },
  beforeCreate() {},
  created() {
    this.getPlayWriter();
  },
  methods: {
    async getPlayWriter() {
      this.playwriter = await fetch(
        `${this.$store.getters.getServerUrl}/playwriters/${this.id}/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
  },
};
</script>
      <style scoped>
</style>
      