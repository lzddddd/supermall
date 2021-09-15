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
  //************************************** */
  data() {
    return {
      scroll: null
    };
  },
  //************************************** */

  mounted() {
    // 创建一个滚动对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      observeImage: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 上拉到底部监听
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        console.log("到达底部，Scroll.vue");
        this.$emit("pullingUp");
        // setTimeout(() => {
        //   this.scroll.finishPullUp();
        // }, 2000);
      });
    }
  },
  //************************************** */

  methods: {
    // 封装一个滚动方法，可以在父组件直接调用
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 结束上拉事件
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    //每张图片加载完都刷新一次
    refresh() {
      console.log("refresh///////////");
      this.scroll && this.scroll.refresh();
    },

    // 获取滚动的Y值
    getScrollY() {
      console.log(this.scroll.y);
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>
