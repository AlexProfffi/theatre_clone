<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    {{ currentOrderId }}
    <div v-if="showSpiner" id="spinner_is">
      <SpinerComponent />
      <h3 class="pad_top" id="label_spiner">Виконується оплата...</h3>
    </div>

    <div v-else>
      <h2 class="ptb_40" v-if="whichIsShowStatus(dataAndSign.status)">
        Платіж успішний!
      </h2>
      <h2 class="ptb_40" v-else>Платіж невдалий!</h2>
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
    this.getDataAndSign().then(() => {
      this.showSpiner = false;
    });
  },
  methods: {
    async getDataAndSign() {
      this.dataAndSign = await fetch(
        `${this.$store.getters.getServerUrl}/show_status_pay/${this.currentOrderId.order_id}/`
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
        body: JSON.stringify(this.currentOrderId),
      }).catch((error) => {
        console.log(error);
      });
    },

    whichIsShowStatus() {
      // Повертає true якщо success
      // Повертає false якщо error

      if (this.dataAndSign.status == "success") {
        this.postDataTicket();
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
    