<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-body d_flex_row j_content_center">
        <slot name="body ">
          <div class="d_flex_column j_content_center p_0 img_modal_low_1000">
            <div class="d_flex_row j_content_center">
              <div class="d_flex_row j_content_center div_v_html">
                <div
                  class="t_justify pad_both_7 bg_white_custom d_flex_row j_content_center div_v_html f_weight_bold f_size_32"
                >
                  {{ name }}
                </div>
              </div>
            </div>

            <div class="d_flex_row j_content_center">
              <div class="d_flex_row j_content_center bg_white_custom w_100">
                <img
                  class="img_modal_low_1000 img_modal_w"
                  :src="repalcer(picture, '')"
                  :alt="picture"
                />
              </div>
            </div>
            <div class="d_flex_row j_content_center div_v_html">
              <div
                class="t_justify pad_both_7 bg_white_custom d_flex_column j_content_center f_size_15 scrolling"
                v-html="description"
              ></div>
            </div>
          </div>
        </slot>
      </div>
      <div class="d_flex_column j_content_start p_40px close_low_1000">
        <slot name="footer">
          <span class="modal-default-button c_pointer" @click="$emit('close')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
              />
            </svg>
          </span>
        </slot>
      </div>
    </div>
  </Transition>
</template>
  
    <script>
export default {
  name: "ModalShowPicture",
  props: {
    picture: String,
    name: String,
    description: String,

    show: Boolean,
  },
  components: {},
  data() {
    return {
      isMobile: false,
    };
  },
  created() {},
  methods: {
    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443" + str;
    },

    
  },
};
</script>
    <style scoped>
@media screen and (max-width: 1000px) {
  

  .modal-body {
    width: 100% !important;
  }
  .p_0 {
    padding: 0 !important;
  }

  .modal-mask {
    flex-direction: column-reverse !important;
  }

  .close_low_1000 {
    flex-direction: row;
    justify-content: end;
  }
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  margin: 2em auto;
  height: 0;
  width: 0;
  /* padding: 20px 30px; */
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 0;
}

.modal-default-button {
  float: right;
  color: rgba(255, 255, 255, 0.663);
}
.modal-default-button:hover {
  color: rgb(197, 197, 197);
}

/*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.scrolling {
  overflow: auto;
  scrollbar-color: #f3f3f3 #3e3e3e;
  scrollbar-width: thin;
  max-height: 300px;
}

.div_v_html {
  width: 100%;
}

.img_modal_w {
  max-height: max-content;
  max-width: max-content;
}

</style>