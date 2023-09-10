<template>
  <div v-if="!isMobile" class="main_desktop">
    <div class="d_flex_column">
      <div class="upper_case open_sans name_dep">афіша</div>
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
    };
  },
  created() {},
  methods: {},
};
</script>
  <style scoped>
.main_desktop {
  padding: 40px;
}

.name_dep {
  font-size: 4em;
}
</style>