<template>
  <div
    v-if="!isMobile"
    class="footer_desktop d_flex_row j_content_space_evently footer_bg height_443"
  >
    <div
      v-for="contact in contacts"
      :key="contact.id"
      class="d_flex_row j_content_space_around flex_grow_2 font_footer_color"
    >
      <div class="flex_grow_1 d_flex_row j_content_space_around">
        <DesktopPictureWriters :picture="contact.photo_our_playwriters" />
      </div>
      <div class="flex_grow_2 d_flex_row">
        <DesktopAddrComponent
          :addr="contact.address"
          :phone="contact.phone"
          :email="contact.e_mail"
        />
      </div>
    </div>
    <div class="d_flex_column j_content_center flex_grow_1">
      <div v-for="soc in social" :key="soc.id" class="w_50">
        <DesktopSocialComponent :socLink="soc.link" :socName="soc.name" />
      </div>
    </div>
  </div>
</template>
  <script>
import DesktopAddrComponent from "@/components/footer/DesktopAddrComponent.vue";
import DesktopPictureWriters from "@/components/footer/DesktopPictureWriters.vue";
import DesktopSocialComponent from "@/components/footer/DesktopSocialComponent.vue";

export default {
  name: "FooterComponent",
  components: {
    DesktopAddrComponent,
    DesktopPictureWriters,
    DesktopSocialComponent,
  },
  data() {
    return {
      isMobile: false,
      contacts: null,
      social: null,
    };
  },
  created() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      // Контакти
      this.contacts = await fetch(
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
  },
};
</script>
<style scoped>
.footer_bg {
  background-color: #212121;
}
.font_footer_color {
  color: #f4fbff;
}

.height_443 {
  height: 443px;
}

</style>