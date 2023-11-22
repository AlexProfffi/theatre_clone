<template>
  <div class="d_flex_row bg_grey_custom ptb_1em horizontal_line">
    <div class="d_flex_column w_50">
      <div class="d_flex_column p_lr_1">
        <div class="d_flex_row ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">
              login
            </div>
            <div class="f_source_sans f_weight_bold">
              {{ myData.username }}
            </div>
          </div>
        </div>
        <div class="d_flex_row ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">
              email
            </div>
            <div class="f_source_sans f_weight_bold">
              {{ myData.email }}
            </div>
          </div>
        </div>
        <div class="d_flex_row j_content_space_between ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">
              ім'я
            </div>
            <div class="f_source_sans f_weight_bold">
              {{ myData.first_name }} {{ myData.last_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w_50 p_lr_1">
      <!-- <form class="d_flex_column" action="" method="POST" @submit="changeAbout">
        <div class="d_flex_column">
          <label class="font_1 t_left" for="first_name">Змінити логін:</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div class="d_flex_column">
          <label class="font_1 t_left" for="first_name"
            >Змінити електронну адресу:</label
          >
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div class="d_flex_column">
          <label class="font_1 t_left" for="first_name">Змінити ім'я:</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div class="d_flex_column">
          <label class="font_1 t_left" for="last_name">Змінити прізвище:</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div class="ptb_1em">
          <input
            type="submit"
            value="Змінити"
            class="my_data_b color_white f_oswald upper_case pad_03em b_radius_5 w_30"
          />
        </div>
      </form> -->
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
  methods: {
    async changeAbout(e) {
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrlNoV1}/`;
      await fetch(url);
    },
  },
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
.my_data_b {
  background-color: #212121;
  border: none;
}
</style>