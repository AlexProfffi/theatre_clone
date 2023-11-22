<template>
  <div class="reset">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column j_content_space_between ptb_5em">
      <div class="d_flex_row j_content_center pad_b1em">
        <div class="w_30 t_jusify font_1">
            {{ txt }}
        </div>
      </div>
      <div class="d_flex_row j_content_center">
        <form class="d_flex_row j_content_center" action="" method="POST">
          <div class="horizontal_line">
            <input
              class="w_100 b_none f_oswald padding_4path sibscribe_input"
              type="email"
              placeholder="Електронна пошта"
            />
          </div>
          <div class="d_flex_column pad_both_7">
            <input
              class="btn_black b_none pad_both_7 upper_case sibscribe_button f_oswald h_100"
              type="button"
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
  name: "RegistrationView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      txt: "На дану електронну адресу буде надіслано листа з посиланням на створення нового пароля!",
      spiner: false,
      isAgree: false,
      isShowSocial: false,
      isMobile: false,
      isShowPassword: false,
      gLinkAuth: {},
      formRegistrateData: {
        username: "",
        email: "",
        password: "",
        re_password: "",
      },
      showErrors: false,
      errorLog: [],
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
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
  .reg_wrapper {
    height: 550px !important;
    width: 100% !important;
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
        