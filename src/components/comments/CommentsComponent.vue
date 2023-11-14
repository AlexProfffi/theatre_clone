<template>
  <div class="d_flex_column bg_grey_custom">
    <div class="d_flex_row p_lr_2">
      <div class="d_flex_column w_100">
        <div class="d_flex_row upper_case f_oswald ptb_1em">написати відгук</div>
        <div>
          <form
            class="d_flex_column"
            action=""
            method="post"
            @submit="publicComment"
          >
            <div v-if="!checkAuth" class="d_flex_row small_font_07">
              <label for="eml">Електронна пошта:</label>
            </div>
            <div class="w_50 horizontal_line d_flex_row j_content_start mb_1rem w_input_low_1000">
              <input
                v-if="!checkAuth"
                v-model="postComment.who"
                id="eml"
                class="w_100 t_left b_none sibscribe_input bg_grey_custom"
                type="email"
                placeholder="Електронна пошта..."
              />
            </div>
            <div class="d_flex_row small_font_07">
              <label for="txt">{{ maxSymbols }} символів</label>
            </div>
            <div class="w_100">
              <textarea
                class="b_radius_5 w_100"
                placeholder="Напишіть відгук..."
                name="comment"
                id="txt"
                rows="5"
                v-model="postComment.text"
                @input="countSymbols()"
              ></textarea>
            </div>
            <div class="d_flex_row_reverse p_tb_5">
              <input
                id="p_submit"
                class="comment_b color_white f_oswald upper_case pad_03em b_radius_5"
                type="submit"
                value="Опублікувати"
              />
            </div>
          </form>
          <div :class="{ c_red: !answerSubscribeStatus }">
            {{ answerSubscribe }}
          </div>
        </div>
      </div>
    </div>
    <div class="pad_b1em" v-if="comments == null || comments.length == 0">
      {{ noneComments }}
    </div>
    <div class="d_flex_row">
      <div @click="reverseData = !reverseData" class="p_lr_2">
        <div class="c_pointer arr_sort">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-sort-up"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="!reverseData">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="d_flex_column p_lr_2"
      >
        <div class="d_flex_row open_sans upper_case">
          <div class="f_weight_bold pad_b1em">
            {{ comment.who }}
          </div>
        </div>
        <div class="d_flex_row t_justify f_source_sans">
          <div class="pad_b1em f_low_400">
            {{ comment.text }}
          </div>
        </div>
        <div class="d_flex_row_reverse t_justify f_source_sans font_1 pad_b1em">
          <DateComponent :dateTime="comment.date_create" :timeBool="true" />
        </div>
        <div class="horizontal_line"></div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="comment in reversedComments"
        :key="comment.id"
        class="d_flex_column p_lr_2"
      >
        <div class="d_flex_row open_sans upper_case">
          <div class="f_weight_bold pad_b1em">
            {{ comment.who }}
          </div>
        </div>
        <div class="d_flex_row t_justify f_source_sans">
          <div class="pad_b1em f_low_400">
            {{ comment.text }}
          </div>
        </div>
        <div class="d_flex_row_reverse t_justify f_source_sans font_1 pad_b1em">
          <DateComponent :dateTime="comment.date_create" :timeBool="true" />
        </div>
        <div class="horizontal_line"></div>
      </div>
    </div>
  </div>
</template>
    <script>
import DateComponent from "@/components/helpers/DateComponent.vue";

export default {
  name: "CommentsComponent",
  props: {
    oneIdPlay: String,
  },
  components: {
    DateComponent,
  },
  data() {
    return {
      comments: null,
      noneComments: "Поки що нема відгуків",
      maxSymbols: 5000,
      answerSubscribe: null,
      answerSubscribeStatus: null,
      token: localStorage.getItem("token"),
      userIn: localStorage.getItem("userInfo"),
      checkAuth: false,
      reverseData: false,
      postComment: {
        text: null,
        who: null,
        thePlay: this.oneIdPlay,
      },
    };
  },
  created() {
    this.getComments();
    this.isUserAuth();
  },
  methods: {
    async getComments() {
      // Коментарі
      this.comments = await fetch(
        `${this.$store.getters.getServerUrl}/comments/play/?q=${this.oneIdPlay}`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
    },
    async publicComment(e) {
      // public comment
      e.preventDefault();
      let headersD;
      if (this.token) {
        headersD = {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token " + this.token.replace(/"/gi, ""),
        };
      } else {
        headersD = {
          accept: "application/json",
          "Content-Type": "application/json",
        };
      }
      let url = `${this.$store.getters.getServerUrl}/comments/create/`;
      await fetch(url, {
        method: "POST",
        headers: headersD,
        body: JSON.stringify(this.postComment),
      })
        .then((response) => {
          response.json().then((response) => {
            this.answerSubscribe = response.info;
            this.answerSubscribeStatus = response.status;
            this.postComment.text = "";
            this.maxSymbols = 5000;
            if (this.answerSubscribeStatus) {
              this.getComments();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    countSymbols() {
      // Рахує скільки залишилось символів
      let lenTxtBefore = this.postComment.text.length;
      this.maxSymbols = 5000 - lenTxtBefore;
    },
    isUserAuth() {
      // Токен користувача
      if (this.userIn == {}) {
        this.postComment.who = JSON.parse(this.userIn).email;
        this.checkAuth = true;
      } else {
        this.postComment.who = null;
        this.checkAuth = false;
      }
    },
  },
  computed: {
    reversedComments: function () {
      return [...this.comments].reverse();
    },
  },
};
</script>
  <style scoped>
@media screen and (max-width: 1400px) {
  .p_lr_2 {
    padding: 2em 15em;
  }
}

@media screen and (max-width: 1100px) {
  .p_lr_2 {
    padding: 2em 10em;
  }
}
@media screen and (max-width: 900px) {
  .p_lr_2 {
    padding: 2em 5em;
  }
}

@media screen and (max-width: 550px) {
  #p_submit {
    width: 100%;
  }
  .p_lr_2 {
    padding: 2em 1em;
  }
  .f_low_400 {
    font-size: 14px;
    overflow: hidden;
  }
}

.comment_b {
  background-color: #212121;
  border: none;
}
.scale_hover:hover {
  transform: scale(1.02);
  /* padding: 0.3em 0.5em; */
  box-shadow: none;
}

.arr_sort {
  transition: all 0.3s ease-out;
}
.arr_sort:hover {
  transform: rotate(0.5turn);
}
</style>