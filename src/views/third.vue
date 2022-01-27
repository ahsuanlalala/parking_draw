<template>
  <v-container>
    <div v-if="openLoad"><pikaloading v-if="!after" /></div>
    <div class="pt-10 pb-0 d-flex justify-center flex-column">
      <h1 class="text-center">
        <v-btn
          fab
          depressed
          style="background-color: #28464b"
          class="white--text mr-16 mb-3"
          @click="goback()"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <b>圖書館</b><span>抽籤系統(第三階段)</span>
        <!-- <v-btn
          fab
          depressed
          style="background-color: #28464b"
          class="white--text ml-16 mb-3"
          @click="gohome()"
          :loading="home"
          ><v-icon>mdi-home</v-icon></v-btn
        > -->
      </h1>
    </div>
    <div class="text-center mt-3 pb-10">
      <v-chip label outlined>
        <span style="font-size: 1.2em"
          ><span>
            共<b>{{ allNumber - Num2 }}</b
            >筆名單</span
          ><b
            class="ml-3 bcolor"
            v-if="
              (memberTwo.length === Twoitems.length && this.finish) ||
              this.after
            "
            >(已完成抽籤)</b
          ></span
        >
      </v-chip>

      <br />
    </div>

    <v-row>
      <v-col class="text-center mb-1 pb-0" style="font-size: 1.8em"
        >正取<b>{{ Num3 }}</b
        >人</v-col
      >
      <v-col class="text-center mb-1 pb-0" style="font-size: 1.8em"
        >備取<b>{{ allNumber - Num3 - Num2 }}</b
        >人</v-col
      ></v-row
    >
    <v-row>
      <v-col style="overflow: hidden auto" class="pt-0"
        ><v-simple-table height="59vh" class="elevation-3" ref="rollOne">
          <template v-slot:default>
            <tbody>
              <tr v-for="(item, i) in memberOne" :key="i">
                <td>{{ i + 1 }}.</td>
                <td>{{ item.plate }}</td>
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table></v-col
      ><v-col style="overflow: hidden auto" class="pt-0 pb-10"
        ><v-simple-table height="59vh" class="elevation-3" ref="rollTwo">
          <template v-slot:default>
            <tbody>
              <tr v-for="(Twoitem, i) in memberTwo" :key="i">
                <td>{{ i + 1 }}.</td>
                <td>{{ Twoitem.plate }}</td>
                <td>{{ Twoitem.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table></v-col
      ></v-row
    >
    <v-btn
      depressed
      block
      style="background-color: #28464b"
      class="white--text mr-3"
      @click="start()"
      :disabled="close"
      :loading="loading"
      >開始抽籤</v-btn
    >
    <br />
    <export3 :memberOne="memberOne" :memberTwo="memberTwo" />
  </v-container>
</template>

<script>
import export3 from "../components/export2.vue";
import draw from "../service/draw";
import pikaloading from "../components/pikaloading.vue";
export default {
  components: { export3, pikaloading },
  data() {
    return {
      Num2: "",
      Num3: "",
      allNumber: "",
      memberOne: [],
      memberTwo: [],
      items: [],
      Twoitems: [],
      close: false,
      after: false,
      loading: false,
      finish: false,
      home: false,
      openLoad: false,
    };
  },

  computed: {
    // 上一階段是否完結的判斷
    oneOver() {
      let onelength = this.memberOne.length;
      return onelength === this.items.length;
    },
  },

  watch: {
    oneOver(over) {
      //oneOver變動時會觸發
      if (over) {
        this.Twoitems.forEach((Twoitem, i) => {
          setTimeout(() => {
            this.memberTwo.push(Twoitem);
            this.$nextTick(() => {
              let msg = this.$refs.rollTwo.$el.querySelector(
                ".v-data-table__wrapper"
              ); // 目標
              msg.scrollTop = msg.scrollHeight; // 滾動條高度
            });
          }, 1000 * (i + 1));
        });
        this.finish = true;
      }
    },
  },

  mounted() {
    this.Num2 = JSON.parse(localStorage.getItem("Num2"));
    this.Num3 = JSON.parse(localStorage.getItem("Num3"));
    this.allNumber = JSON.parse(localStorage.getItem("allNumber"));
    this.ifAllDraw();
  },

  methods: {
    async start() {
      this.loading = true;
      this.memberOne.length = 0;
      this.memberTwo.length = 0;
      const Num3 = this.Num3;
      const parkId = "4_72";
      const result = (await draw.AllRand({ parkId, Num3 })).data;

      this.Twoitems = result.waiting;
      this.items = result.already;
      this.items.forEach((item, i) => {
        setTimeout(() => {
          this.memberOne.push(item);
          this.$nextTick(() => {
            let msg = this.$refs.rollOne.$el.querySelector(
              ".v-data-table__wrapper"
            ); // 目標
            msg.scrollTop = msg.scrollHeight; // 滾動條高度
          });
        }, 1000 * (i + 1));
      });
      this.loading = false;
      this.close = true;
    },
    async ifAllDraw() {
      const parkId = "4_72";
      this.openLoad = true;
      const result = (await draw.ifAllDraw({ parkId })).data;
      // console.log(result);
      this.openLoad = false;
      if (!result.message) {
        this.memberOne = result.already;
        this.memberTwo = result.waiting;
        this.after = result.after;
        this.close = true;
      }
    },
    goback() {
      this.$router.push({ path: "/second" });
    },
    // async gohome() {
    //   this.home=true
    //   const parkId = "4_6";
    //   await draw.reborn({ parkId });
    //   this.$router.push({ path: "/" });
    // },
  },
};
</script>

<style>
h1 {
  font-weight: lighter;
  font-size: 2.5em;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 16px !important;
}
</style>