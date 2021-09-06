<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h5 slot="center">购物街</h5>
    </nav-bar>

    <scroll class="content" ref="scrollComp"
    :probe-type="3" :pull-up-load="true"
    @scroll="contentScroll"
    @pullingUp="contentPullUp"> 
      <!-- 轮播图 -->
      <home-swiper :banners = "banners"/>
      <!-- 推荐内容 -->
      <recommend-view :recommends="recommends" />
      <!-- 本周流行 -->
      <feature-view/>
      <!-- tab-control -->
      <tab-control class="home-tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
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
      isShowBackTop: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
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

  // 组件创建时回调
  created() {
    // 1. 请求首页数据
    this.getHomeMultidata();
    // 2. 请求首页商品数据
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },

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
    },

    // 回到顶部点击监听
    backClick() {
      //  父组件（Home）访问子组件（Scroll）
      this.$refs.scrollComp.scrollTo(0, 0, 500);
    },

    // 监听滚动
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000;
    },

    // 下拉加载更多
    contentPullUp() {
      console.log("Home 加载更多");
      this.getHomeGoodsData(this.currentType);
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
  position: relative;
  height: 100vh;
  padding-top: 44px;
  font-size: 20px;
  text-align: center;
}

.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  color: #fff;
  background-color: var(--color-tint);
}

.home-tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

/* 商品展示页面 */
.goods {
  background-color: #eee;
}

/* 滚动区域 */
.content {
  position: absolute;
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