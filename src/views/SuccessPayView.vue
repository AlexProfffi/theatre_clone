<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div v-if="showSpiner" id="spinner_is">
      <SpinerComponent />
      <h3 class="pad_top" id="label_spiner">Виконується оплата...</h3>
    </div>

    <div v-else>
      <div v-if="whichIsShowStatus(dataAndSign.status)">
        <h2 class="ptb_40">Платіж успішний!</h2>
        <div class="t_justify">
          {{ answerInfoBuy }}
        </div>
      </div>

      <div v-else>
        <h2 class="ptb_40">Платіж невдалий!</h2>
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
import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "SuccessPayView",
  components: {
    HeaderComponent,
    FooterComponent,
    SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      satatusData: {},
      showSpiner: true,
      dataAndSign: {},
      currentOrderId: JSON.parse(localStorage.getItem("infoForTicket")),
      textRing: "Виконується оплата...",
      answerInfoBuy: null,
    };
  },
  beforeCreate() {},
  created() {
    if (JSON.parse(localStorage.getItem("infoForTicket")) != null) {
      this.getDataAndSign().then(() => {
        this.showSpiner = false;
      });
    } else {
      setTimeout(
        this.getDataAndSign().then(() => {
          this.showSpiner = false;
        }),
        2500
      ).then(() => {
        this.showSpiner = false;
      });
      // .then(() => this.whichIsShowStatusAsync());
    }
  },
  methods: {
    async getDataAndSign() {
      let url = `${this.$store.getters.getServerUrl}/show_status_pay/${
        JSON.parse(localStorage.getItem("infoForTicket")).order_id
      }/`;
      this.dataAndSign = await fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    async postDataTicket(statusPay) {
      // Post query on PurcachedTiket
      let url = `${this.$store.getters.getServerUrl}/create_purcached_ticket/${statusPay}/`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(JSON.parse(localStorage.getItem("infoForTicket"))),
      })
        .then((response) => {
          response.json().then((response) => {
            this.answerInfoBuy = response.info;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async goToMainPage() {
      window.location = "https://theatreofplaywrights.com/";
    },

    whichIsShowStatus() {
      // Повертає true якщо success
      // Повертає false якщо error
      if (this.dataAndSign.status == "success") {
        this.postDataTicket(1);
        // .then(() => setTimeout(this.goToMainPage, 3000));
        return true;
      } else if (this.dataAndSign.status == "error") {
        this.postDataTicket(0);
        return false;
      } else {
        return false;
      }
    },

    async whichIsShowStatusAsync() {
      // Повертає true якщо success
      // Повертає false якщо error
      // Асинхронна
      // Викликається якщо був повторний запит

      if (this.dataAndSign.status == "success") {
        this.postDataTicket().then(() => {
          localStorage.removeItem("infoForTicket");
        });
        return true;
      } else if (this.dataAndSign.status == "error") {
        return false;
      }
    },
  },
};
</script>
    <style scoped>
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
    