<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <div>
        <HeaderComponent />
      </div>
      
      <div v-if="spiner">
        <SpinerComponent />
      </div>
      <div v-else class="d_flex_column">
        <h2>Мій профіль</h2>
        <div class="d_flex_column">
          <div class="d_flex_column">
            <div class="d_flex_row j_content_start" id="my_tct">
              <h4>Відвідані вистави:</h4>
            </div>
            <div class="d_flex_row j_content_start">
              <ul>
                <li
                  class="col_red buyed_tct"
                  v-for="ub in user.buyuser"
                  :key="ub.id"
                >
                  {{ ub.for_play }} / {{ ub.date_time_play }};
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
  </div>
</template>
    
    <script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "OfferView",
  components: {
    HeaderComponent,
    FooterComponent,
    SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      user: {},
      token: localStorage.getItem("token"),
      longitude: null,
      latitude: null,
      spiner: true,
    };
  },
  created() {
    this.setTitle();
    this.getDataUser()
      .then(() => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            username: this.user.username,
            email: this.user.email,
          })
        );
      })
      .then(() => {
        this.getLocationGoogle().then(() => {
          setTimeout(this.setUserActivity, 7000);
        });
      });
  },
  mounted() {
    // Получене карты
    // Получение координат пользователя
  },
  methods: {
    getUserLocation() {
      let L = window.L;
      console.log(L.locate());
    },

    async getLocationGoogle() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.latitude = pos.lat;
          this.longitude = pos.lng;
        });
      }
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

    async setUserActivity() {
      // Створює запис при вході користувача
      await fetch(`${this.$store.getters.getServerUrl}/user_activity_record/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.user.email,
          longitude: this.longitude,
          latitude: this.latitude,
        }),
      }).then(() => {
        this.spiner = false;
      });
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
    