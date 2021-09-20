<template>
  <div class="bottom-bar">
    <!-- 选择框 -->
    <div class="selector" @click="selectAllClick">
      <check-button class="check-button" :is-checked="isSelectAll" />
      <span class="text">全选</span>
    </div>
    <!-- 总价 -->
    <div class="price">
      <span>合计：<span class="orange">¥{{getPriceSum}}</span></span>
    </div>

    <!-- 结算按钮 -->
    <div class="settlement" @click="settleClick">
      <span>去结算({{checkedLength}})</span>
    </div>
  </div>
</template>


<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "cartList",
      "getCartLength",
      "getPriceSum",
      "checkedLength"
    ]),
    isSelectAll() {
      // 其他选择框  控制  全选框
      // 方法一：filter实现
      // return this.getCartLength === this.checkedLength;

      // 方法二：find函数(只要发现有没选中的就不全选)
      return (
        !this.cartList.find(item => !item.checked) && this.getCartLength !== 0
      );
    }
  },
  methods: {
    // 全选
    selectAllClick() {
      // 改变全选的选择
      // this.isChecked = !this.isChecked;
      // // 全选框控制其他选择框
      // for (let i = 0; i < this.getCartLength; i++) {
      //   if (this.isChecked) {
      //     this.$store.state.cartList[i].checked = true;
      //   } else if (!this.isChecked) {
      //     this.$store.state.cartList[i].checked = false;
      //   }
      // }

      // 方法二：
      if (this.isSelectAll) {
        this.cartList.forEach(item => (item.checked = false));
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    },

    // 结算按钮为0时，弹出提示
    settleClick() {
      if (!this.isSelectAll) {
        //如果没有任何选中
        this.$toast.show("请选择至少一件商品");
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: absolute;
  display: flex;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-size: 17px;
}

.selector {
  display: flex;
  margin-left: 15px;
  align-items: center;
}

.selector .text {
  margin-left: 20px;
  line-height: 40px;
}

.check-button {
  margin-bottom: 3px;
  width: 20px;
  height: 20px;
}

.price {
  position: absolute;
  right: 105px;
  line-height: 40px;
}

.orange {
  color: rgb(240, 102, 11);
}
/* 去结算 */
.settlement {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color: var(--color-tint);
  text-align: center;
}
</style>