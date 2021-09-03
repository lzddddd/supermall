<template>
  <div>
    <!-- tabbar组件 -->
    <tab-bar>
      <!-- 首页组件 -->
      <tab-bar-item path="/home" activeColor="blue">
        <img slot="slot-icon" src="@/assets/img/tabbar/home.svg" />
        <img
          slot="slot-icon-active"
          src="@/assets/img/tabbar/home_active.svg"
        />
        <h5 slot="slot-text">首页</h5>
      </tab-bar-item>
      <!-- 分类组件 -->
      <tab-bar-item path="/itemize">
        <img slot="slot-icon" src="@/assets/img/tabbar/category.svg" />
        <img
          slot="slot-icon-active"
          src="@/assets/img/tabbar/category_active.svg"
        />

        <h5 slot="slot-text">分类</h5>
      </tab-bar-item>
      <!-- 购物车组件 -->
      <tab-bar-item path="/cart">
        <img slot="slot-icon" src="@/assets/img/tabbar/shopcart.svg" />
        <img
          slot="slot-icon-active"
          src="@/assets/img/tabbar/shopcart_active.svg"
        />
        <h5 slot="slot-text">购物车</h5>
      </tab-bar-item>
      <!-- 我的组件 -->
      <tab-bar-item path="/profile">
        <img slot="slot-icon" src="@/assets/img/tabbar/profile.svg" />
        <img
          slot="slot-icon-active"
          src="@/assets/img/tabbar/profile_active.svg"
        />

        <h5 slot="slot-text">我的</h5>
      </tab-bar-item>
    </tab-bar>
    <!-- 显示路由 -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>