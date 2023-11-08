<template>
  <div class="d_flex_column">
    <div class="d_flex_column"></div>
  </div>
</template>
    <script>
export default {
  name: "CommentsComponent",
  props: {
    dpid: String,
  },
  components: {},
  data() {
    return {
      comments: null,
    };
  },
  created() {
    this.getContacts();
  },
  methods: {
    async getComments() {
      // Коментарі
      this.comments = await fetch(
        `${this.$store.getters.getServerUrl}/comments/${this.dpid}/`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
}
</style>