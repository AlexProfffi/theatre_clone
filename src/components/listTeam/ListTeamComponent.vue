<template>
  <div class="opacity_05 main_content">
    <div class="f_weight_bold f_size_40" v-if="!isFull">
      {{ defaultTextNotInfo }}
    </div>
    <div v-else id="wrapper_list_team" class="d_flex_column p_40px">
      <div
        class="t_left bg_grey_custom scale_hover"
        v-for="prs in personals"
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
                      name: transcription(
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

export default {
  name: "ListTeamComponent",
  props: {
    teamPart: String,
  },
  components: {},
  data() {
    return {
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
    transcription(word) {
      // Транскрипція з кирилиці на латиницю
      let transcription_alpha = [
        { value: ["а", "a"] },
        { value: ["б", "b"] },
        { value: ["в", "v"] },
        { value: ["г", "g"] },
        { value: ["ґ", "g"] },
        { value: ["д", "d"] },
        { value: ["е", "e"] },
        { value: ["є", "ye"] },
        { value: ["ж", "zh"] },
        { value: ["з", "z"] },
        { value: ["и", "y"] },
        { value: ["і", "i"] },
        { value: ["ї", "i"] },
        { value: ["й", "y"] },
        { value: ["к", "k"] },
        { value: ["л", "l"] },
        { value: ["м", "m"] },
        { value: ["н", "n"] },
        { value: ["о", "o"] },
        { value: ["п", "p"] },
        { value: ["р", "r"] },
        { value: ["с", "s"] },
        { value: ["т", "t"] },
        { value: ["у", "u"] },
        { value: ["ф", "f"] },
        { value: ["х", "kh"] },
        { value: ["ц", "ts"] },
        { value: ["ч", "ch"] },
        { value: ["ш", "sh"] },
        { value: ["щ", "shch"] },
        { value: ["ь", ""] },
        { value: ["ю", "yu"] },
        { value: ["я", "ya"] },
        { value: ["0", "0"] },
        { value: ["1", "1"] },
        { value: ["2", "2"] },
        { value: ["3", "3"] },
        { value: ["4", "4"] },
        { value: ["5", "5"] },
        { value: ["6", "6"] },
        { value: ["7", "7"] },
        { value: ["8", "8"] },
        { value: ["9", "9"] },
        { value: [" ", "_"] },
        { value: ["a", "a"] },
        { value: ["b", "b"] },
        { value: ["c", "c"] },
        { value: ["d", "d"] },
        { value: ["e", "e"] },
        { value: ["f", "f"] },
        { value: ["g", "g"] },
        { value: ["h", "h"] },
        { value: ["i", "i"] },
        { value: ["j", "j"] },
        { value: ["k", "k"] },
        { value: ["l", "l"] },
        { value: ["m", "m"] },
        { value: ["n", "n"] },
        { value: ["o", "o"] },
        { value: ["p", "p"] },
        { value: ["q", "q"] },
        { value: ["r", "r"] },
        { value: ["s", "s"] },
        { value: ["t", "t"] },
        { value: ["u", "u"] },
        { value: ["v", "v"] },
        { value: ["w", "w"] },
        { value: ["x", "x"] },
        { value: ["y", "y"] },
        { value: ["z", "z"] },
      ];
      let list_new_word = [];
      for (let x = 0; x < word.length; x++) {
        for (let y = 0; y < transcription_alpha.length; y++) {
          if (transcription_alpha[y].value[0] == word[x].toLowerCase()) {
            list_new_word.push(transcription_alpha[y].value[1]);
          }
        }
      }
      return list_new_word.join("");
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
          