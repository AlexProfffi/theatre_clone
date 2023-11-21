<template>
  <div class="registaration">
    <div>
      <HeaderComponent />
    </div>

    <div class="reg_wrapper d_flex_column j_content_center m_auto_both">
      <div class="d_flex_column j_content_center pad_top">
        <div class="d_flex_column j_content_center pad_b1em">
          <h3 class="upper_case f_oswald">реєстрація</h3>
        </div>
        <div class="d_flex_row j_content_center f_oswald">
          <form
            class="d_flex_column w_70"
            action=""
            method="POST"
            @submit="createUser"
          >
            <div class="mar_top_bot_1">
              <input
                required="true"
                placeholder="Ваш логін..."
                class="w_100 h_2em border_gray t_justify open_sans font_1 pad_top_b_2rem"
                type="text"
                v-model="formRegistrateData.username"
              />
            </div>
            <div class="mar_top_bot_1">
              <input
                required="true"
                placeholder="Електронна пошта"
                class="w_100 h_2em border_gray t_justify open_sans font_1 pad_top_b_2rem"
                type="email"
                v-model="formRegistrateData.email"
              />
            </div>
            <div class="mar_top_bot_1">
              <input
                required="true"
                v-if="!isShowPassword"
                placeholder="Пароль"
                class="w_100 h_2em border_gray t_justify open_sans font_1 pad_top_b_2rem"
                type="password"
                v-model="formRegistrateData.password"
              />
              <input
                required="true"
                v-else
                placeholder="Пароль"
                class="w_100 h_2em border_gray t_justify open_sans font_1 pad_top_b_2rem"
                type="text"
                v-model="formRegistrateData.password"
              />
            </div>
            <div class="pad_b1em">
              <label
                class="small_font_07 t_left w_100 c_red"
                v-if="
                  formRegistrateData.password != formRegistrateData.re_password
                "
              >
                Вказані паролі мають бути ідентичними
              </label>
              <input
                required="true"
                v-if="!isShowPassword"
                placeholder="Повторіть пароль"
                class="w_100 h_2em border_gray open_sans font_1 pad_top_b_2rem"
                type="password"
                v-model="formRegistrateData.re_password"
              />
              <input
                required="true"
                v-else
                placeholder="Повторіть пароль"
                class="w_100 h_2em border_gray open_sans font_1 pad_top_b_2rem"
                type="text"
                v-model="formRegistrateData.re_password"
              />
            </div>
            <div class="d_flex_row j_content_space_between pad_b1em">
              <input
                class="check_element c_pointer"
                type="checkbox"
                v-model="isAgree"
              />
              <span class="small_font" for="flexCheckChecked">
                Я приймаю умови використання сервісів сайту та погоджуюсь з
                умовами обробки персональних даних
              </span>
              <span class="c_pointer" @click="isShowPassword = !isShowPassword">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                  />
                </svg>
              </span>
            </div>
            <ul v-if="showErrors" class="error_registrate small_font_07 t_left">
              <li v-for="err in errorLog" :key="err.value">
                {{ err.text }}
              </li>
            </ul>
            <div class="p_tb_5">
              <input
                class="btn_black w_100 pad_4_path"
                type="submit"
                value="СТВОРИТИ АККАУНТ"
                :disabled="!ifCorrectAllFields()"
              />
            </div>
          </form>
        </div>

        <div
          class="d_flex_row j_content_space_around pad_top"
          v-if="isShowSocial"
        >
          <div class="d_flex_row j_content_end w_50">
            <a :href="gLinkAuth.link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                class="bi bi-google c_pointer margin_both_2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                />
              </svg>
            </a>
          </div>
          <div class="d_flex_row j_content_start w_50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-facebook c_pointer margin_both_2"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="pad_top font_1">
        Маєш аккаунт?
        <router-link
          class="nav_link_color f_weight_bold underline_txt"
          to="/auth"
          >Увійти</router-link
        >
      </div>
    </div>
    <FooterComponent />
  </div>
</template>
  
  <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";
// import axios from "axios";

export default {
  name: "RegistrationView",
  components: {
    HeaderComponent,
    FooterComponent,
    // SpinerComponent,
  },
  data() {
    return {
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
      document.querySelector("title").innerHTML = "Реєстрація";
    },
    dataFormInfo() {
      // Форма
      let plHolder = [
        "Логін",
        "Електронна пошта",
        "Пароль",
        "Повторіть пароль",
      ];

      let typeInput = ["text", "email", "password", "password"];
      let allData = [];
      for (let x = 0; x < typeInput.length; x++) {
        allData.push({
          value: x,
          placeholder: plHolder[x],
          types: typeInput[x],
        });
      }
      return allData;
    },

    async checkingUserData(userData) {
      // перевіряє пароль користувача
      console.log(userData);
    },

    async createUser(e) {
      // Registration djoser
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrl}/auth/users/`;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formRegistrateData),
      })
        .then((response) => {
          response.json().then((response) => {
            if (response.password) {
              this.errorLog = [];
              for (let x = 0; x < response.password.length; x++) {
                if (response.password) {
                  this.errorLog.push({ value: x, text: response.password[x] });
                }
              }
              this.showErrors = true;
              console.log(this.errorLog);
            } else if (response.username.length) {
              this.errorLog = [];
              for (let x = 0; x < response.username.length; x++) {
                if (response.username) {
                  this.errorLog.push({ value: x, text: response.username[x] });
                }
              }
              this.showErrors = true;
            } else if (response.email.length) {
              this.errorLog = [];
              for (let x = 0; x < response.email.length; x++) {
                if (response.email) {
                  this.errorLog.push({ value: x, text: response.email[x] });
                }
              }
              this.showErrors = true;
            } else {
              this.$router.push({ name: "Auth" });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async loginGoogle() {
      // Url login google
      let url = `${this.$store.getters.getServerUrl}/google_login/`;
      this.gLinkAuth = await fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    ifCorrectAllFields() {
      // Перевіряє коректність заповнення полів

      if (
        this.formRegistrateData.username &&
        this.formRegistrateData.email &&
        this.formRegistrateData.password &&
        this.formRegistrateData.re_password &&
        this.formRegistrateData.password ==
          this.formRegistrateData.re_password &&
        this.isAgree
      ) {
        return true;
      }
      return false;
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
      