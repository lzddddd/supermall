<template>
  <div class="shop-info">
    <!-- 店铺logo 名称 -->
   <a :href="shop.url">
      <div class="shop-name">
        <img :src="shop.logo" alt="">
        <span>{{shop.name}}</span>
    </div>
   </a>

    <!-- 店铺销量 宝贝数量 评分 -->
    <div class="shop-middle">
      <!-- 销量 -->
      <div class="shop-sale shop-middle-item">
        <p>{{shop.sells | sellCountFilter}}</p>
        <p>总销量</p>
      </div>
      <!-- 宝贝数量 -->
      <div class="shop-count shop-middle-item">
        <p>{{shop.goodCount}}</p>
        <p>全部宝贝</p>
      </div>
      <!-- 店铺评分 -->
      <div class="shop-score">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-than-other' : item.isBetter}"><span>{{item.isBetter ? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>

    </div>
    <!-- shop-middle END -->

    <!-- 进入店铺 -->
    <div class="shop-bottom">
      <a :href="shop.url">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter(count) {
      if (count < 10000) return count;
      return (count / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped>
.shop-info {
  padding: 15px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.shop-name {
  display: flex;
  align-items: center;
  line-height: 45px;
}

.shop-name img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-middle {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
  font-size: 13px;
  text-align: center;
}

.shop-middle-item {
  flex: 1;
}

.shop-middle-item p {
  line-height: 26px;
  font-size: 16px;
}

.shop-count {
  border-right: 1px solid #ccc;
}

.shop-score {
  margin-left: 20px;
  line-height: 24px;
}

.shop-score td {
  padding: 0 3px;
}

/* 评分默认 */
.shop-score .score {
  color: #5ea732;
}
/* 评分更高时 */
.shop-score .score-better {
  color: #f13e3a;
}

/* 高？ 低？ */
.shop-score .better {
  background-color: #5ea732;

  color: #fff;
}

.shop-score .better-than-other {
  background-color: #f13e3a;
}

/* 进店逛逛 */
.shop-bottom {
  margin-top: 16px;
  text-align: center;
}

.shop-bottom a {
  display: inline-block;
  padding: 5px 30px;
  border-radius: 8px;
  background-color: #aaa;
  color: #fff;
}
</style>