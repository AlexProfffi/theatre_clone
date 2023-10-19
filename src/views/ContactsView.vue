<template>
  <div class="about">
    <div>
      <HeaderComponent />
    </div>
    <div
      id="map_and_contact"
      class="d_flex_row padding_tb_15_em opacity_05 main_content"
    >
      <div id="map" class="mapps margin_both_auto" style="z-index: 10;"></div>
      <div id="contact_current" class="d_flex_column margin_both_auto">
        <div
          id="word_cnt"
          class="upper_case open_sans name_dep t_left p_1_px pad_b1em"
        >
          контакти
        </div>
        <div
          v-for="cnt in contact"
          :key="cnt.id"
          class="d_flex_row j_content_center pad_top"
        >
          <div class="d_flex_column f_source_sans contacts_font p_1_px">
            <DesktopAddrComponent
              :addr="cnt.address"
              :phone="cnt.phone"
              :email="cnt.e_mail"
            />
          </div>
        </div>
        <div id="social_lnk" class="d_flex_column j_content_center p_1_px">
          <div v-for="soc in social" :key="soc.id" class="w_50">
            <DesktopSocialComponent
              :socLink="soc.link"
              :socName="soc.name"
              :color="true"
              :left="true"
            />
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
import DesktopAddrComponent from "@/components/footer/DesktopAddrComponent.vue";
import DesktopSocialComponent from "@/components/footer/DesktopSocialComponent.vue";

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "ContactsView",
  components: {
    HeaderComponent,
    FooterComponent,
    DesktopAddrComponent,
    DesktopSocialComponent,
    // SpinerComponent,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: true,
      contact: [],
      social: [],
      coords: [50.46033845344907, 30.521947026212363],
    };
  },
  beforeCreate() {},
  created() {
    this.getContact()
      .then(() => this.setMapPoint())
      .then(() => {
        this.showContent();
      });
    this.setTitle();
  },
  methods: {
    async setMapPoint() {
      let L = window.L;
      var tileLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: false,
      });

      let map = L.map("map", {
        zoomControl: true,
        layers: [tileLayer],
        maxZoom: 18,
        minZoom: 6,
        scrollWheelZoom: false,
      }).setView([this.contact[0].longitude, this.contact[0].latitude], 16);
      L.marker([this.contact[0].longitude, this.contact[0].latitude]).addTo(
        map
      );
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

    async getContact() {
      this.contact = await fetch(
        `${this.$store.getters.getServerUrl}/our_contacts/`
      )
        .then((response) => response.json())
        .then(
          (this.social = await fetch(
            `${this.$store.getters.getServerUrl}/social_links/`
          ).then((response) => response.json()))
        )
        .catch((error) => {
          console.log(error);
        });
    },
    separatedString(str) {
      // Перенос строки
      let list = String(str).split(" ");
      let list_1 = list.slice(0, list.length - 3);
      let list_2 = list.slice(list_1.length, list.length);
      let newStrList = [];
      newStrList.push({ value: 0, text: list_1.join(" ") });
      newStrList.push({ value: 1, text: list_2.join(" ") });
      return newStrList;
    },
    setTitle() {
      // Встановлює назву сторінки
      document.querySelector("title").innerHTML = "Контакти";
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
  #map_and_contact {
    flex-direction: column;
    padding-top: 20px;
  }
  #word_cnt {
    display: none;
  }
  #map {
    width: 90%;
  }
}
.mapps {
  height: 500px;
  width: 800px;
}

.contacts_font {
  font-size: 22px;
  text-align: left;
}
.m_left_5em {
  margin: 0 5em;
}
</style>
      