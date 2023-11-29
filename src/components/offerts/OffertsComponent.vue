<template>
  <div v-if="!isMobile" class="home_play">
    <div class="d_flex_row j_content_space_around">
      <div class="d_flex_column j_content_space_around w_100">
        <div class="t_left">
          <div>
            <a
              href="/offerta"
              class="c_pointer offerts color_gr none_text_decor open_sans font_1"
            >
              Публічна оферта
            </a>
          </div>
        </div>
        <div
          id="makers"
          class="t_left open_sans d_flex_column j_content_start "
        >
          <div id="designer" class="">
            <a
              class="nav_link_color"
              href="https://www.behance.net/nika_hondarenko"
            >
              <div class="color_gr f_weight_bold">
                <span> Дизайн: </span>
                <span> Hondarenko </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 26 26"
                >
                  <path
                    d="M8.228 15.01h-2.228v-2.01h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zm-6.804-3.333h-2.182v2h2.389c1.673 0 1.937-2-.207-2zm15.818-4v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5zm-10 3h5v-1h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604h-4.635v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947 0 2.631 1.367 3.783 3.416 3.783s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z"
                  />
                </svg>
              </div>
            </a>
          </div>
          <div id="developer" class="">
            <a
              class="nav_link_color color_white"
              href="https://github.com/VovaSavin/"
            >
              <div class="color_gr f_weight_bold">
                <span> Розробка: </span>
                <span> VovaSavin </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"
                  />
                </svg>
              </div>
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
@media screen and (max-width: 1000px) {
  #makers {
    flex-direction: column;
  }
}
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
      