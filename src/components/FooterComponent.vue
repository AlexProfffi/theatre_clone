<template>
  <div class="d_flex_column footer_bg">
    <div
      v-if="!isMobile"
      id="wrap_footer"
      class="footer_desktop d_flex_row j_content_space_evently height_443"
    >
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="d_flex_row j_content_space_around flex_grow_2 font_footer_color wrap_contact_block pad_top_1000"
      >
        <div class="flex_grow_1 d_flex_row j_content_space_around">
          <DesktopPictureWriters :picture="contact.photo_our_playwriters" />
        </div>
        <div class="flex_grow_2 d_flex_row contact_address">
          <DesktopAddrComponent
            :addr="contact.address"
            :phone="contact.phone"
            :email="contact.e_mail"
          />
        </div>
      </div>
      <div class="d_flex_column j_content_center flex_grow_1" id="socials">
        <div v-for="soc in social" :key="soc.id" class="w_50">
          <DesktopSocialComponent
            :socLink="soc.link"
            :socName="soc.name"
            :color="false"
            :left="false"
          />
        </div>
      </div>
    </div>
    <div class="footer_bg pad_1em">
      <OffertsComponent />
    </div>

    <div class="dev_tools d_flex_row j_content_center pad_b1em">
      <div class="pad_both_7">
        <a href="https://vuejs.org/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Vue"
            role="img"
            viewBox="0 0 512 512"
            width="20px"
            height="20px"
            fill="black"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
              <path
                fill="#42b883"
                d="m64 140h148l44 77l44-77h148L256 473"
              ></path>
              <path
                fill="#35495e"
                d="m141 140h71l44 77l44-77h71L256 340"
              ></path>
            </g>
          </svg>
        </a>
      </div>
      <div class="pad_both_7">
        <a href="https://www.djangoproject.com/">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <rect
                  fill="#092E20"
                  x="0"
                  y="0"
                  width="256"
                  height="256"
                  rx="28"
                ></rect>
                <path
                  d="M186.377012,94.197636 L186.377012,160.424478 C186.377012,183.243286 184.707519,194.187745 179.699037,203.649406 C175.060358,212.741266 168.937684,218.490548 156.323731,224.798721 L129.794937,212.183571 C142.410087,206.247593 148.531564,201.05481 152.427049,193.074749 C156.509231,184.91278 157.808923,175.451119 157.808923,150.593015 L157.808923,94.197636 L186.377012,94.197636 Z M140.928486,50.0787207 L140.928486,182.316986 C126.272844,185.099476 115.512688,186.212472 103.826231,186.212472 C68.9487718,186.212472 50.7686431,170.445031 50.7686431,140.205054 C50.7686431,111.079269 70.0629644,92.1583404 99.9295492,92.1583404 C104.567032,92.1583404 108.091519,92.5281423 112.359199,93.6411381 L112.359199,50.0787207 L140.928486,50.0787207 Z M102.713236,115.160254 C88.243093,115.160254 79.8944275,124.065418 79.8944275,139.647359 C79.8944275,154.860696 87.8720944,163.208164 102.527736,163.208164 C105.680028,163.208164 108.278215,163.022665 112.359199,162.467364 L112.359199,116.643052 C109.020212,115.531253 106.237722,115.160254 102.713236,115.160254 Z M186.377012,50.2307105 L186.377012,79.5419941 L157.808923,79.5419941 L157.808923,50.2307105 L186.377012,50.2307105 Z"
                  fill="#FFFFFD"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </div>
      <div class="pad_both_7">
        <a href="https://www.getbootstrap.com/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-bootstrap"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.062 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377H6.375z"
            />
            <path
              d="M0 4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4zm4-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4z"
            />
          </svg>
        </a>
      </div>
    </div>
    <div>
      <a class="font_1 color_white" :href="this.publicPath + 'sitemap/sitemap.xml'">Карта сайту</a>
    </div>
    <div class="t_left" style="color: #212121">Vova Savin</div>
  </div>
</template>
  <script>
import DesktopAddrComponent from "@/components/footer/DesktopAddrComponent.vue";
import DesktopPictureWriters from "@/components/footer/DesktopPictureWriters.vue";
import DesktopSocialComponent from "@/components/footer/DesktopSocialComponent.vue";

import OffertsComponent from "@/components/offerts/OffertsComponent.vue";

export default {
  name: "FooterComponent",
  components: {
    DesktopAddrComponent,
    DesktopPictureWriters,
    DesktopSocialComponent,
    OffertsComponent,
  },
  data() {
    return {
      isMobile: false,
      contacts: null,
      social: null,
      publicPath: process.env.BASE_URL,
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
@media screen and (max-width: 1000px) {
  #wrap_footer {
    flex-direction: column;
    height: 650px;
  }

  .wrap_contact_block {
    flex-direction: column;
    justify-content: center;
  }
  .contact_address {
    justify-content: center;
  }

  .pad_top_1000 {
    padding-top: 7%;
  }
}
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