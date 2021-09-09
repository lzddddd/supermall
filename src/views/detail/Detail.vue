<template>
  <div id="detail">
   <detail-nav-bar></detail-nav-bar>
    <h5>详情页</h5>
    <h5>{{iid}}</h5>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

import DetailNavBar from "./childComps/DetailNavBar";

import { getDetailData } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null
    };
  },
  //************************************** */
  components: {
    DetailNavBar
  },
  //************************************** */

  //************************************** */
  props: {},
  //************************************** */
  created() {
    // 1. 获取商品的iid
    this.iid = this.$route.params.iid;

    // 根据iid获取 商品信息
    this.getDetailData(this.iid);
  },
  //************************************** */
  methods: {
    goBackClick() {
      console.log("click back");
      this.$router.back(-1);
    },

    getDetailData(iid) {
      getDetailData(iid).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
</style>