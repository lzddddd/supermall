<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @navClick="navClick"/>
  <scroll class="content" ref="scrollComp" @scroll="contentScroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"/>
      <!-- 商品基础信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 商品评论信息 -->
      <detail-comment ref="comment" :detail-comment="detailComment"/>
      <!-- 商品店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详细信息，图片等 -->
      <detail-goods-info  ref="detailImg" :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
      <!-- 商品参数信息 -->
      <detail-param-info ref="param" :detail-param="detailParam"/>
      <!-- 商品推荐信息 -->
      <div class="recommend">
        <p>看了又看</p>
      </div>
      <goods-list ref="recommend" :goods="recommendGoods"/>
  </scroll>

  <!-- 返回顶部 -->
  <back-top  @click.native="backClick" v-show="isShowBackTop"/>
  <!-- 底部操作栏 -->
  <detail-bottom-bar @addToCart="addToCart"/>
   
  </div>
</template>

<script>
// import MainTabBar from "components/content/mainTabBar/MainTabBar";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailComment from "./childComps/DetailComment";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { itemListenMixin, backTopMixin } from "common/mixin";

import { debounce } from "common/utils";

import {
  getDetailData,
  getRecommend,
  Goods,
  ShopInfo,
  GoodsParam,
  Comments
} from "network/detail";
import { log } from "util";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      // 顶部轮播图
      topImages: [],
      // 商品信息
      goods: {},
      // 商品店铺信息
      shop: {},
      // 商品详细页面图片
      detailInfo: {},
      // 商品尺码，材料等信息
      detailParam: {},
      // 商品评论信息
      detailComment: {},
      // 底部推荐商品
      recommendGoods: [],
      // 每个组件的offsetTop
      themeTopYs: [],
      getThemeTopY: null,
      // 导航栏的index
      currentIndex: 0
    };
  },
  //************************************** */
  // 混入
  mixins: [itemListenMixin, backTopMixin],

  //************************************** */
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    DetailBottomBar,
    GoodsList,
    Scroll
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

    // 2.获取详情页数据
    this.getRecommend();

    // 3. 获取组件的offsetTop(不对)
    // this.$nextTick(() => {
    //   this.themeTopYs = [];

    //   this.themeTopYs.push(0);
    //   console.log(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    //   console.log(this.themeTopYs);
    // });

    // 4. 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.detailImg.$el.offsetTop);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      console.log(this.themeTopYs);
    }, 500);
  },
  //************************************** */
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  //************************************** */
  methods: {
    // 1. 点击导航栏，返回上一页
    goBackClick() {
      console.log("click back");
      this.$router.back(-1);
    },

    // 2. 点击导航栏
    navClick(index) {
      this.$refs.scrollComp.scrollTo(0, -this.themeTopYs[index], 500);
    },

    // 3. 详情页图片的加载监听
    detailImgLoad() {
      // 在混入mixin.js文件里的newRefresh，已经加了防抖动
      this.newRefresh();
      console.log("detailImgLoad");
      this.getThemeTopY();
    },

    // 4. 滚动监听
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // this.isShowBackTop = position.y < -1000;（混入了）
      this.listenShopBackTop(position);

      // 2. 滚动，使得navBar显示对应的组件
      const positionY = -position.y;
      let length = this.themeTopYs.length;

      // 方法一
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     console.log(i);
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // 方法二:在数组中加入一个Number.max_value
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          (positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1])
        ) {
          console.log(i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },

    // 加入购物车
    addToCart() {
      console.log("add to cart");

      // 获取购物车需要展示的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.Price = this.goods.lowNowPrice;

      // 将商品添加到购物车
      // this.$store.cartList.push(product);
      this.$store.dispatch({
        type: "addToCart",
        product
      });
    },

    /**
     * 网络请求方法
     */
    // 请求详情页数据
    getDetailData(iid) {
      getDetailData(iid).then(res => {
        console.log(res);
        // 将数据保存到data中
        const data = res.result;
        // 1.获取顶部轮播数据
        this.topImages = data.itemInfo.topImages;
        // 2. 获取商品基础信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3. 获取商品店铺信息
        this.shop = new ShopInfo(data.shopInfo);

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 5.获取商品属性，尺码等信息
        this.detailParam = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 6.获取商品评论信息
        if (data.rate.list) {
          console.log("comment");
          this.detailComment = new Comments(data.rate.cRate, data.rate.list[0]);
        }
      });
    },

    // 请求推荐数据
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        this.recommendGoods = res.data.list;
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 1;
  background-color: #fff;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 55px;
  left: 0;
  right: 0;
}

/* 推荐 */
.recommend {
  margin: 20px auto;
  text-align: center;
  color: var(--color-high-text);
  font-size: 18px;
  font-weight: 400;
}
</style>