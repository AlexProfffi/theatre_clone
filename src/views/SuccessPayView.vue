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
    };
  },
  beforeCreate() {},
  created() {
    if (JSON.parse(localStorage.getItem("infoForTicket")) != null) {
      console.log(
        "ORDER ID IF ",
        JSON.parse(localStorage.getItem("infoForTicket")).order_id
      );
      this.getDataAndSign().then(() => {
        this.showSpiner = false;
      });
    } else {
      console.log(
        "ORDER ID ELSE ",
        JSON.parse(localStorage.getItem("infoForTicket")).order_id
      );
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
      this.dataAndSign = await fetch(
        `${this.$store.getters.getServerUrl}/show_status_pay/${
          JSON.parse(localStorage.getItem("infoForTicket")).order_id
        }/`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    async postDataTicket() {
      // Post query on PurcachedTiket
      let url = `${this.$store.getters.getServerUrl}/create_purcached_ticket/`;
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(JSON.parse(localStorage.getItem("infoForTicket"))),
      }).catch((error) => {
        console.log(error);
      });
    },

    async goToMainPage() {
      window.location = "https://theatreofplaywrights.com/";
    },

    whichIsShowStatus() {
      // Повертає true якщо success
      // Повертає false якщо error
      console.log(
        "ORDER ID  whichIsShowStatus ",
        JSON.parse(localStorage.getItem("infoForTicket")).order_id
      );
      if (this.dataAndSign.status == "success") {
        this.postDataTicket()
          // .then(() => {
          //   localStorage.removeItem("infoForTicket");
          // })
          .then(() => setTimeout(this.goToMainPage, 3000));
        return true;
      } else if (this.dataAndSign.status == "error") {
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
    