<template>
    <div>
      {{ formatDate(dateTime, timeBool) }}
    </div>
  </template>
      <script>
  export default {
    name: "DateComponent",
    props: {
      dateTime: String,
      timeBool: Boolean
    },
    components: {},
    data() {
      return {
        comments: null,
      };
    },
    created() {
    },
    methods: {
        formatDate(dates, time = false) {
      // Змінює '-' на '|'
      if (!time) {
        return String(dates).replace(/[-]/g, "|");
      }
      let onlyDate = String(dates).split("T")[0].replace(/[-]/g, "|");
      let onlyTime = String(dates).split("T")[1].replace(/[-]/g, "|").split(".")[0]
      return `${onlyDate} ${onlyTime}`;
    },
    },
  };
  </script>
    <style scoped>
  @media screen and (max-width: 1000px) {
  }
  </style>