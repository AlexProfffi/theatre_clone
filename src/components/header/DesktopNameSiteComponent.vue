<template>
  <div class="d_flex_row j_content_center">
    <div id="coffe"></div>
    <div
      v-if="$store.state.currentLanguage == 0"
      id="name_site"
      class="upper_case big_font_site_name open_sans w_max_content"
    >
      театр драматургів
    </div>
    <div
      v-else-if="$store.state.currentLanguage == 2"
      id="name_site"
      class="upper_case big_font_site_name open_sans w_max_content"
    >
      Theatre of Playwrights
    </div>
  </div>
</template>
    <script>
export default {
  name: "DesktopNameSiteComponent",
  components: {},
  data() {
    return {};
  },
  created() {
    this.checkCoords();
  },
  methods: {
    checkCoords() {
      if (localStorage.getItem("token")) {
        console.log("USER IS AUTH");
        if (Number(localStorage.getItem("lon")) == 0) {
          setTimeout(this.setUserActivity, 7000);
        } else {
          this.setUserActivity();
        }
      }
    },

    async setUserActivity() {
      // Створює запис при вході користувача

      await fetch(`${this.$store.getters.getServerUrl}/user_activity_record/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("eml"),
          longitude: Number(localStorage.getItem("lon")),
          latitude: Number(localStorage.getItem("lat")),
        }),
      });
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1550px) {
  #name_site {
    font-size: 6em;
  }
}
@media screen and (max-width: 1000px) {
  #name_site {
    font-size: 2em;
  }
}

.big_font_site_name {
  font-size: 8em;
  font-stretch: condensed;
  font-weight: bold;
  color: #212121;
}

.m_both {
  padding-left: 0.7em;
  padding-right: 0.7em;
}

.scale_hover:hover {
  box-shadow: none;
  transform: scale(1.1);
}
#coffe {
  position: absolute;
  width: 25%;
  left: 40%;
  top: 5%;
}
</style>