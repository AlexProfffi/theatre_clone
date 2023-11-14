<template>
  <div class="opacity_05 main_content">
    <div class="d_flex_row j_content_center pad_1em">
      <div
        class="p_1_px p_1_px_low_700"
        v-for="navs in navigateTeam()"
        :key="navs.value"
      >
        <a class="nav_link_color upper_case font_1" :href="'/team' + navs.lnk">
          {{ navs.text }}
        </a>
      </div>
    </div>
    <div class="f_weight_bold f_size_40" v-if="!isFull">
      {{ defaultTextNotInfo }}
    </div>
    <div v-else id="wrapper_list_team" class="d_flex_column p_40px">
      <div class="d_flex_row ptb_1em">
        <div class="horizontal_line">
          <input
            class="t_left b_none sibscribe_input"
            type="search"
            name="enybodys"
            id="enybodys"
            placeholder="Пошук..."
            v-model="namePeople"
          />
        </div>
      </div>
      <div
        class="t_left bg_grey_custom scale_hover"
        v-for="prs in teamSearch"
        :key="prs.id"
      >
        <div class="d_flex_row j_content_space_between w_30 ptb_1em">
          <div class="h_24_px p_lr_1">
            <img
              v-if="prs.photo != badPhoto && prs.photo"
              class="h_100 img_on_main img_list_team"
              :src="repalcer(prs.photo, '')"
              :alt="prs.last_name + prs.first_name"
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
              <div class="">
                <router-link
                  class="nav_link_color"
                  :to="{
                    name: 'playwriter',

                    params: {
                      id: prs.id,
                      slugin: sluginToServer,
                      name: transcriptWord(
                        concat(prs.first_name, prs.last_name)
                      ),
                    },
                  }"
                >
                  {{ prs.first_name }} {{ prs.last_name }}
                </router-link>
              </div>
              <div class="font_1">
                {{ getAllRoles(prs.role) }}
              </div>
            </div>
          </div>
        </div>
        <div class="horizontal_line"></div>
      </div>
    </div>
  </div>
</template>
          
  <script>
// @ is an alias to /src
import { transcription } from "../../assets/main";

export default {
  name: "ListTeamComponent",
  props: {
    teamPart: String,
  },
  components: {},
  data() {
    return {
      namePeople: "",
      transcriptWord: transcription,
      personals: [],
      isFull: false,
      defaultPhoto:
        "https://theatreofplaywrightsapi.space:8443/image_theatre/ДраматургиPhoto/anonim.png",
      badPhoto:
        "/image_theatre/image_theatre/%D0%94%D1%80%D0%B0%D0%BC%D0%B0%D1%82%D1%83%D1%80%D0%B3%D0%B8Photo/anonim.png",
      defaultTextNotInfo: "Скоро з'являться...",
      sluginToServer: this.teamPart.replace("/", ""),
    };
  },
  beforeCreate() {},
  created() {
    this.getPersonal()
      .then(() => {
        this.showContent();
      })
      .then(() => {
        this.toShowPersonal();
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
    async toShowPersonal() {
      // Показувати чи не показувати команду

      if (this.personals != undefined && this.personals.length) {
        this.isFull = true;
      }
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
    concat(first, last) {
      // Конкатенує ім'я
      return `${first} ${last}`;
    },

    navigateTeam() {
      //
      let listLnks = [
        "%2Fauthors",
        "%2Fdirectors",
        "%2Factors",
        "%2Fmain-team",
      ];
      let listNamePart = ["автори", "режисери", "актори", "команда"];
      let finishData = [];
      for (let x = 0; x < listLnks.length; x++) {
        finishData.push({ value: x, text: listNamePart[x], lnk: listLnks[x] });
      }
      return finishData;
    },
  },
  computed: {
    teamSearch() {
      return this.personals.filter((object) => {
        return (
          object.first_name
            .toLowerCase()
            .indexOf(this.namePeople.toLowerCase()) > -1 ||
          object.last_name
            .toLowerCase()
            .indexOf(this.namePeople.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1650px) {
  .f_size_40 {
    font-size: 3.2em;
  }
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
          