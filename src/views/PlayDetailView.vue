<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <h3 v-for="pl in playList" :key="pl.id">
      {{ pl.name }}
    </h3>
    <h3 v-for="link in linkBuyTicketList" :key="link.id_link">
      <a  :href="link.link">Оплата</a>
    </h3>
  </div>
</template>
    
    <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "PlayDetailView",
  components: {
    HeaderComponent,
  },
  props: {
    id: String,
  },
  data() {
    return {
      isMobile: false,
      play: null,
      playList: [],
      linkBuyTicket: null,
      linkBuyTicketList: [],
      idPlay: this.id,
    };
  },
  created() {
    this.getPlay()
      .then(() => this.playList.push(this.play))
      .then(() => this.linkBuyTicketList.push(this.linkBuyTicket));
  },
  methods: {
    async getPlay() {
      this.play = await fetch(
        `${this.$store.getters.getServerUrl}/playss_all/${this.id}/`
      )
        .then((response) => response.json())

        .then(
          (this.linkBuyTicket = await fetch(
            `${this.$store.getters.getServerUrl}/buy_ticket/${this.id}/`
          ).then((response) => response.json()))
        )
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
    <style scoped>
.home_play {
  display: flex;
  flex-direction: column;
}
a:hover {
  color: green;
}
</style>
    