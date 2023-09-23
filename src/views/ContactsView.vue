<template>
  <div class="about">
    <div>
      <HeaderComponent />
    </div>
    <div class="d_flex_row padding_tb_15_em">
      <div id="map" class="mapps"></div>
      <div class="d_flex_column">
        <div class="upper_case open_sans name_dep t_left p_1_px pad_b1em">контакти</div>
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
        <div class="d_flex_column j_content_center">
          <div v-for="soc in social" :key="soc.id" class="w_50">
            <DesktopSocialComponent :socLink="soc.link" :socName="soc.name" :color="true" />
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
    this.getContact().then(() => this.setMapPoint());
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
      }).setView(this.coords, 16);
      L.marker(this.coords).addTo(map);
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
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
}
.mapps {
  height: 500px;
  width: 600px;
  margin: 0 2em 0 2em;
}

.contacts_font {
  font-size: 22px;
  text-align: left;
}
.m_left_5em {
  margin: 0 5em;
}
</style>
      