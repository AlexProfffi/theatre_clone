<template>
  <div class="d_flex_row j_content_start bg_grey_custom">
    <div class="d_flex_column w_100">
      <div class="d_flex_column j_content_center">
        <ul v-if="myComments.length > 0" class="d_flex_column none_decor_ul" id="all_comments">
          <li
            class="col_red buyed_tct horizontal_line pad_top f_source_sans"
            v-for="ub in myComments"
            :key="ub.id"
          >
            <div class="d_flex_row j_content_start margin_both_2 for_play">
              <p class="w_50 font_1 w_max_p">
                <b>{{ ub.plays_for }}</b>
              </p>
            </div>
            <div class="d_flex_row j_content_center margin_both_2">
              <p class="w_50">
                {{ ub.text }}
              </p>
            </div>
            <div class="d_flex_row j_content_end margin_both_2">
              <p class="w_50 small_font w_max_p">
                {{ ub.date_create }}
              </p>
            </div>
          </li>
        </ul>
        <div v-else>
          Ви ще не залишали відгуків
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: "MyCommentsComponent",
  props: {
    myComments: Array,
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
    
    <style scoped>
@media screen and (max-width: 1000px) {
  #all_comments {
    padding: 0;
  }
  #my_tct {
    justify-content: center;
  }
  .for_play {
    justify-content: center !important;
  }
  .w_max_p {
    width: 100%;
  }
  .buyed_tct {
    font-size: 0.8em;
  }
}
</style>