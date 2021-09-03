<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h5 slot="center">购物街</h5>
    </nav-bar>
    <!-- 轮播图 -->
   <home-swiper :banners = "banners"/>
   <!-- 推荐内容 -->
   <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      keywords:[]
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created() {
    // 1. 请求数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  }
};
</script>

<style>
#home {
  font-size: 20px;
  text-align: center;
  color: #fff;
}

.home-nav {
  background-color: var(--color-tint);
}
</style>