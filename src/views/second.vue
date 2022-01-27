<template>
  <v-container >
    <div v-if="openLoad"><pikaloading v-if="!after" /></div>

    <div class="pt-6 pb-0 d-flex justify-center flex-column">
      <h1 class="text-center">
        <v-btn
          fab
          depressed
          disabled
          style="background-color: #28464b"
          class="white--text mr-16 mb-3"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <b>圖書館</b><span>抽籤系統(第<b>二</b>階段)</span>
        <v-btn
          fab
          depressed
          style="background-color: #28464b"
          class="white--text ml-16 mb-3"
          :disabled="open"
          @click="gogothird()"
          ><v-icon>mdi-arrow-right</v-icon></v-btn
        >
      </h1>
    </div>
    <div class="text-center mt-3 pb-6">
      <v-chip label outlined>
        <span style="font-size: 1.2em"
          ><span>
            共<b>{{ secNumber }}</b
            >筆名單 </span
          ><b
            class="ml-3 bcolor"
            v-if="
              (member.length === items.length && items.length !== 0) ||
              this.after
            "
            >(已完成抽籤)</b
          ></span
        >
      </v-chip>
      <br />
    </div>
    <v-row justify="center">
      <v-col class="text-center mb-1 pb-0" style="font-size: 1.8em"
        >正取<b>{{ Num2 }}</b
        >人</v-col
      >
    </v-row>
    <div class="pb-4">
      <v-row justify="center">
        <v-col class="pt-3" md="6"
          ><v-simple-table
            ref="roll"
            height="59vh"
            class="elevation-3"
            :items="member"
          >
            <template v-slot:default>
              <tbody>
                <tr v-for="(item, i) in member" :key="i">
                  <td>{{ i + 1 }}.</td>
                  <td>{{ item.plate }}</td>
                  <td>{{ item.name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table></v-col
        >
      </v-row>
    </div>
    <v-btn
      depressed
      block
      style="background-color: #28464b"
      class="white--text mr-3"
      :disabled="close"
      @click="start()"
      :loading="loading"
      >開始抽籤</v-btn
    >
    <br />
    <export2 :member="member" />
  </v-container>
</template>

<script>
import export2 from "../components/export.vue";
import draw from "../service/draw";
import pikaloading from "../components/pikaloading.vue";
export default {
  components: { export2, pikaloading },
  data() {
    return {
      Num2: "",
      secNumber: "",
      allNumber: "",
      member: [],
      items: [],
      close: false,
      open: true,
      after: false,
      loading: false,
      openLoad: false,
    };
  },
  mounted() {
    this.Num2 = JSON.parse(localStorage.getItem("Num2"));
    this.allNumber = JSON.parse(localStorage.getItem("allNumber"));
    this.secNumber = JSON.parse(localStorage.getItem("secNumber"));
    this.ifDraw();
  },

  methods: {
    async start() {
      this.loading = true;
      this.member.length = 0;
      const Num2 = this.Num2;
      // console.log(Num2);
      const parkId = "4_72";
      const result = (await draw.createRand({ parkId, Num2 })).data;
      // console.log(result.NewData);
      this.items = result.NewData;

      this.items.forEach((item, i) => {
        // item.name = item.name.substr(0, 1) + "O" + item.name.substr(2);
        setTimeout(() => {
          this.member.push(item);
          this.$nextTick(() => {
            let msg = this.$refs.roll.$el.querySelector(
              ".v-data-table__wrapper"
            ); // 目標
            msg.scrollTop = msg.scrollHeight; // 滾動條高度
          });
        }, 1000 * (i + 1));
      });

      this.loading = false;
      this.close = true;
      this.open = false;
    },
    gogothird() {
      this.$router.push({ path: "/third" });
    },
    async ifDraw() {
      const parkId = "4_72";
      this.openLoad = true;
      const result = await (await draw.ifDraw({ parkId })).data;
      this.openLoad = false;
      this.after = result.after;
      // console.log(result);
      if (!result.message) {
        this.member = result.data;
        this.close = true;
        this.open = false;
        // console.log("10");
      }
      // console.log("99");
    },
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
.bcolor {
  background-color: #42d9cb !important;
}
.container {
  height: "40vh";
}
</style>