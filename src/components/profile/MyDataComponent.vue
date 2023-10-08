<template>
  <div class="d_flex_row bg_grey_custom ptb_1em horizontal_line">
    <div class="d_flex_column ">
      <div class="d_flex_column p_lr_1">
        <div class="d_flex_row ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">login</div>
            <div class="f_source_sans f_weight_bold">
              {{ myData.username }}
            </div>
          </div>
        </div>
        <div class="d_flex_row ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">email</div>
            <div class="f_source_sans f_weight_bold">
              {{ myData.email }}
            </div>
          </div>
        </div>
        <div class="d_flex_row ptb_1em">
            <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">ім'я</div>
            <div class="f_source_sans f_weight_bold">
                {{ myData.first_name }} {{ myData.last_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: "MyDataComponent",
  props: {
    myData: Object,
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