<template>
  <div v-if="!isMobile" class="header_desktop">
    <div class="d_flex_column">
      <DesktopRightCornerComponent />
      <DesktopNameSiteComponent />
      <DesktopNavigatorComponent />
    </div>
  </div>
</template>
<script>
import DesktopRightCornerComponent from "@/components/header/DesktopRightCornerComponent.vue";
import DesktopNameSiteComponent from "@/components/header/DesktopNameSiteComponent.vue";
import DesktopNavigatorComponent from "./header/DesktopNavigatorComponent.vue";

export default {
  name: "HeaderComponent",
  components: {
    DesktopRightCornerComponent,
    DesktopNameSiteComponent,
    DesktopNavigatorComponent,
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
.header_desktop {
  padding: 40px;
}
</style>