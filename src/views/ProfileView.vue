<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_column">
      <h2>Мій профіль</h2>
      <div class="d_flex_column">
        <div class="d_flex_column">
          <div class="d_flex_row j_content_start" id="my_tct">
            <h4>Мої квитки:</h4>
          </div>
          <div class="d_flex_row j_content_start">
            <ul>
              <li
                class="col_red buyed_tct"
                v-for="ub in user.buyuser"
                :key="ub.id"
              >
                {{ ub.for_play }} / {{ ub.date_time_play }} / {{ ub.order_id }};
              </li>
            </ul>
          </div>
        </div>
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
  name: "OfferView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isMobile: false,
      user: {},
      token: localStorage.getItem("token"),
    };
  },
  created() {
    this.setTitle();
    this.getDataUser().then(() => {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ username: this.user.username, email: this.user.email })
      );
    });
    // this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      let L = window.L;
      console.log(L.locate());
    },

    getHeaders(method, token, body = null) {
      // Return headers with token for fetch
      if (body) {
        let headers = {
          method: method,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
          body: body,
        };
        return headers;
      } else {
        let headers = {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        };
        return headers;
      }
    },

    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Кабінет";
    },

    async getDataUser() {
      //  Get data for current user
      if (localStorage.getItem("token")) {
        this.user = await fetch(
          `${this.$store.getters.getServerUrl}/user_profile/`,
          this.getHeaders("get", this.token.replace(/"/gi, ""))
        )
          .then((response) => response.json())

          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$router.push({ name: "Auth" });
        // return
      }
    },
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
  #my_tct {
    justify-content: center;
  }
  .buyed_tct {
    font-size: 0.8em;
  }
}
.home_play {
  display: flex;
  flex-direction: column;
}
.col_red {
  color: rgb(255, 96, 96);
}
</style>
    