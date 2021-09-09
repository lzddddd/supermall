<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h5 slot="center">购物街</h5>
    </nav-bar>
   <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="home-tab-control"
        v-show="isShowTabControl"
   />  

    <!-- 使用better-scroll滚动的区域 -->
    <scroll class="content" ref="scrollComp"
    :probe-type="3" :pull-up-load="true"
    @scroll="contentScroll"
    @pullingUp="contentPullUp"> 
      <!-- 轮播图 -->
      <home-swiper :banners = "banners" @swiperImageLoad="swiperImageLoad" ref="hSwiper"/>
      <!-- 推荐内容 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view/>
      <!-- tab-control -->
     
      <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        class="home-tab-control"
      />  
      
     
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"/>
    </scroll>

    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
   
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import { getHomeMultidata, getHomeGoodsData } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      keywords: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // 是否显示 “回到顶部”按钮
      isShowBackTop: false,
      // tabControl 的距离顶部的位置
      tabControlTop: 0,
      // 是否显示最顶端的TabControl
      isShowTabControl: false,
      // 记录离开Home组件时候的滚动位置
      saveY: 100
    };
  },
  //************************************** */

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //************************************** */

  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  //************************************** */

  // 组件创建时回调
  created() {
    // 1. 请求首页数据
    this.getHomeMultidata();
    // 2. 请求首页商品数据
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  //************************************** */

  mounted() {
    // 监听图片加载
    const refresh = debounce(this.$refs.scrollComp.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });

    // 监听滚动，固定tab-control
    // 需要获取tabControl的offsetTop
    // 但是组件是没有这个属性的，需要获取组件中的$el，获取组件中的元素
  },
  //************************************** */
  destroyed() {
    console.log("Home Destory");
  },
  //************************************** */
  activated() {
    console.log("Home activated：" + this.saveY);
    this.$refs.scrollComp.scrollTo(0, this.saveY);
    this.$refs.scrollComp.refresh();
    // 活跃时，打开轮播图
    // this.$refs.hSwiper.startTimer();
  },
  //************************************** */
  deactivated() {
    // 离开Home'时，记录下滚动的位置，点回来的时候滚动到离开的位置
    console.log("deactived");
    this.saveY = this.$refs.scrollComp.getScrollY();
    console.log("Home deactived：" + this.saveY);

    // 离开时，关掉轮播图
    // this.$refs.hSwiper.stopTimer();
  },
  //************************************** */

  methods: {
    /**
     * 事件监听方法
     */

    // 1. 商品导航栏 流行 新品 精选
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;

        default:
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 回到顶部点击监听
    backClick() {
      //  父组件（Home）访问子组件（Scroll）
      this.$refs.scrollComp.scrollTo(0, 0, 500);
    },

    // 监听滚动
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;
      // 2. 判断tabControl是否固定
      // console.log(this.tabControlTop);
      this.isShowTabControl = -position.y > this.tabControlTop;
    },

    // 下拉加载更多
    contentPullUp() {
      console.log("Home 加载更多");
      this.getHomeGoodsData(this.currentType);
      this.$refs.scrollComp.finishPullUp();
    },

    // 监听轮播图是否加载完，获取tabControl的offsetTop
    swiperImageLoad() {
      // console.log("Home Swiper Image Load");
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求方法
     */
    // 1. 请求首页数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 2. 请求首页商品数据
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        // console.log(res);
        // this.$refs.scrollComp.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* position: relative; */
  height: 100vh;
  /* padding-top: 44px; */
  font-size: 20px;
  text-align: center;
}

.home-nav {
  color: #fff;
  background-color: var(--color-tint);
}

.home-tab-control {
  position: relative;
  z-index: 9;
}

/* 商品展示页面 */
.goods {
  background-color: #eee;
}

/* 滚动区域 */
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  overflow: hidden;
  height: calc(100% - 93px);
  margin-top: 44px;
} */
</style>