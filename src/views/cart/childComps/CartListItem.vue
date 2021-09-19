<template>
  <div class="cart-item">
    
    <!-- 商品店铺信息 -->
    <div class="shop-info">
      <img :src="product.shoplogo" alt="">
      <span>{{product.shopname}}</span>
    </div>

    <div class="item-bottom">
      <!-- 商品选择框 -->
      <div class="item-selector">
          <check-button @checkBtnClick="checkedChange" :is-checked="product.checked"></check-button>
      </div>

      <!-- 商品图片 -->
      <div class="item-img">
        <img :src="product.image" alt="">
      </div>
      <!-- 商品信息 -->
      <div class="item-info">
        <div class="title">{{product.title}}</div>
        <div class="desc">{{product.desc}}</div>
        <div class="info-bottom">
          <span class="price">¥{{product.price}}</span>
          <span class="count">×{{product.count}}</span>
        </div>
      </div>
      </div>
    
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    // 点击选中按钮
    checkedChange() {
      this.product.checked = !this.product.checked;
    }
  }
};
</script>

<style scoped>
.cart-item {
  height: 170px;
  margin: 15px 10px;
  background-color: #fff;
  border-radius: 10px;
}

.item-bottom {
  display: flex;
}

/* 商店信息 */
.shop-info {
  display: flex;
  padding: 5px 35px;
  align-items: center;
  line-height: 40px;
  font-size: 14px;
}

.shop-info img {
  width: 38px;
  height: 38px;
  margin-right: 10px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.item-selector {
  width: 14%;
  display: flex;
  margin: 6px;
  justify-content: center;
  align-items: center;
}

/* 图片 */
.item-img {
  padding: 5px 10px 5px 5px;
}

.item-img img {
  display: block;
  border-radius: 10px;
  width: 80px;
  height: 100px;
}

/* 标题、描述 */
.item-info {
  position: relative;
  overflow: hidden;
  padding: 5px;
}

.title,
.desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.desc {
  margin-top: 10px;
  font-size: 13px;
  color: #666;
}

.info-bottom {
  margin-top: 30px;
  font-size: 17px;
}

.price {
  color: orange;
}

.count {
  position: absolute;
  bottom: 20px;
  right: 15px;
}
</style>