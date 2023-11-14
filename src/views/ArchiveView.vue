<template>
  <div class="archives">
    <div>
      <HeaderComponent />
    </div>

    <div class="opacity_05 main_content">
      <div class="upper_case open_sans name_dep p_1_px pad_b1em f_low_1000">
        Минулі події
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
              <div class="t_left txt_pos_low_1000">
                {{ setBrakeDate(eventPast.date_time) }}
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
                    name: transcription(eventPast.name),
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

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "SiteSearchView",

  components: {
    HeaderComponent,
    FooterComponent,
    // SpinerComponent,
  },
  data() {
    return {
      eventWas: "Подія відбулась:",
      pastEvents: [],
    };
  },
  created() {
    this.getPastEvents().then(() => this.showContent());
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
    async getPastEvents() {
      this.pastEvents = await fetch(
        `${this.$store.getters.getServerUrl}/archive/`
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
@media screen and (max-width: 875px) {
  #events_wrapper {
    padding: 1em 0 5em 0;
  }

  .row_reverse_low_1000 {
    flex-direction: column;
  }
}
</style>
            