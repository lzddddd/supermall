<template>
  <div id="cart">
    <!-- 导航栏：购物车 -->
    <nav-bar class="cart-nav">
      <h5 slot="center">购物车({{cartlength}})</h5>
      <span slot="right" class="manage">管理</span>
    </nav-bar>
    <!-- 展示购物车商品 -->
    <cart-list/>
    <!-- 底部操作栏 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  data() {
    return {};
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  //************************* */
  computed: {
    // 两种语法
    // 1.直接将getters里面的转成计算属性
    // ...mapGetters(["cartLength", "cartList"])

    // 2. 起别名
    ...mapGetters({
      cartlength: "getCartLength"
    })
  }
  //************************* */
};
</script>

<style scoped>
#cart {
  background-color: #ccc;
}

.cart-nav {
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}

.cart-nav .manage {
  margin-right: 20px;
  font-size: 14px;
}
</style>