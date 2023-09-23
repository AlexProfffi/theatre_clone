<template>
  <div class="d_flex_column  margin_both_2">
    <div class="d_flex_row j_content_start">
      <h2 class="c_pointer">
        {{ under_name }}
      </h2>
    </div>
    <div>
      <p class="t_justify font_1">
        {{ description }}
      </p>
    </div>
    <hr>
  </div>
</template>
  
  <script>
// @ is an alias to /src

// import SpinerComponent from "@/components/helpers/SpinerComponent.vue";

export default {
  name: "AboutUsDescriptionComponent",
  props: {
    under_name: String,
    description: String,
  },
  components: {},

  data() {
    return {
    };
  },
  beforeCreate() {},
  created() {
  },
  methods: {
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
}
</style>
      