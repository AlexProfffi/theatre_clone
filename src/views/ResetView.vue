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
      <div class="d_flex_row j_content_center pad_b1em">
        <div
          id="err_info"
          class="w_30 t_jusify font_1 c_red"
          v-for="erl in errorLog"
          :key="erl.val"
        >
          {{ erl.txt }}
        </div>
      </div>
      <div class="d_flex_row j_content_center">
        <form
          id="forms"
          class="d_flex_row j_content_center"
          action=""
          method="POST"
          @submit="sendReset"
        >
          <div class="horizontal_line">
            <input
              v-model="formSendData.email"
              class="w_100 b_none f_oswald padding_4path sibscribe_input"
              type="email"
              placeholder="Електронна пошта"
            />
          </div>
          <div id="wrap_btn" class="d_flex_column pad_both_7">
            <input
              class="btn_black b_none pad_both_7 upper_case sibscribe_button f_oswald h_100"
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
  name: "ResetView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      txt: "На дану електронну адресу буде надіслано листа з посиланням на створення нового пароля!",

      formSendData: {
        email: "",
      },
      showErrors: false,
      errorLog: [],
    };
  },
  beforeCreate() {},
  created() {
    this.setTitle();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Скидання пароля";
    },
    async sendReset(e) {
      e.preventDefault();
      let url = `${this.$store.getters.getServerUrl}/auth/users/reset_password/`;
      await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formSendData),
      })
        .then((response) => {
          if (response.status == 204) {
            this.errorLog.push({
              val: 0,
              txt: "На вказану електронну пошту був відправлений лист з посиланням на сторінку зміни пароля.",
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
    height: 100px;
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
        