<template>
  <v-container>
    <pikaloading v-if="!allNum" />

    <div class="container pt-10 pb-0 d-flex justify-center flex-column">
      <h1 class="text-center"><b>圖書館</b><span>抽籤系統</span></h1>
    </div>
    <div class="text-center mt-3 pb-10">
      <v-chip label outlined>
        <span style="font-size: 1.2em"
          ><span>
            共<b>{{ allNum }}</b
            >筆名單</span
          ></span
        >
      </v-chip>
      <br />
    </div>
    <v-form ref="startDraw" @submit.prevent="gogo()" v-if="allNum">
      <div class="mt-8 d-flex justify-center">
        <v-row justify="center">
          <v-col md="2" class="pr-0"><h2>第一階段</h2> </v-col>
          <v-col md="3" class="pl-0"
            ><v-text-field
              autocomplete="off"
              disabled
              label="正取人數"
              outlined
              dense
              v-model="num1"
            ></v-text-field
          ></v-col>
        </v-row>
      </div>
      <div class="mt-8 d-flex justify-center">
        <v-row justify="center">
          <v-col md="2"><h2>第二階段</h2> </v-col>
          <v-col md="3" class="pl-0"
            ><v-text-field
              autocomplete="off"
              label="正取人數"
              outlined
              dense
              v-model="num2"
              @keypress="dy"
              :rules="[rules.secRule, rules.required, rules.need]"
            ></v-text-field
          ></v-col>
        </v-row>
      </div>
      <div class="mt-8 d-flex justify-center">
        <v-row justify="center">
          <v-col md="2"><h2>第三階段</h2> </v-col>
          <v-col md="3" class="pl-0"
            ><v-text-field
              autocomplete="off"
              label="正取人數"
              outlined
              dense
              v-model="num3"
              @keypress="by"
              :rules="[rules.thirdRule, rules.required, rules.need]"
            ></v-text-field
          ></v-col>
        </v-row>
      </div>

      <div class="mt-8 d-flex justify-center">
        <v-row justify="center">
          <v-col md="2"></v-col>
          <v-col md="3"
            ><v-btn class="mr-3 grey lighten-2" depressed @click="resetFForm()">
              重新設定</v-btn
            >
            <v-btn
              depressed
              class="white--text"
              color="black"
              :loading="loading"
              type="submit"
              >開始抽籤</v-btn
            ></v-col
          >
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import draw from "../service/draw";
import pikaloading from "../components/pikaloading.vue";
export default {
  components: { pikaloading },
  data() {
    return {
      loading: false,
      num1: "",
      num2: "",
      num3: "",
      allNum: "",
      rules: {
        secRule: (v) => v <= this.sec || `沒辣麼多人，最多${this.sec || 0}個人`,
        thirdRule: (v) =>
          v <= this.third + this.sec - this.num2 ||
          `沒辣麼多人，最多${
            this.num2 <= this.allNum
              ? this.third + this.sec - this.num2 || 0
              : 0
          }個人`,

        required: (v) => !!v || "此欄位為必填",
        need: (v) => v > 0 || "需大於0",
      },
    };
  },
  mounted() {
    localStorage.clear();
    this.getAllNum();
  },
  methods: {
    gogo() {
      if (!this.$refs.startDraw.validate()) {
        return;
      }
      this.loading = true;
      const Num1 = this.num1;
      localStorage.setItem("Num1", Num1);
      const Num2 = this.num2;
      localStorage.setItem("Num2", Num2);
      const Num3 = this.num3;
      localStorage.setItem("Num3", Num3);
      // this.$router.push({ path: "/first" });
      this.$router.push({ path: "/second" });
    },
    resetFForm() {
      this.$refs.startDraw.reset();
    },
    async getAllNum() {
      const parkId = "4_72";
      const reData = (await draw.getAll({ parkId })).data;

      this.allNum = reData.total;

      this.first = reData.first;
      this.sec = reData.sec;
      // console.log(this.sec);
      this.third = reData.third;
      // console.log(this.third);
      const allNumber = this.allNum;
      localStorage.setItem("allNumber", allNumber);
      const firNumber = this.first;
      localStorage.setItem("firNumber", firNumber);
      const secNumber = this.sec;
      localStorage.setItem("secNumber", secNumber);
    },
    dy(e) {
      const keycode = String.fromCharCode(e.charCode);
      console.log(keycode);

      if (this.num2 + keycode > this.sec) {
        this.num2 = this.sec;
        e.preventDefault();
      }
    },
    by(e) {
      {
        const keycode = String.fromCharCode(e.charCode);

        if (this.num3 + keycode > this.third + this.sec - this.num2) {
          this.num3 = this.third + this.sec - this.num2;
          e.preventDefault();
        }
      }
    },
  },
};
</script>

<style>
h1 {
  font-weight: lighter;
  font-size: 2.5em;
}
</style>