<template>
  <div class="d_flex_column">
    <div v-for="prs in personals" :key="prs.id">
      {{ prs.name }} {{ prs.surname }}
    </div>
  </div>
</template>
          
  <script>
// @ is an alias to /src

export default {
  name: "ListTeamComponent",
  props: {
    teamPart: String,
  },
  components: {},
  data() {
    return {
      personals: [],
    };
  },
  beforeCreate() {},
  created() {
    this.getPersonal();
  },
  methods: {
    async getPersonal() {
      this.personals = await fetch(
        `${this.$store.getters.getServerUrl}/staff_separated${this.teamPart}/`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1330px) {
}

@media screen and (max-width: 1000px) {
}
@media screen and (max-width: 700px) {
}
</style>
          