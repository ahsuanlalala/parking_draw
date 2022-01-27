<template>
  <div>
    <v-btn
      block
      depressed
      style="background-color: #28464b"
      class="white--text"
      @click="download()"
      v-if="member.length !== 0"
      ><v-icon left small>mdi-download</v-icon>匯出結果</v-btn
    >
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      nameList: {
        number: "編號",
        plate: "車號",
        name: "姓名",
        takeType: "正/備取",
      },
    };
  },
  props: ["member"],
  methods: {
    download() {
      const wopts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary",
        showGridLines: false,
      };
      const wb = { SheetNames: ["抽籤結果"], Sheets: {}, Props: {} };
      const data = this.member.map((info) => {
        const newInfo = {};
        //  Object.keys可以列出物件的名稱
        Object.keys(this.nameList).forEach((keyName) => {
          newInfo[this.nameList[keyName]] = info[keyName];
        });
        return newInfo;
      });
      // console.log(data);
      wb.Sheets["抽籤結果"] = XLSX.utils.json_to_sheet(data);
      //建立二進位制物件寫入轉換好的位元組流
      let tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], {
        type: "application/octet-stream",
      });
      FileSaver.saveAs(tmpDown, "新北市立圖書館抽籤第二階段.xlsx");
      // console.log("finish");
    },
    //字串轉字元流
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefined") {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (var i = 0; i != s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        let buf = new Array(s.length);
        for (let i = 0; i != s.length; i++) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
  },
};
</script>