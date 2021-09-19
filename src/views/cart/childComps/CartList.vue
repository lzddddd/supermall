<template>
  <div class="cart-list">
    <scroll ref="scrollComp" class="content">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product='item'/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scrollComp.refresh();
  }
};
</script>

<style scoped>
.cart-list {
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  /* 底部tabBar */
  bottom: 89px;
  left: 0;
  right: 0;
  background-color: #eee;
}
</style>