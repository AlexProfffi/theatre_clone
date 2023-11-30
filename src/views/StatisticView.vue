<template>
  <div>
    <div>
      <HeaderComponent />
    </div>
    <div v-for="st in statistic" :key="st.id">

      {{ st }}
      <hr>
    </div>
    <div>
      <FooterComponent />
    </div>
  </div>
</template>
    <script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "StatisticView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      statistic: null,
      email: localStorage.getItem("eml"),
    };
  },
  created() {
    this.getStatistic();
  },
  methods: {
    async getStatistic() {
      // Контакти
      if (this.email) {
        this.statistic = await fetch(
          `${this.$store.getters.getServerUrl}/statistic/?q=${this.email}`
        )
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
}
</style>