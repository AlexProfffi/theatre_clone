<template>
  <div v-if="!isMobile">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active" v-if="photo != null">
          <img
            :src="repalcer(photo, '')"
            :alt="photo"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_2 != null">
          <img
            :src="repalcer(photo_2, '')"
            :alt="photo_2"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_3 != null">
          <img
            :src="repalcer(photo_3, '')"
            :alt="photo_3"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_4 != null">
          <img
            :src="repalcer(photo_4, '')"
            :alt="photo_4"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_5 != null">
          <img
            :src="repalcer(photo_5, '')"
            :alt="photo_5"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_6 != null">
          <img
            :src="repalcer(photo_6, '')"
            :alt="photo_6"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_7 != null">
          <img
            :src="repalcer(photo_7, '')"
            :alt="photo_7"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_8 != null">
          <img
            :src="repalcer(photo_8, '')"
            :alt="photo_8"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_9 != null">
          <img
            :src="repalcer(photo_9, '')"
            :alt="photo_9"
            class="d-block img_size img_contain"
          />
        </div>
        <div class="carousel-item" v-if="photo_10 != null">
          <img
            :src="repalcer(photo_10, '')"
            :alt="photo_10"
            class="d-block img_size img_contain"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        @click="renderNaigationPhotoLeft()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        @click="renderNaigationPhotoRight()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
    <div id="naviRect" class="d_flex_row j_content_center relative_position">
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
  created() {},
  methods: {
    renderNaigationPhotoRight() {
      // Знаходить ID поточної фотографії
      let rectangles = document.querySelector("#naviRect");
      let ph = document.querySelectorAll(".carousel-item");
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
      // Змінює колір квадратика під фотографіями
      // В залежності від поточної фотографії
      if (rectangles.childNodes.length > 1 + 2) {
        if (id_ph === rectangles.childNodes.length - 2) {
          rectangles.childNodes[1].firstChild.classList.add("rectangle_black");
          rectangles.childNodes[
            rectangles.childNodes.length - 2
          ].firstChild.classList.remove("rectangle_black");
        } else {
          rectangles.childNodes[id_ph + 1].firstChild.classList.add(
            "rectangle_black"
          );
          rectangles.childNodes[id_ph].firstChild.classList.remove(
            "rectangle_black"
          );
          rectangles.childNodes[id_ph].firstChild.classList.add("rectangle");
        }
      }
    },
    renderNaigationPhotoLeft() {
      // Знаходить ID поточної фотографії
      let rectangles = document.querySelector("#naviRect");
      let ph = document.querySelectorAll(".carousel-item");
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

      // Змінює колір квадратика під фотографіями
      // В залежності від поточної фотографії
      if (rectangles.childNodes.length > 1 + 2) {
        if (id_ph === rectangles.childNodes.length - 2) {
          rectangles.childNodes[
            rectangles.childNodes.length - 2
          ].firstChild.classList.add("rectangle_black");
          rectangles.childNodes[1].firstChild.classList.remove(
            "rectangle_black"
          );
          rectangles.childNodes[1].firstChild.classList.add("rectangle");
        } else {
          rectangles.childNodes[id_ph].firstChild.classList.add(
            "rectangle_black"
          );
          rectangles.childNodes[id_ph + 1].firstChild.classList.remove(
            "rectangle_black"
          );
        }
      }
    },
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return "http://theatreofplaywrightsapi.space:8080" + str.replace(changeble, "");
      }
      return str;
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
      let cnt = [];
      for (let x = 0; x < this.photoList.length; x++) {
        if (this.photoList[x] !== null) {
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
.img_size {
  height: 750px;
  width: 100%;
}
.img_contain {
  object-fit: contain;
}

.relative_position {
  position: absolute;
  left: 50%;
  top: 117%;
  z-index: 99;
}
</style>