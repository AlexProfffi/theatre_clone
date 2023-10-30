<template>
  <div v-if="!isMobile" class="home_play">
    <div class="d_flex_row j_content_start">
      <div class="d_flex_column j_content_space_around">
        <div>
          © <span>theatreofplaywrights.com</span> 2023 
        </div>
        <div class="t_left">
          <div>
            <a href="/offerta" class="c_pointer  offerts color_white none_text_decor">
              Публічна оферта
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
      <script>
// @ is an alias to /src

export default {
  name: "OffertsComponent",
  components: {},
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
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
      