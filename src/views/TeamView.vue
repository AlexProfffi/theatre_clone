<template>
  <div class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="padding_tb_2em">
      <ListTeamComponentVue :teamPart="slug" />
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
import ListTeamComponentVue from "@/components/listTeam/ListTeamComponent.vue";

export default {
  name: "TeamView",
  props: {
    slug: String,
  },
  components: {
    HeaderComponent,
    FooterComponent,
    ListTeamComponentVue,
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {
    this.setTitle();
  },
  methods: {
    async setTitle() {
      // Встановлює назву сторінки
      switch(this.slug) {
        case "/authors":
        document.querySelector("title").innerHTML = "Автори";
        break;
        case "/actors":
        document.querySelector("title").innerHTML = "Актори";
        break;
        case "/directors":
        document.querySelector("title").innerHTML = "Режисери";
        break;
        default:
        document.querySelector("title").innerHTML = "Основна команда";
        break;
      }
      
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
        