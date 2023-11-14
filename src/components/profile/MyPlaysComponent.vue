<template>
  <div class="d_flex_row j_content_start pad_top bg_grey_custom">
    <div class="d_flex_column">
      <div class="d_flex_row j_content_start" id="my_tct">
      </div>
      <div class="d_flex_row j_content_start">
        <ul>
          <li class="col_red buyed_tct" v-for="ub in myTickets" :key="ub.id">
            <b>{{ ub.for_play }}</b> / {{ ub.date_time_play }} / Код квитка: <b>{{ ub.order_id }}</b>;
          </li>
        </ul>
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
    return {};
  },
  created() {},
  methods: {},
};
</script>
  
  <style scoped>
@media screen and (max-width: 1000px) {
  #my_tct {
    justify-content: center;
  }
  .buyed_tct {
    font-size: 0.8em;
  }
}
</style>