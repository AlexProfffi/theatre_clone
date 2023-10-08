<template>
  <div v-if="!isMobile" class="d_flex_column j_content_center">
    <div class="d_flex_row p_tb_5 open_sans font_size_08">
      <div @click="clickCallPhone(phone)">
        {{ phone }}
      </div>
    </div>

    <div class="d_flex_row p_tb_5 open_sans font_size_08">
      <div>
        {{ email }}
      </div>
    </div>

    <div class="d_flex_column p_tb_5">
      <div
        v-for="str in separatedString(addr)"
        :key="str.value"
        class="d_flex_row open_sans f_semi_bold_size_1 upper_case"
      >
        <div>
          {{ str.text }}
        </div>
      </div>
    </div>
  </div>
</template>
      <script>
export default {
  name: "DesktopAddrComponent",
  props: {
    addr: String,
    phone: String,
    email: String,
  },
  components: {},
  data() {
    return {
      isMobile: false,
    };
  },
  created() {},
  methods: {
    separatedString(str) {
      // Перенос строки
      let list = String(str).split(" ");
      let list_1 = list.slice(0, list.length - 3);
      let list_2 = list.slice(list_1.length, list.length);
      let newStrList = [];
      newStrList.push({ value: 0, text: list_1.join(" ") });
      newStrList.push({ value: 1, text: list_2.join(" ") });
      return newStrList;
    },

    clickCallPhone(phone) {
      // Call phone
      window.location.href = "tel://" + phone;
    },
    // phoneSeparator(phone) {
    //     // Розділювач номера телефону

    // }
  },
};
</script>
<style scoped>
.f_semi_bold_size_1 {
  font-weight: 500;
  font-size: 1em;
}
.font_size_08 {
  font-size: 0.8em;
}
</style>