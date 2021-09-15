<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <h5 slot="center">购物车({{cartlength}})</h5>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  data() {
    return {};
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
  },
  //************************* */
  components: {
    NavBar
  }
};
</script>

<style scoped>
.cart-nav {
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>