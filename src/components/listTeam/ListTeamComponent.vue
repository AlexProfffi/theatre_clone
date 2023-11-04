<template>
  <div class="opacity_05 main_content">
    <div id="wrapper_list_team" class="d_flex_column p_40px">
      <div
        class="t_left bg_grey_custom scale_hover"
        v-for="prs in personals"
        :key="prs.id"
      >
        <div class="d_flex_row j_content_space_between w_30 ptb_1em">
          <div class="h_24_px p_lr_1">
            <img
              v-if="prs.photo"
              class="h_100 img_on_main img_list_team"
              :src="repalcer(prs.photo, '')"
              :alt="prs.last_name"
            />
            <img
              v-else
              class="h_100 img_on_main img_list_team"
              :src="defaultPhoto"
              :alt="prs.last_name"
            />
          </div>
          <div class="d_flex_row j_content_start w_100">
            <div class="d_flex_column j_content_center">
              <div class="">{{ prs.first_name }} {{ prs.last_name }}</div>
              <div class="font_1">
                {{ getAllRoles(prs.role) }}
              </div>
            </div>
          </div>
        </div>
        <div class="horizontal_line"></div>
      </div>
    </div>
    <div class="f_weight_bold f_size_40" v-if="personals">
      {{ defaultTextNotInfo }}
    </div>
  </div>
</template>
          
  <script>
// @ is an alias to /src

export default {
  name: "ListTeamComponent",
  props: {
    teamPart: String,
  },
  components: {},
  data() {
    return {
      personals: [],
      defaultPhoto:
        "https://theatreofplaywrightsapi.space:8443/image_theatre/ДраматургиPhoto/anonim.png",
      defaultTextNotInfo: "Скоро з'являться...",
    };
  },
  beforeCreate() {},
  created() {
    this.getPersonal().then(() => {
      this.showContent();
    });
  },
  methods: {
    async getPersonal() {
      this.personals = await fetch(
        `${this.$store.getters.getServerUrl}/staff_separated${this.teamPart}/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
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
    getAllRoles(roles) {
      let str = roles.join(", ");
      return str;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1330px) {
}

@media screen and (max-width: 1000px) {
}
@media screen and (max-width: 700px) {
  #wrapper_list_team {
    padding: 10px;
  }
}

.img_list_team {
  width: 70px;
}
</style>
          