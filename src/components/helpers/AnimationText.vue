<template>
  <div
    id="name_site"
    class="upper_case big_font_site_name open_sans w_max_content"
  >
    <div class="d_flex_row j_content_space_between flex_wrap">
      <div
        v-for="nam in nameSiteHoverScale('театр')"
        :key="nam.value"
        class="d_flex_row j_content_center scale_hover"
      >
        {{ nam.letter }}
      </div>
      <pre></pre>
      <div
        v-for="nam in nameSiteHoverScale('драматургів')"
        :key="nam.value"
        class="d_flex_row j_content_center scale_hover"
      >
        {{ nam.letter }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimationText",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    nameSiteHoverScale(word) {
      // Еффект по наведенню збільшення
      let ww = String(word);
      let listWords = [];
      for (let x = 0; x < ww.length; x++) {
        listWords.push({ value: x, letter: ww[x] });
      }
      return listWords;
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
</style>