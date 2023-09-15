<template>
  <div v-if="!isMobile" class="d_flex_row_reverse ">
    <span class="f_oswald c_main_white f_size_24 lower_case c_pointer" @click="socialLink(socLink)">
        {{ socName }}
    </span>
  </div>
</template>
      <script>
export default {
  name: "DesktopSocialComponent",
  props: {
    socLink: String,
    socName: String,
  },
  components: {},
  data() {
    return {
      isMobile: false,
    };
  },
  created() {},
  methods: {
    socialLink(lnk) {
      // Anchor to top
      window.open(lnk, "_blank").focus();
    },
  },
};
</script>
<style scoped>
.c_main_white {
  color: #f9f9f9;
}

.c_main_white:hover {
  color: #e0e0e0;
}
.f_size_24 {
  font-size: 1.3em;
  font-weight: 200;
}
</style>