<template>
  <div class="d_flex_row j_content_center padding_tb_2em">
    <ul
      id="navs"
      class="d_flex_row j_content_space_between upper_case none_decor_ul_no_pad w_30 f_size_15 open_sans w_max_ul"
    >
      <li
        v-for="navig in myProfileNavigation()"
        :key="navig.value"
        :id="navig.idEl"
        class="c_pointer nav_link_color"
        @click="getPathOnProfile(navig.value)"
      >
        {{ navig.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProfileNavigatorComponent",
  props: { bools: Array },
  components: {},
  data() {
    return {
      boolsG: this.bools,
    };
  },
  created() {},
  methods: {
    getPathOnProfile(ids) {
      // Отримує дані по кліку на навігацію
      for (let x = 0; x < this.boolsG.length; x++) {
        ids === x ? (this.boolsG[x] = true) : (this.boolsG[x] = false);
      }
    },

    myProfileNavigation() {
      // Навігація профілю
      let navName = ["відвідані вистави", "коментарі", "особисті дані"];
      let dataNav = [];
      for (let x = 0; x < navName.length; x++) {
        dataNav.push({ value: x, text: navName[x], idEl: "nav_" + String(x) });
      }
      return dataNav;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1000px) {
  #navs {
    padding: 0 5px;
    font-size: 12px;
  }
  .w_max_ul {
    width: 100%;
  }
}

</style>