<template>
  <div class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="opacity_05 main_content">
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
    this.showContent();
  },
  methods: {
    async setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = ``;
    },
    async showContent() {
      // Показує контент методом підвищення opacity
      let cnt = 0;

      this.intrval = setInterval(() => {
        document.querySelector(".main_content").style.opacity = String(cnt);
        if (cnt >= 1) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 0.1;
      }, 50);
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
        