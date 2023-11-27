<template>
  <div class="reset">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column j_content_space_between ptb_5em">
      <div class="d_flex_row j_content_center pad_b1em">
        <div id="info" class="w_30 t_jusify font_1">
          {{ txt }}
        </div>
      </div>
      <div class="d_flex_column j_content_center pad_b1em">
        <div id="err_info"
          class="w_30 t_jusify font_1 c_red"
          v-for="erl in errorLog"
          :key="erl.val"
        >
          {{ erl.txt[0] }}
        </div>
      </div>
      <div class="d_flex_row j_content_center h_150">
        <form
        id="forms"
          class="d_flex_column j_content_center w_20em"
          action=""
          method="POST"
          @submit="sendReset"
        >
          <div class="horizontal_line">
            <input
              v-model="formNewData.new_password"
              class="w_100 h_2em border_gray t_justify open_sans font_1 pad_03em"
              type="password"
              placeholder="Введіть новий пароль"
            />
          </div>
          <div class="horizontal_line">
            <input
              v-model="formNewData.re_new_password"
              class="w_100 h_2em border_gray t_justify open_sans font_1 pad_03em"
              type="password"
              placeholder="Повторіть новий пароль"
            />
          </div>
          <div class="d_flex_column ptb_1em" id="wrap_btn">
            <input
              class="btn_black b_none pad_03em upper_case sibscribe_button f_oswald h_100"
              type="submit"
              value="Відправити"
            />
          </div>
        </form>
      </div>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>
      
      <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

// import axios from "axios";

export default {
  name: "SetPasswordView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  props: {
    uid: String,
    token: String,
  },
  data() {
    return {
      txt: "На дану електронну адресу буде надіслано листа з посиланням на створення нового пароля!",

      formNewData: {
        uid: this.uid,
        token: this.token,
        new_password: "",
        re_new_password: "",
      },
      showErrors: false,
      errorLog: [],
      isShowPass: false,
      isShowRePass: false,
    };
  },
  beforeCreate() {},
  created() {
    // this.loginGoogle();
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Скидання пароля";
    },
    async sendReset(e) {
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrl}/auth/users/reset_password_confirm/`;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formNewData),
      })
        .then((response) => {
          if (response.status == 204) {
            this.$router.push({ name: "Auth" });
          } else {
            response.json().then((response) => {
              if (response.new_password) {
                this.errorLog.push({ val: 0, txt: response.new_password });
              } else if (response.re_new_password) {
                this.errorLog.push({ val: 0, txt: response.re_new_password });
              }
              console.log(response);
            });
          }
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
      <style scoped>
@media screen and (max-width: 600px) {
  .reg_wrapper {
    height: 550px !important;
    width: 100% !important;
  }
  #info,
  #err_info {
    width: 80vw;
  }
  #forms {
    flex-direction: column;
    justify-content: space-around;
    width: 80vw;
    height: 200px;
  }
  #wrap_btn {
    height: 40%;
  }
}

.bg_gradient {
  position: absolute;
  top: -65em;
  left: -9em;
  background: linear-gradient(
    120deg,
    #e7cb87,
    #af83dc,
    #76bff3,
    #af83dc,
    #e7cb87
  );
  height: 145vh;
  width: 110vw;
  transform: rotate(170deg);
  /* z-index: 1; */
}

.reg_wrapper {
  height: 600px;
  width: 550px;
  background-color: #ffffff;
  border: 2px solid #e0e0e0;
}
.btn_black {
  background-color: #212121;
  color: #ffffff;
}
</style>
          