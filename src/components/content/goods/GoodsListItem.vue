<template>
  <div class="goods-item" @click="goodsItemClick">
      <!-- <img :src="showImage" :alt="goodsItem.title" @load="imgLoad"> -->
      <img v-lazy="showImage" :alt="goodsItem.title" @load="imgLoad" :key="showImage">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("itemImageLoad");

      // // 方法一：
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeItemImgLoad");
      // } else if (this.$route.path.indexOf("/detail")) {
      //   this.$bus.$emit("detailItemImgLoad");
      // }
    },

    // 商品点击事件
    goodsItemClick() {
      // 因为推荐页面的商品的iid是找不到接口里面的商品的，暂时先不实现
      // let iid = this.goodsItem.iid
      //   ? this.goodsItem.iid
      //   : this.goodsItem.item_id;
      // console.log(iid);
      // this.$router.push("/detail/" + iid);
      // console.log("跳转到详情页");

      // 老方法
      // 1.获取iid
      let iid = this.goodsItem.iid;
      this.$router.push("/detail/" + iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  overflow: hidden;
  padding-bottom: 40px;
  position: relative;
  border-radius: 5px;

  background-color: #fff;
}

.goods-item img {
  width: 100%;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
