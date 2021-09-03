<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

export default {
  name: "APP",
  components: { MainTabBar },
};
</script>



<style>

@import "./assets/css/base.css";

</style>
