<template>

    <div class="lds-ring">
        <div class="c_gr"></div>
        <div class="c_gr"></div>
        <div class="c_gr"></div>
        <div class="c_gr"></div>
      </div>
      

</template>

<script>
export default {
  name: "SpinerComponent",
  props: {
    // textUnderRing: String,
  },
  components: {},
  data() {
    return {
      isMobile: false,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  #spinner_is {
    margin-top: 10em;
  }
}


</style>