<template>
  <div v-if="!isMobile">
    <div :id="'carouselExample' + String(ident)" class="carousel slide">
      <div class="carousel-inner">
        <div
          class="carousel-item active"
          v-if="photo != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="
              repalcer(
                photo,
                'https://theatreofplaywrightsapi.space:8443/image_theatre/'
              )
            "
            :alt="photo"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item active"
          v-else
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="
              repalcer(
                photo_2,
                'https://theatreofplaywrightsapi.space:8443/image_theatre/'
              )
            "
            :alt="photo_2"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_3 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="
              repalcer(
                photo_3,
                'https://theatreofplaywrightsapi.space:8443/image_theatre/'
              )
            "
            :alt="photo_3"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_4 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_4, '')"
            :alt="photo_4"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_5 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_5, '')"
            :alt="photo_5"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_6 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_6, '')"
            :alt="photo_6"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_7 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_7, '')"
            :alt="photo_7"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_8 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_8, '')"
            :alt="photo_8"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_9 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_9, '')"
            :alt="photo_9"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
        <div
          class="carousel-item"
          v-if="photo_10 != ''"
          :class="'item_for_r' + String(ident)"
        >
          <img
            :src="repalcer(photo_10, '')"
            :alt="photo_10"
            class="d-block img_size img_contain image_on_carusel"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        :data-bs-target="'#carouselExample' + String(ident)"
        data-bs-slide="prev"
        @click="
          renderNaigationPhotoLeft(
            '.item_for_r' + String(ident),
            'naviRect' + String(ident)
          )
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="black"
          class="bi bi-arrow-left-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
          />
        </svg>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        :data-bs-target="'#carouselExample' + String(ident)"
        data-bs-slide="next"
        @click="
          renderNaigationPhotoRight(
            '.item_for_r' + String(ident),
            'naviRect' + String(ident)
          )
        "
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="black"
          class="bi bi-arrow-right-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
          />
        </svg>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div
      :id="'naviRect' + String(ident)"
      class="d_flex_row j_content_center relative_position navi_rect_cls"
    >
      <div v-for="rect in toRange()" :key="rect.value" class="">
        <RectangleComponent :isBlack="rect.isBlack" />
      </div>
    </div>
  </div>
</template>
<script>
import RectangleComponent from "../helpers/RectangleComponent.vue";
// @ is an alias to /src

export default {
  name: "PlaysListView",
  props: {
    photo: String,
    photo_2: String,
    photo_3: String,
    photo_4: String,
    photo_5: String,
    photo_6: String,
    photo_7: String,
    photo_8: String,
    photo_9: String,
    photo_10: String,
    ident: Number,
    domain: Boolean,
  },
  components: {
    RectangleComponent,
  },
  data() {
    return {
      isMobile: false,
      photoList: null,
      someData: null,
    };
  },
  created() {
    // console.log(
    //   document.querySelectorAll( '.item_for_r' + String(this.ident)),
    // );
  },
  methods: {
    renderNaigationPhotoRight(cls, idn) {
      // Знаходить ID поточної фотографії
      let rectangles = document.getElementById(idn);
      let ph = document.querySelectorAll(cls);
      let id_ph = 0;
      for (let x = 0; x < ph.length; x++) {
        for (let y = 0; y < ph[x].classList.length; y++) {
          if (ph[x].classList[y] == "active") {
            id_ph = x + 1; // Тому що на даному етапі x має значення поперднього фото
            if (x === ph.length) {
              id_ph = 0;
            }
          }
        }
      }
      let lenRect = rectangles.childNodes.length - 2;

      // Змінює колір квадратика під фотографіями
      // В залежності від поточної фотографії

      if (id_ph < lenRect) {
        rectangles.childNodes[id_ph + 1].firstChild.classList.add(
          "rectangle_black"
        );
        rectangles.childNodes[id_ph].firstChild.classList.remove(
          "rectangle_black"
        );
        rectangles.childNodes[id_ph].firstChild.classList.add("rectangle");
      } else if (id_ph == lenRect) {
        rectangles.childNodes[1].firstChild.classList.add("rectangle_black");
        rectangles.childNodes[lenRect].firstChild.classList.remove(
          "rectangle_black"
        );
      }
    },
    renderNaigationPhotoLeft(cls, idn) {
      // Знаходить ID поточної фотографії
      let rectangles = document.getElementById(idn);
      let ph = document.querySelectorAll(cls);
      let id_ph = 0;
      for (let x = 0; x < ph.length; x++) {
        for (let y = 0; y < ph[x].classList.length; y++) {
          if (ph[x].classList[y] == "active") {
            if (x === 0) {
              id_ph = rectangles.childNodes.length - 2;
            } else {
              id_ph = x;
            }
          }
        }
      }
      let lenRect = rectangles.childNodes.length - 2;

      // Змінює колір квадратика під фотографіями
      // В залежності від поточної фотографії

      if (id_ph < lenRect) {
        rectangles.childNodes[id_ph].firstChild.classList.add(
          "rectangle_black"
        );
        rectangles.childNodes[id_ph + 1].firstChild.classList.remove(
          "rectangle_black"
        );
        rectangles.childNodes[id_ph + 1].firstChild.classList.add("rectangle");
      } else if (id_ph == lenRect) {
        rectangles.childNodes[lenRect].firstChild.classList.add(
          "rectangle_black"
        );
        rectangles.childNodes[1].firstChild.classList.remove("rectangle_black");
        rectangles.childNodes[1].firstChild.classList.add("rectangle");
      }
    },
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443/image_theatre/" +
          str.replace(changeble, "")
        );
      }

      if (this.domain) {
        return str;
      }
      return "https://theatreofplaywrightsapi.space:8443/image_theatre/" + str;
    },
    getPhotoListCount() {
      // Формує та повертає к-ть фото
      this.photoList = [
        this.photo,
        this.photo_2,
        this.photo_3,
        this.photo_4,
        this.photo_5,
        this.photo_6,
        this.photo_7,
        this.photo_8,
        this.photo_9,
        this.photo_10,
      ];
      let cnt = 0;
      for (let x = 0; x < this.photoList.length; x++) {
        if (this.photoList[x] != "") {
          cnt++;
        }
      }
      return cnt;
    },
    toRange() {
      let range = this.getPhotoListCount();
      let newRange = [];
      for (let x = 0; x < range; x++) {
        newRange.push({ value: x, isBlack: x == 0 ? true : false });
      }

      return newRange;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 1550px) {
  /* #naviRect {
    top: 67rem;
  } */
}

@media screen and (max-width: 1000px) {
  #naviRect {
    left: 45%;
  }
  .navi_rect_cls {
    left: 45% !important;
  }

  .bi-arrow-right-circle {
    padding-left: 2px;
  }
  .bi-arrow-left-circle {
    padding-right: 2px;
  }

  .image_on_carusel {
    height: 225px !important;
  }
}
.img_size {
  height: 950px;
  width: 100%;
}
.img_contain {
  object-fit: cover;
}

.relative_position {
  position: absolute;
  left: 50%;
  /* top: 70rem; */
  z-index: 9;
}
.carousel-control-prev:hover, .carousel-control-next:hover {
  background-color: #f1f1f120;
}
</style>