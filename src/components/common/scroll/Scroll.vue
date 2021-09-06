<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 创建一个滚动对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动事件
    this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 上拉监听
    this.scroll.on("pullingUp", () => {
      console.log("加载更多");
      this.$emit("pullingUp");
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000);
    });
  },

  methods: {
    // 封装一个滚动方法，可以在父组件直接调用
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },

    // 结束上拉事件
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
};
</script>

<style scoped>
</style>
