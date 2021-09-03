<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  font-size: 13px;
  text-align: center;
}

.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 80%;
  margin-bottom: 10px;
}
</style>
