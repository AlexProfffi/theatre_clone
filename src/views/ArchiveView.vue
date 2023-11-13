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
              <div class="t_left txt_pos_low_1000">Подія відбулась:</div>
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
              class="d_flex_column j_content_space_around f_size_41 w_50 f_oswald f_low_1000 flex_low_500 w_low"
            >
              <a class="nav_link_color t_left txt_pos_low_1000" href="">
                {{ eventPast.name }}
              </a>
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
            