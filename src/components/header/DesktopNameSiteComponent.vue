<template>
  <div class="d_flex_row j_content_center">
    <div
      id="name_site"
      class="upper_case big_font_site_name open_sans w_max_content"
    >
      театр драматургів
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
  created() {},
  methods: {},
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
</style>