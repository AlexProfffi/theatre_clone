<template>
  <div class="d_flex_row j_content_start ptb_1em bg_grey_custom" id="my_plays">
    <div class="w_50 w_50_profile">
      <div class="d_flex_column bg_grey_custom">
        <div
          class="d_flex_column f_source_sans"
          v-for="ub in myTickets"
          :key="ub.id"
        >
          <div class="d_flex_row d_flex_row_profile j_content_space_around">
            <div class="w_20em w_100_profile">
              <div class="w_100">
                <img
                  class="w_100"
                  :src="repalcer(ub.for_play.photo, true)"
                  :alt="ub.for_play.name"
                />
              </div>
            </div>
            <div class="d_flex_column j_content_end">
              <div class=" d_flex_row">
                <div>
                  <span class="font_1">
                    {{ numberOrder.ua }}
                  </span>
                  <span class="f_weight_bold">
                    {{ ub.number_order }}
                  </span>
                </div>
              </div>
              <div class="d_flex_row">
                <div>
                  <span class="font_1">
                    {{ idOrder.ua }}
                  </span>
                  <span class="f_weight_bold">
                    {{ ub.order_id }}
                  </span>
                </div>
              </div>
              <div class="d_flex_row font_1">
                <div>
                  {{ ub.date_time_play }}
                </div>
              </div>
              <div class="d_flex_row">
                <div class="f_oswald f_size_40">
                  {{ ub.for_play.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="horizontal_line ptb_1em"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "MyPlaysComponent",
  props: {
    myTickets: Array,
  },
  components: {},
  data() {
    return {
      numberOrder: {
        ua: "Номер замовлення:",
        en: "Order number:",
      },
      idOrder: {
        ua: "ID замовлення:",
        en: "Order ID:",
      },
    };
  },
  created() {},
  methods: {
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443/" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443/image_theatre/" + str;
    },
  },
};
</script>
  
  <style scoped>
@media screen and (max-width: 1190px) {
  #my_tct {
    justify-content: center;
  }
  .buyed_tct {
    font-size: 0.8em;
  }
  .w_50_profile {
    width: 90%;
  }
}
@media screen and (max-width: 800px) {
  #my_plays {
    justify-content: center;
  }
  .d_flex_row_profile {
    flex-direction: column;
  }
  .w_50_profile .w_100_profile {
    width: 100%;
  }
}
</style>