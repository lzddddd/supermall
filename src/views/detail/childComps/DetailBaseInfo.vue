<template>
  <div v-if="Object.keys(goods).length !== 0" class="goods-info">
    <div class="goods-title">
      <p>{{goods.title}}</p>
    </div>
    <!-- 商品价格信息 -->
    <div class="goods-price">
      <span class="realPrcie">{{goods.realPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount-Desc">{{goods.discount}}</span>
    </div>
    <!-- 商品其他信息 -->
    <div class="goods-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 商品服务信息 -->
    <div class="goods-service">
      <span class="goods-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.goods-info {
  font-size: 14px;
  line-height: 20px;
  padding: 10px 5px;
  border-bottom: 5px solid #f2f5f8;
}

.goods-title {
  /* padding: 10px 5px; */
}

.goods-price {
  position: relative;
  margin-top: 8px;
}

.realPrcie {
  font-size: 18px;
  color: var(--color-tint);
}

.oldPrice {
  margin-left: 5px;
  font-size: 13px;
  text-decoration: line-through;
  color: #aaa;
}
.discount-Desc {
  position: absolute;
  margin-left: 6px;
  line-height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  font-size: 13px;
  color: #fff;
  background-color: var(--color-tint);
}

.goods-other {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  color: #aaa;
  font-size: 13px;
  text-align: center;
}

.goods-service {
  display: flex;
  /* margin-top: 8px; */
  line-height: 60px;
  justify-content: space-between;
  font-size: 12px;
}

.goods-service-item img {
  position: relative;
  top: 2px;
  width: 13px;
  height: 13px;
}
</style>