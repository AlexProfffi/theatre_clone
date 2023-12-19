<template>
  <div
    id="wrap_info_user"
    class="d_flex_row j_content_space_around bg_grey_custom ptb_1em horizontal_line"
  >
    <div id="wrap_info" class="d_flex_column w_50">
      <div id="inner_wraper_info" class="d_flex_column pad_lr_1e">
        <div class="d_flex_row ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">
              login
            </div>
            <div class="f_source_sans f_weight_bold">
              {{ myDataInner.username }}
            </div>
          </div>
        </div>
        <div class="d_flex_row ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">
              email
            </div>
            <div class="f_source_sans f_weight_bold">
              {{ myDataInner.email }}
            </div>
          </div>
        </div>
        <div class="d_flex_row j_content_space_between ptb_1em">
          <div class="d_flex_column">
            <div class="upper_case f_size_15 f_source_sans t_left padding_b">
              ім'я прізвище
            </div>
            <div class="f_source_sans f_weight_bold t_left">
              {{ myDataInner.first_name }} {{ myDataInner.last_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- form change user data -->
    <div id="wrap_form" class="w_50">
      <form
        id="form_change"
        class="d_flex_column width_form "
        action=""
        method="POST"
        @submit="changeAbout"
      >
        <div class="d_flex_column">
          <label class="font_1 t_left" for="log_in">Змінити логін:</label>
          <input
            v-model="myDataInner.username"
            type="text"
            name="log_in"
            id="log_in"
          />
        </div>
        <div class="d_flex_column">
          <label class="font_1 t_left" for="e_mail"
            >Змінити електронну адресу:</label
          >
          <input
            v-model="myDataInner.email"
            type="text"
            name="e_mail"
            id="e_mail"
          />
        </div>
        <div class="d_flex_column">
          <label class="font_1 t_left" for="first_name">Змінити ім'я:</label>
          <input
            v-model="myDataInner.first_name"
            type="text"
            name="first_name"
            id="first_name"
          />
        </div>
        <div class="d_flex_column">
          <label class="font_1 t_left" for="last_name">Змінити прізвище:</label>
          <input
            v-model="myDataInner.last_name"
            type="text"
            name="last_name"
            id="last_name"
          />
        </div>
        <div class="ptb_1em d_flex_row_reverse">
          <input
            type="submit"
            value="Змінити"
            class="my_data_b color_white f_oswald upper_case pad_03em b_radius_5 w_30"
          />
        </div>
      </form>
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
    return {
      myDataInner: this.myData,
      token: localStorage.getItem("token"),
    };
  },
  created() {},
  methods: {
    getHeaders(token) {
      // Return headers with token for fetch

      let headers = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
      };
      return headers;
    },
    async changeAbout(e) {
      // Запит на зміну даних
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrl}/edit_user/`;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${this.token.replace(/"/gi, "")}`,
        },
        body: JSON.stringify(this.myDataInner),
      });
    },
  },
};
</script>
    
    <style scoped>
@media screen and (max-width: 1000px) {
  #wrap_info_user {
    flex-direction: column;
  }
  
  #wrap_form, #wrap_info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #form_change, #inner_wraper_info {
    width: 75vw;
  }
  #inner_wraper_info {
    padding: 0;
  }

  #my_tct {
    justify-content: center;
  }
  .buyed_tct {
    font-size: 0.8em;
  }
  .width_form {
    width: 90%;
  }
}

.width_form {
  width: 75%;
}
.my_data_b {
  background-color: #212121;
  border: none;
}
</style>