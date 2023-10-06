<template>
  <div class="horizontal_line_hover"></div>
</template>

<script>
export default {
  name: "AnimatedUnderlineComponent",
  components: {},
  data() {
    return {
      intrval: null,
    };
  },
  created() {
    this.eventScrollClick();
  },
  methods: {
    
  },
};
