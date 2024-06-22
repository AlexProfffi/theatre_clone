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
      <div v-if="checkStatus">
        <h2 class="ptb_40">Платіж успішний!</h2>
        <div class="d_flex_column">
          <h3>
            {{ dataTxt.numberTextOrderUa }}
          </h3>
          <h3>{{ answerInfoBuyNumberOrder }}</h3>
        </div>
        <div v-if="!innerSpiner" class="t_justify pad_1em">
          {{ answerInfoBuy }}
        </div>
      </div>

      <div v-else>
        <h2 class="ptb_40">Платіж невдалий!</h2>
        <div v-if="!innerSpiner" class="t_justify pad_1em">
          {{ answerInfoBuy }}
        </div>
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
      innerSpiner: true,
      dataAndSign: {},
      currentOrderId: JSON.parse(localStorage.getItem("infoForTicket")),
      // currentPlaces: JSON.parse(localStorage.getItem("infoForPlace")),
      textRing: "Виконується оплата...",
      answerInfoBuy: null,
      answerInfoBuyNumberOrder: null,
      checkStatus: false,
      numStatus: 0,
      dataTxt: {
        numberTextOrderUa:
          "Ваш номер замовлення(збережіть його до показу вистави):",
        numberTextOrderEn: "Your order number:",
      },
    };
  },
  beforeCreate() {},
  created() {
    if (JSON.parse(localStorage.getItem("infoForTicket")) != null) {
      this.getDataAndSign()
        .then(() => {
          this.showSpiner = false;
        })
        .then(() => this.whichIsShowStatus());
    } else {
      setTimeout(
        this.getDataAndSign().then(() => {
          this.showSpiner = false;
        }),
        2500
      )
        .then(() => {
          this.showSpiner = false;
        })
        .then(() => this.whichIsShowStatus());
    }
  },
  methods: {
    async setNewFormatPlaces() {
        if(localStorage.getItem("infoForPlace")) {
          let url = `https://theatreofplaywrightsapi.space:8443/api/v1/create_places/`;
        await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: localStorage.getItem("infoForPlace"),
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
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
          response
            .json()
            .then((response) => {
              this.answerInfoBuy = response.info;
              this.answerInfoBuyNumberOrder = response.number_order;
            })
            .then(() => {
              this.innerSpiner = false;
            })
            .then(() => this.setNewFormatPlaces())
        })
        .catch((error) => {
          console.log(error);
        });
    },

    

    async goToMainPage() {
      window.location = "https://theatreofplaywrights.com/";
    },

    async changeStatus(sts) {
      // Міняє статус
      if (sts == "success") {
        this.checkStatus = true;
        this.numStatus = 1;
      } else {
        this.checkStatus = false;
        this.numStatus = 0;
      }
    },

    async whichIsShowStatus() {
      // Повертає true якщо success
      // Повертає false якщо error
      this.changeStatus(this.dataAndSign.status).then(() =>
        this.postDataTicket(this.numStatus)
      );
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
    