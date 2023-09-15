<template>
  <div v-if="!isMobile">
    <div v-if="showSpiner">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 class="pad_top">
        Виконайте оплату...
      </h3>
    </div>
    <div id="detail" class="home_play" v-else>
      <div>
        <HeaderComponent />
      </div>
      <div>
        <div v-for="pl in playList" :key="pl.id">
          <PhotoPlayComponent
            :photo="pl.photo"
            :photo_2="pl.photo_2"
            :photo_3="pl.photo_3"
            :photo_4="pl.photo_4"
            :photo_5="pl.photo_5"
            :photo_6="pl.photo_6"
            :photo_7="pl.photo_7"
            :photo_8="pl.photo_8"
            :photo_9="pl.photo_9"
            :photo_10="pl.photo_10"
          />
          <h3>
            {{ pl.name }}
          </h3>
        </div>
        <div
          v-for="link in linkBuyTicketList"
          :key="link.id_link"
          class="d_flex_row j_content_center"
        >
          <form
            method="POST"
            @submit="purchasedTickets"
            class="d_flex_column w_30"
          >
            <div class="d_flex_row">
              <label for="email" class="font_1"
                >Введіть електронну пошту:</label
              >
            </div>
            <input
              class="input_field"
              type="email"
              id="email"
              placeholder="Email..."
              v-model="callBackData.email"
            />
            <button
              type="submit"
              class="payment_button f_source_sans nav_link_color f_size_32"
              @click="pay(link.link)"
            >
              Купити квиток
            </button>
          </form>
        </div>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  </div>
</template>
 
<script>
// @ is an alias to /src
// import lqPay from "../assets/main.js"
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import PhotoPlayComponent from "@/components/photoPlay/PhotoPlayComponent.vue";

export default {
  name: "PlayDetailView",
  components: {
    HeaderComponent,
    FooterComponent,
    PhotoPlayComponent,
  },
  props: {
    id: String,
  },
  data() {
    return {
      isMobile: false,
      showSpiner: false,
      play: null,
      playList: [],
      linkBuyTicket: null,
      linkBuyTicketList: [],
      idPlay: this.id,
      callBackData: {
        u_ser: null,
        for_play: null,
        order_id: null,
        email: null,
        date_time_play: null,
      },
      statusPay: null,
      statusPayList: [],
      interval: null,
      counterToErrorStatus: 0,
    };
  },
  created() {
    this.getPlay()
      .then(() => this.playList.push(this.play))
      .then(() => this.linkBuyTicketList.push(this.linkBuyTicket));
    this.getStatusPay().then(() => this.statusPayList.push(this.statusPay));
  },
  methods: {
    onlyDate(date) {
      // Відсікає чесовий пояс від дати
      let newDate = String(date).split("+");
      newDate = newDate[0].split("T").join("|");
      return newDate;
    },
    async purchasedTickets(e) {
      // Відправка даних на сервер
      e.preventDefault();
      this.callBackData.for_play = this.id;
      this.callBackData.order_id = this.linkBuyTicketList[0].order_id;
      this.callBackData.date_time_play = this.onlyDate(
        this.playList[0].date_play
      );
      await fetch(`${this.$store.getters.getServerUrl}/pay-callback/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.callBackData),
      })
        .then(() => {
          this.showSpiner = true;
        })
        .then(() => this.setIntervGetStatusPay());
    },

    async callStatus() {
      // Post запит до сервера на збереження в квитка в БД та відпраки на пошту
      await fetch(`${this.$store.getters.getServerUrl}/pay-callback_2/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.callBackData),
      });
    },

    async setIntervGetStatusPay() {
      // Інтервал між запитами на статус оплати
      this.interval = setInterval(this.wrapperDecor, 2000);
      if (this.statusPay !== null) {
        console.log("if  ", this.statusPay.status);
        if (this.statusPayList[0].status == "succes") {
          clearInterval(this.interval);
        }
      }
    },

    async getStatusPay() {
      // статус оплати
      let url = `${this.$store.getters.getServerUrl}/show_call_data/${this.id}/${this.callBackData.order_id}/${this.callBackData.date_time_play}/${this.callBackData.email}/`;
      this.statusPay = await fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    async wrapperDecor() {
      // Обгортка до функції запиту на статус оплати та інтервалу
      this.getStatusPay()
        .then(() => {
          if (this.statusPay !== null) {
            console.log(this.statusPay.status, "  ststst");
            this.counterToErrorStatus++;
            console.log(this.counterToErrorStatus);
            if (this.counterToErrorStatus === 45) {
              clearInterval(this.interval);
              location.reload();
            }
            if (this.statusPay.status == "success") {
              clearInterval(this.interval);
              this.showSpiner = false;
            }
          }
        })
        .then(() => this.callStatus());
    },

    pay(lnk) {
      // Anchor to top
      window.open(lnk, "_blank").focus();
    },
    async getPlay() {
      this.play = await fetch(
        `${this.$store.getters.getServerUrl}/playss_all/${this.id}/`
      )
        .then((response) => response.json())
        .then(
          (this.linkBuyTicket = await fetch(
            `${this.$store.getters.getServerUrl}/buy_ticket/${this.id}/`
          ).then((response) => response.json()))
        )
        .catch((error) => {
          console.log(error);
        });
    },
    correctRange(hours, minutes) {
      // Коригує час тривалості
      let range = [hours, minutes];
      if (minutes > 59) {
        range[0] = Math.floor(minutes / 60) + hours;
        range[1] = minutes % 60;
      }
      return range;
    },

    setDurationPlay(time, duration) {
      // Діапазон тривалості вистав
      // від-до
      let onlytime = String(time).split("T")[1];
      onlytime = onlytime.split("+")[0].split(":").slice(0, 2);
      let dur;
      let minutes = duration;
      let hour = 0;
      let rangeLoc = this.correctRange(hour, minutes);
      dur = this.correctRange(
        rangeLoc[0] + Number(onlytime[0]),
        rangeLoc[1] + Number(onlytime[1])
      );
      if (dur[1] < 10) {
        dur[1] = `0${dur[1]}`;
      }

      let dataDuration = [
        { value: 0, text: onlytime.join(".") },
        { value: 1, text: " - " },
        { value: 2, text: dur.join(".") },
      ];
      return dataDuration;
    },
  },
};
</script>
    <style scoped>
.home_play {
  display: flex;
  flex-direction: column;
}
a:hover {
  color: green;
}
.payment_button {
  border-color: gray;
  border-radius: 5px;
  background: transparent;
  margin: 5px 0 5px 0;
}

.input_field {
  padding: 5px;
  border-radius: 5px;
}


</style>
    