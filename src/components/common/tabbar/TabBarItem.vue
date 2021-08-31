<template>
  <div class="tab-bar-item" @click="itemClick">

    <!-- 动态决定展示内容 -->

    <!-- 不活跃时的图片插槽 -->
    <div v-if="!isActive">
      <slot name="slot-icon"></slot>
    </div>

    <!-- 活跃时的图片插槽 -->
    <div v-else>
      <slot name="slot-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="slot-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  methods: {
    itemClick() {
      // console.log("click");
      this.$router.push(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item h5 {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
  /* line-height: 0; */
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}

/* 活跃状态时，文字的样式 */
/* 不能写死，封装不彻底 */
/* .active {
  color: red;
} */
</style>