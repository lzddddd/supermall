<template>
  <div class="">
     <nav-bar class="detail-nav">
      <div slot="left" class="nav-left" @click="goBackClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-center">
        <span v-for="(item,index) in titles" :key="item"
          @click="itemClick(index)"
          :class="{ active: index === currentIndex }"
         >{{item}}</span>
        
      </div>
      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    // 返回上一页
    goBackClick() {
      console.log("click back");
      this.$router.back();
    },

    // 切换顶部导航
    itemClick(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
}

.nav-left {
  text-align: center;
}
.nav-left img {
  padding-top: 12px;
}

.nav-center {
  display: flex;
  font-size: 13px;
  text-align: center;
}

.nav-center span {
  flex: 1;
}

/* 顶部导航活跃状态时：样式 */
.active {
  color: var(--color-high-text);
}
</style>