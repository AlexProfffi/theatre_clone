<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="pad_b6em">
      <div v-for="ins in instructions" :key="ins.id">
        <h3 class="t_left" v-html="ins.name"></h3>
        <div class="t_left" v-html="ins.description"></div>
        <hr />
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

export default {
  name: "InstructionsView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      instructions: null,
    };
  },
  created() {
    this.setTitle();
    localStorage.removeItem("youAuth");
    this.getInstructions();
  },
  methods: {
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Інструкції";
    },

    async getInstructions() {
      this.instructions = await fetch(
        `${this.$store.getters.getServerUrl}/instructions/`
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
</style>
    