<template>
  <div id="detail" v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div>
      <div v-for="pl in playList" :key="pl.id">
        <PhotoPlayComponent
          :photo="pl.photo"
          :photo_2="pl.photo_2"
          :photo_3="pl.photo_3"
          :photo_4="pl.photo_4"
          :photo_5="pl.photo_5"
          :photo_6="pl.photo_6"
          :photo_7="pl.photo_7"
          :photo_8="pl.photo_8"
          :photo_9="pl.photo_9"
          :photo_10="pl.photo_10"
        />
        <h3>
          {{ pl.name }}
        </h3>
      </div>

      <h3 v-for="link in linkBuyTicketList" :key="link.id_link">
        <a :href="link.link">Оплата</a>
      </h3>
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
import PhotoPlayComponent from "@/components/photoPlay/PhotoPlayComponent.vue";

export default {
  name: "PlayDetailView",
  components: {
    HeaderComponent,
    FooterComponent,
    PhotoPlayComponent,
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
    