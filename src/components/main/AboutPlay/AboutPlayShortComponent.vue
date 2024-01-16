<template>
  <div
    class="d_flex_row p_bottom plays_for_sale"
    :class="{ j_content_space_around: !withPhoto, horizontal_line: withPhoto }"
  >
    <div class="w_20_percent plays_sl_component" v-if="withPhoto">
      <div>
        <h4
          class="f_oswald f_weight_300 m_0 p_l_2 short_day short_day_low_1000"
          :id="getMeDay(play.date_play).idEl"
        >
          {{ getMeDay(play.date_play).shortText }}
        </h4>
      </div>
      <div class="p_both_px">
        <div class="d_flex_row_reverse f_size_25">
          <h2
            v-for="dt in datePlayVisibility(play.date_play)"
            :key="dt.value"
            :id="dt.idEl"
            class="f_oswald m_0"
          >
            {{ dt.text }}
          </h2>
        </div>
      </div>
    </div>

    <div class="w_20_percent plays_sl_component" v-else>
      <div
        v-for="on_pl in newArrayDates(play.on_play, idDatePlayOne)"
        :key="on_pl.id"
      >
        <div
          v-if="newArrayDates(play.on_play, idDatePlayOne).indexOf(on_pl) == 0"
        >
          <div>
            <h4
              class="f_oswald f_weight_300 m_0 p_l_2 short_day short_day_low_1000"
              :id="getMeDay(on_pl.date_pl).idEl"
            >
              {{ getMeDay(on_pl.date_pl).shortText }}
            </h4>
          </div>
          <div class="p_both_px d_flex_row j_content_end">
            <div
              class="d_flex_row_reverse w_max_content c_pointer f_size_25"
              @click="instanceNewCurrentDatePlay(on_pl, $event)"
            >
              <div
                v-for="dt in datePlayVisibility(on_pl.date_pl)"
                :key="dt.value"
                :id="dt.idEl"
                class="f_oswald m_0"
              >
                {{ dt.text }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            @click="otherDate = !otherDate"
            class="d_flex_row j_content_center f_oswald font_1 c_pointer nav_link_color underline_txt pad_top"
            v-if="play.on_play.indexOf(on_pl) == 1"
          >
            <div>Вибрати іншу дату</div>
            <div>&nbsp;</div>
            <div>
              <span v-if="!otherDate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  />
                </svg>
              </span>
              <span v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <div class="drop_animate" v-show="otherDate">
              <div>
                <div
                  class="f_oswald f_weight_300 m_0 p_l_2 short_day short_day_low_1000"
                  :id="getMeDay(on_pl.date_pl).idEl"
                >
                  {{ getMeDay(on_pl.date_pl).shortText }}
                </div>
              </div>
              <div class="d_flex_row j_content_end p_both_px">
                <div
                  class="d_flex_row_reverse w_max_content c_pointer f_size_25"
                  @click="instanceNewCurrentDatePlay(on_pl, $event)"
                >
                  <div
                    v-for="dt in datePlayVisibility(on_pl.date_pl)"
                    :key="dt.value"
                    :id="dt.idEl"
                    class="f_oswald m_0"
                  >
                    {{ dt.text }}
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="withPhoto"
      class="d_flex_row w_20_percent plays_sl_component pic_sl_component"
    >
      <router-link
        v-if="withPhoto"
        :to="{
          name: 'play',
          params: {
            id: play.id_play,
            date_id: play.id,
            name: transcriptWord(play.name),
          },
        }"
      >
        <img
          :src="repalcer(play.photo, '')"
          :alt="play.photo"
          class="img_on_list img_on_list__low_1000"
        />
      </router-link>
    </div>
    <div class="d_flex_column j_content_start w_20_percent plays_sl_component">
      <div v-if="play.is_premiere" class="d_flex_row" id="premier">
        <h4 class="upper_case horizontal_line">прем'єра</h4>
      </div>
      <div class="d_flex_row name_play_sale">
        <router-link
          :to="{
            name: 'play',
            params: {
              id: play.id_play,
              date_id: play.id,
              name: transcriptWord(play.name),
            },
          }"
          class="f_oswald f_weight_400 current_play nav_link_color"
        >
          {{ play.name }}
        </router-link>
      </div>
      <div class="d_flex_row f_source_sans f_size_0_9" v-if="play.dramaturg[0]">
        <span v-if="play.dramaturg.length < 2">
          {{ play.dramaturg[0].role[0] }}
        </span>
        <span v-else> Драматурги/ні </span>
        <div v-if="play.dramaturg.length < 2">
          <div v-for="pd in play.dramaturg" :key="pd.id">
            <router-link
              class="nav_link_color"
              :to="{
                name: 'playwriter',

                params: {
                  id: pd.id,
                  slugin: sluginToServerAuthor,
                  name: transcriptWord(concat(pd.first_name, pd.last_name)),
                },
              }"
            >
              <span class="f_weight_bold p_l_0_5">
                {{ pd.first_name }}
              </span>
              <span class="f_weight_bold p_l_0_3">
                {{ pd.last_name }}
              </span>
            </router-link>
          </div>
        </div>
        <div v-else>
          <span class="c_pointer f_weight_bold p_l_0_5" @click="showModal()">
            Показати всіх
          </span>
          <ModalInfo
            :dramaturgs="play.dramaturg"
            :show="modal"
            @close="modal = false"
          />
        </div>
      </div>
      <div class="d_flex_row f_source_sans f_size_0_9" v-if="play.staff[0]">
        <div>
          <div v-if="getDirector(play.staff)[0] != '--'">
            <span>
              {{ getDirector(play.staff, (rl = true)) }}
            </span>
            <router-link
              
              class="nav_link_color"
              :to="{
                name: 'playwriter',

                params: {
                  id: getDirector(play.staff)[1],
                  slugin: sluginToServerDirector,
                  name: transcriptWord(getDirector(play.staff)[0]),
                },
              }"
            >
              <span class="f_weight_bold p_l_0_5">
                {{ getDirector(play.staff)[0] }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="d_flex_row j_content_start f_family_sans">
        {{ play.amount }} грн.
      </div>
      <div class="d_flex_row f_oswald pad_top play_sl_duration">
        <h4
          v-for="duration in setDurationPlay(
            play.date_play,
            play.duration_minutes
          )"
          :key="duration.value"
          class="f_weight_300"
        >
          {{ duration.text }}
        </h4>
      </div>
      <div class="t_left f_size_0_9 f_weight_bold">
        {{ play.duration }}
      </div>
    </div>
    <div
      class="upper_case w_20_percent d_flex_column plays_sl_component"
      :class="{ j_content_start: !withPhoto, j_content_center: withPhoto }"
    >
      <div v-if="!play.on_play[0].cancel_event">
        <div
          v-if="!isPast"
          class="d_flex_row j_content_center open_sans f_size_32 c_pointer mob_font"
        >
          <router-link
            v-if="withPhoto"
            :id="'link_play_' + play.id"
            :to="{
              name: 'play',
              params: {
                id: play.id_play,
                date_id: play.id,
                name: transcriptWord(play.name),
              },
            }"
            class="go_to_buy"
          >
            купити квиток
            <div class="horizontal_line_hover"></div>
          </router-link>

          <span v-else class="nav_link_color" @click="showFormToPay()">
            Оформити замовлення
          </span>
        </div>
      </div>
      <div id="cancelEv" class="f_size_32 c_red b_red b_radius_10 f_damage_rubik rotate_something pad_03em mt_3em" v-else>
        {{ eventCancel }}
      </div>
      <div v-if="!play.on_play[0].cancel_event">
        <div v-if="!isPast">
          <div class="d_flex_row j_content_center">
            <div
              v-if="showPaymentForm"
              id="form_pay"
              class="d_flex_column w_75"
            >
              <div class="d_flex_column j_content_space_around p_tb_5">
                <div class="d_flex_row">
                  <span class="open_sans small_font">
                    Дата показу вистави:
                  </span>
                </div>

                <div class="d_flex_row_reverse j_content_center b_wrap">
                  <div
                    v-for="dt in datePlayVisibility(currentDatePlay.date_pl)"
                    :key="dt.value"
                    :id="dt.idEl"
                    class="f_oswald m_0 underline_txt f_size_32"
                  >
                    <span>
                      {{ dt.text }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="d_flex_row">
                <label for="number" class="open_sans small_font"
                  >Введіть кількість квитків:
                </label>
              </div>
              <input
                class="input_field t_center w_30"
                type="number"
                id="number"
                min="1"
                @change="setCountTickets(callBackData.countTickets)"
                v-model="callBackData.countTickets"
              />
              <div class="d_flex_row">
                <label for="email" class="open_sans small_font"
                  >Введіть електронну пошту для купівлі квитка:
                </label>
                <div>
                  {{ callBackData.email }}
                </div>
              </div>
              <input
                class="input_field"
                type="email"
                id="email"
                placeholder="Email... (Обов'язкове поле)"
                v-model="callBackData.email"
              />
              <label for="email" class="open_sans small_font t_left"
                >Введіть Ваше ім'я:
              </label>
              <input
                class="input_field"
                type="text mar_top_bot"
                id="txt"
                placeholder="Ім'я... (Обов'язкове поле)"
                v-model="callBackData.userName"
              />
              <button
                :disabled="!checkCorrectEmail(callBackData.email)"
                id="pay_b"
                type="submit"
                class="payment_button f_source_sans nav_link_color f_size_32 upper_case"
                :class="{ opacity_0_5: !checkCorrectEmail(callBackData.email) }"
                @click="pay()"
              >
                оплатити
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          {{ eventWas }}
        </div>
      </div>
    </div>
    <div class="horizontal_line"></div>
  </div>
</template>
  <script>
import ModalInfo from "../../helpers/ModalInfo.vue";
import { transcription, concat } from "../../../assets/main";

export default {
  name: "AboutPlayShortComponent",
  props: {
    play: Object,
    linkPay: Object,
    withPhoto: Boolean,
    idDatePlayOne: Number,
    idp: String,
    isPast: Boolean,
  },
  components: {
    ModalInfo,
  },
  data() {
    return {
      transcriptWord: transcription,
      eventWas: "Подія вже відбулась",
      eventCancel: "Подію скасовано",
      isMobile: false,
      modal: false,
      genderP: null,
      theLinkPay: null,
      callBackData: {
        email: null,
        userName: null,
        countTickets: 1,
      },
      thePlay: this.play,
      showPaymentForm: false,
      modernGenderDirector: {},
      otherDate: false,
      currentDatePlay: this.newArrayDates(
        this.play.on_play,
        this.idDatePlayOne
      )[0],
      parentListEl: [],
      testPayButton: null,
      sluginToServerDirector: "directors",
      sluginToServerAuthor: "authors",
      concat: concat,
    };
  },
  created() {
    this.whoIsIt(this.thePlay.staff, "Режисер", "Режисерка");
    this.isUserAuth();
  },
  methods: {
    test() {},
    drawHorizontalLine(classEl, index = 0) {
      // Підкреслення по наведенню на елемент

      let navEl = document.querySelectorAll(classEl);
      let widthElem = navEl[index].offsetWidth;
      let cnt = 1;
      this.intrval = setInterval(() => {
        navEl[index].firstElementChild.style.width = String(cnt) + "px";
        if (cnt >= Number(widthElem)) {
          clearInterval(this.intrval);
          return;
        }
        cnt += 3;
      }, 5);
    },
    clearHorizontalLine(classEl, index = 0) {
      // Скасування по прибиранню курсора миші на елемент
      let navEl = document.querySelectorAll(classEl);
      clearInterval(this.intrval);
      navEl[index].firstElementChild.style.width = 0;
    },

    rolesAll(lst) {
      // Режисер/ка
      let dt = [];
      for (let x = 0; x < lst.length; x++) {
        dt.push({ value: x, txt: lst[x] });
      }
      return dt;
    },

    async setOrderInToStorage() {
      // Заносить order_id в локальне сховище
      this.testPayButton = "setOrderInToStorage";
      localStorage.setItem(
        "infoForTicket",
        JSON.stringify({
          order_id: this.theLinkPay.order_id,
          email: this.callBackData.email.trim(),
          u_name: this.callBackData.userName,
          time_play: this.onlyDate(this.currentDatePlay.date_pl),
          play_name: this.thePlay.name,
          count_tickets: this.callBackData.countTickets,
          object_date: this.idDatePlayOne,
        })
      );
    },
    async goToPayPage() {
      document.querySelector("#email").disabled = true;
      this.callBackData.email = "";
      location.href = this.theLinkPay.link;
      // window.open(this.theLinkPay.link, "_blank").focus();
    },
    pay() {
      //  Перехід на іншу сторінку з фокусом на ній
      this.getLinkPay()
        .then(() => this.setOrderInToStorage())
        .then(() => this.goToPayPage());
    },

    async getLinkPay() {
      // Посилання на оплату

      this.theLinkPay = await fetch(
        `${this.$store.getters.getServerUrl}/buy_ticket/${this.idp}/${this.callBackData.countTickets}/`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },

    setCountTickets(value) {
      // к-ть квитків > 0
      this.callBackData.countTickets = Math.abs(value);
    },

    checkCorrectEmail(mail) {
      // Первіряє поле на наявність пошти
      let check_a = false;
      let check_dot;

      if (mail != null) {
        for (let x = 0; x < mail.length; x++) {
          if (mail[x] == "@" && x != 0 && x != mail.length - 1) {
            check_a = true;
          }
          if (mail[x] == "." && x != 0 && x != mail.length - 1) {
            check_dot = true;
          }
        }
      }

      if (
        check_a &&
        check_dot &&
        this.callBackData.userName
        // this.callBackData.countTickets > 0
      ) {
        return true;
      } else {
        return false;
      }
    },

    onlyDate(date) {
      // Відсікає чесовий пояс від дати
      let newDate = String(date).split("+");
      newDate = newDate[0].split("T").join("|");
      return newDate;
    },

    getMeDay(dat) {
      // Повертає день тижня
      let dt = String(dat).split("T");

      dt = dt[0].split("-");
      let day = dt[2];
      let month = dt[1];
      let date = new Date();
      date.setMonth(Number(month) - 1);
      date.setDate(Number(day));
      const daysOfWeek = [
        "неділя",
        "понеділок",
        "вівторок",
        "середа",
        "четвер",
        "п'ятниця",
        "субота",
      ];
      const daysOfWeekShort = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
      let daysAllData = [];
      for (let x = 0; x < daysOfWeek.length; x++) {
        daysAllData.push({
          value: x,
          text: daysOfWeek[x],
          shortText: daysOfWeekShort[x],
          idEl: "short_day_" + String(x),
        });
      }
      return daysAllData[date.getDay()];
    },

    datePlayVisibility(dts) {
      let newFormat = dts.split("T");
      let monthAndDay = newFormat[0].split("-");
      monthAndDay = [
        monthAndDay[monthAndDay.length - 1],
        "|",
        monthAndDay[monthAndDay.length - 2],
      ];
      let correctFormatDate = [];
      for (let x = monthAndDay.length - 1; x >= 0; x--) {
        correctFormatDate.push({
          value: x,
          text: monthAndDay[x],
          idEl: "date" + String(x),
        });
      }
      return correctFormatDate;
    },

    repalcer(str, changeble) {
      // Замінює підстроку
      if (changeble) {
        return (
          "https://theatreofplaywrightsapi.space:8443/image_theatre/" +
          str.replace(changeble, "")
        );
      }
      return "https://theatreofplaywrightsapi.space:8443/image_theatre/" + str;
    },

    showModal() {
      // Діалогове вікно з драматургами
      this.modal = true;
    },

    isEqualDateToday(dateObj) {
      // Порівнює дату вистави та сьогоднішю дату
      let today = new Date();
      if (today < Date(dateObj)) {
        return true;
      }
      return false;
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

    showFormToPay() {
      this.showPaymentForm = !this.showPaymentForm;
    },

    whoIsIt(allStaff = [], male, female) {
      // Повертає режисера із списку персонала
      for (let x = 0; x < allStaff.length; x++) {
        if (
          allStaff[x].role.indexOf(male) > -1 ||
          allStaff[x].role.indexOf(female) > -1
        ) {
          this.modernGenderDirector.fullName = `${allStaff[x].first_name} ${allStaff[x].last_name}`;
          this.modernGenderDirector.rol =
            allStaff[x].role.indexOf(male) > -1 ? male : female;
        }
        return this.modernGenderDirector;
      }
    },

    instanceNewCurrentDatePlay(date, event) {
      // Нова дата вистави для купівлі квитка
      this.parentListEl.push(event.target.parentElement);
      this.currentDatePlay = date;
      for (let x = 0; x < this.parentListEl.length; x++) {
        if (event.target.parentElement == this.parentListEl[x]) {
          undefined;
        } else {
          this.parentListEl[x].style.color = "";
          this.parentListEl.splice(
            this.parentListEl.indexOf(this.parentListEl[x]),
            1
          );
        }
        if (this.parentListEl.length) {
          this.parentListEl[0].style.color = "black";
        }
      }
    },

    getDirector(stafers, rl = false) {
      // Повертає режисера
      // rl  це його роль
      
      if (!rl) {
        for (let x = 0; x < stafers.length; x++) {
          if (
            stafers[x].role.includes("Режисер") ||
            stafers[x].role.includes("Режисерка")
          ) {
            return [
              `${stafers[x].first_name} ${stafers[x].last_name}`,
              stafers[x].id,
            ];
          } 
        }
      } else {
        for (let x = 0; x < stafers.length; x++) {
          if (stafers[x].role.indexOf("Режисерка") > -1) {
            return stafers[x].role[stafers[x].role.indexOf("Режисерка")];
          } else if (stafers[x].role.indexOf("Режисер") > -1) {
            return stafers[x].role[stafers[x].role.indexOf("Режисер")];
          }
        }
      }
      return [
        "--", -1
      ]
    },

    isUserAuth() {
      // Токен користувача
      let locS = localStorage.getItem("userInfo");
      if (locS) {
        this.callBackData.email = JSON.parse(locS).email;
        this.callBackData.userName = JSON.parse(locS).username;
      } else {
        this.callBackData.email = null;
        this.callBackData.userName = null;
      }
    },

    newArrayDates(list, idDate) {
      // Поточну дату витстави ставить в перший елемент массиву та повертає його
      let newEl;
      for (let x = 0; x < list.length; x++) {
        if (list[x].id == idDate) {
          newEl = list[0];
          list[0] = list[x];
          list[x] = newEl;
        }
      }
      return list;
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1000px) {
  #cancelEv {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  #form_pay {
    width: 100%;
    padding: 20px 0 20px 0;
  }
  #premier {
    justify-content: start;
    padding: 5px 0 0 0;
  }

  #email {
    width: 100%;
  }
  .p_both_px {
    padding: 0 !important;
  }
  .plays_for_sale {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 !important;
  }
  .plays_sl_component {
    margin: 2em;
    width: max-content !important;
    padding-bottom: 5px;
    justify-content: center;
    font-size: 1em;
  }

  .pic_sl_component {
    width: 100%;
  }
  .play_sl_duration {
    justify-content: start;
  }
  .short_day_low_1000 {
    padding: 0 !important;
  }
  .img_on_list__low_1000 {
    margin: auto;
    width: 320px !important;
    height: 225px;
  }
  .name_play_sale {
    justify-content: start;
  }
}
@media screen and (max-width: 1550px) {
  .short_day {
    padding-left: 0.6em;
  }
  .current_play {
    font-size: 1.2em !important;
  }
}

.p_bottom {
  padding: 40px;
}

.w_20_percent {
  width: 25%;
}

.f_size_0_9 {
  font-size: 0.9em;
}

.f_size_25 {
  font-size: 32px !important;
  color: rgb(104, 104, 104);
}
.f_size_25:hover {
  color: black;
}

.f_weight_300 {
  font-weight: 300;
  font-size: 1.5em;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  padding-top: 0;
}

.input_field {
  padding: 5px;
  border-radius: 5px;
}

.payment_button {
  border-color: gray;
  border-radius: 5px;
  background: transparent;
  margin: 8px 0 5px 0;
}

.drop_animate {
  transition: 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}
.t_rotate_30 {
  transform: rotate(15deg);
  letter-spacing: 10px;
}
</style>