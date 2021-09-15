<template>
  <div  class="bottom-bar">
    <!-- 底部左侧 -->
    <div class="bottom-left bar-item">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <!-- 底部右侧 -->
    <div class="botoom-right bar-item">
      <div class="add-cart" @click="addToCart">加入购物车</div>
      <div class="purchase">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55px;
  background-color: #ffffff;

  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bottom-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bottom-left .service {
  background-position: 0 -53px;
}

.bottom-left .shop {
  background-position: 0 -98px;
}

.bottom-left {
  font-size: 15px;
}

.bottom-right > div {
  line-height: 55px;
}

.add-cart {
  line-height: 55px;
  color: #333;
  background-color: #ffe817;
}

.purchase {
  line-height: 55px;
  color: #ffffff;
  background-color: #f69;
}
</style>