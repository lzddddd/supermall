<template>
  <div>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <!-- 商品描述 start-->
      <div class="goods-desc clearfix">
        <div class="start"></div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <!-- 商品描述 end -->
      <div class="goods-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="image-list">
        <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      this.$emit("detailImgLoad");
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.desc {
  padding: 10px 15px;
  font-size: 14px;
}

.goods-desc .start,
.goods-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.goods-desc .start {
  float: left;
}

.goods-desc .start::before,
.goods-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.goods-desc .end::after {
  right: 0;
}

.goods-desc .end {
  float: right;
}

.goods-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

/* 图片列表 */
.image-list {
  margin: 18px;
}

.image-list img {
  width: 100%;
}
</style>