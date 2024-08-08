<template>
  <div v-if="!isMobile" class="home_play">
    <div>
      <div>
        <HeaderComponent />
      </div>
      {{ especialCoords.location }}

      <div v-if="spiner">
        <SpinerComponent />
      </div>
      <div v-else class="d_flex_column p_40px p_40px_profile">
        {{ crd }}
        <ProfileNavigatorComponent :bools="boolsC" />
        <div v-if="boolsC[0]" class="d_flex_column w_100">
          <MyPlaysComponent :myTickets="user.buyuser" />
        </div>
        <div v-else-if="boolsC[1]" class="d_flex_column">
          <MyCommentsComponent :myComments="comments" />
        </div>
        <div v-else-if="boolsC[2]" class="d_flex_column">
          <MyDataComponent :myData="user" />
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
import ProfileNavigatorComponent from "@/components/profile/ProfileNavigatorComponent.vue";
import MyPlaysComponent from "@/components/profile/MyPlaysComponent.vue";
import MyDataComponent from "@/components/profile/MyDataComponent.vue";
import MyCommentsComponent from "@/components/profile/MyCommentsComponent.vue";

export default {
  name: "ProfileView",
  components: {
    HeaderComponent,
    FooterComponent,
    SpinerComponent,
    ProfileNavigatorComponent,
    MyPlaysComponent,
    MyDataComponent,
    MyCommentsComponent,
  },
  data() {
    return {
      crd: null,
      isMobile: false,
      user: {},
      comments: [],
      token: localStorage.getItem("token"),
      longitude: null,
      latitude: null,
      spiner: true,
      boolsC: [false, true, false],
      especialCoords: {},
    };
  },
  created() {
    this.setTitle();
    this.getDataUser()
      .then(() => {
        this.getDataComments();
      })
      .then(() => {
        localStorage.setItem("eml", this.user.email);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            username: this.user.username,
            email: this.user.email,
            isStaff: this.user.is_staff,
          })
        );
      })
      .then(() => (this.spiner = false))
      .then(() => this.getLocationGoogle())
      .then(() => {
        if (this.user.email == "local@gmail.com") {
          this.getCoordsBigData().then(() =>
            this.setUserActivity(
              this.especialCoords.location.longitude,
              this.especialCoords.location.latitude
            )
          );
        } else {
          this.getLocationGoogle();
        }
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

    async getCoordsBigData() {
      let url =
        "https://api.bigdatacloud.net/data/ip-geolocation?key=bdc_3b6ef160aa8c40e98302d8ebeee7fb74";
      this.especialCoords = await fetch(url)
        .then((response) => response.json())

        .catch((error) => console.log(error));
    },

    async getLocationGoogle() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          localStorage.setItem("lat", position.coords.latitude);
          localStorage.setItem("lon", position.coords.longitude);

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

    async setUserActivity(lon, lat) {
      // Створює запис при вході користувача
      await fetch(`${this.$store.getters.getServerUrl}/user_activity_record/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.user.email,
          longitude: lon,
          latitude: lat,
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
    async getDataComments() {
      //  Get data for current comments
      if (localStorage.getItem("token")) {
        this.comments = await fetch(
          `${this.$store.getters.getServerUrl}/current_users_comments/`,
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
  .p_40px_profile {
    padding: 20px;
  }
}
.home_play {
  display: flex;
  flex-direction: column;
}
</style>
    