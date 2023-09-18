<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="d_flex_row j_content_center f_source_sans f_size_32">      
        </div>
        <div class="modal-body">
          <slot name="body">
            <div v-for="pd in dramaturgs" :key="pd.id" class="f_source_sans">
              <span class="f_weight_bold p_l_0_5">
                {{ pd.first_name }}
              </span>
              <span class="f_weight_bold p_l_0_3">
                {{ pd.last_name }} 
              </span>
            </div>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <span
              class="modal-default-button c_pointer"
              @click="$emit('close')"
            >Закрити</span>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

  <script>
  export default {
    name: "ModalInfo",
    props: {
      dramaturgs: Array,
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
      
    },
  };
  </script>
  <style scoped>
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
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}



.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  color: rgba(0, 0, 0, 0.663);
}
.modal-default-button:hover {
  color: black;
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
  </style>