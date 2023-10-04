<template>
  <div class="g_login">
    <img class="c_pointer btn_g_login" src="../../../public/btn_google_signin_dark_normal_web@2x.png" @click="openGoogleLoginPage()" />
  </div>
</template>
      
    <script>
// @ is an alias to /src
// import HeaderComponent from "@/components/HeaderComponent.vue";
// import FooterComponent from "@/components/FooterComponent.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "GLoginComponent",
  components: {
    // SpinerComponent,
  },
  data() {
    return {};
  },
  beforeCreate() {},
  created() {},
  methods: {
    openGoogleLoginPage() {
      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    //   const redirectUri = "user_profile/";

      const scope = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ].join(" ");

      const params = {
        response_type: "code",
        client_id:
          "348604724151-q09kbikv82vmlfhkail67lgv233ht0m8.apps.googleusercontent.com",
        redirect_uri: "http://127.0.0.1:8000/api/v1/google_login/",
        // redirect_uri: `${this.$store.getters.getServerUrl}/google_login/`,
        prompt: "select_account",
        access_type: "offline",
        scope,
        state: "pass-through value"
      };

      const urlParams = new URLSearchParams(params).toString();

      window.location = `${googleAuthUrl}?${urlParams}`;
      [];
    },
  },
};
</script>
      <style scoped>
@media screen and (max-width: 1000px) {
}


.btn_g_login {
    width: 200px;

}

</style>
          