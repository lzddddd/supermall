<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.shopid"
     :goods-item="item" class="goods-item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      defult() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  margin-top: 8px;
  padding: 2px;
}

.goods-item {
  margin-top: 3%;
  width: 48%;
}
</style>
