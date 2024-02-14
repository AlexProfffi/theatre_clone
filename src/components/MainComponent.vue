<template>
  <div v-if="!isMobile" class="main_desktop" id="all_poster">
    <div class="d_flex_column">
      <div
        v-if="$store.state.currentLanguage == 0"
        class="upper_case open_sans name_dep"
      >
        {{ namePage }}
      </div>
      <div
        v-else-if="$store.state.currentLanguage == 2"
        class="upper_case open_sans name_dep"
      >
        {{ namePageEn }}
      </div>
      <div>
        <DesktopMonthNaviComponent />
      </div>
      <div>
        <DesktopPosterComponent />
      </div>
    </div>
  </div>
</template>
  <script>
import DesktopMonthNaviComponent from "@/components/main/DesktopMonthNaviComponent.vue";
import DesktopPosterComponent from "@/components/main/DesktopPosterComponent.vue";

export default {
  name: "MainComponent",
  components: {
    DesktopMonthNaviComponent,
    DesktopPosterComponent,
  },
  data() {
    return {
      isMobile: false,
      namePage: "афіша",
      namePageEn: "poster",
    };
  },
  created() {},
  methods: {},
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
  #all_poster {
    padding: 0;
  }
}

.main_desktop {
  padding: 40px;
}
</style>