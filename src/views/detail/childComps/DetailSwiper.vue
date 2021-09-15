<template>
    <swiper class="de-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index" >
        <img :src="item" alt="">
      </swiper-item>
     </swiper>

</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  data() {
    return {};
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // imageLoad() {
    //   if (!this.isLoad) {
    //     console.log("swiperImageLoad");
    //     this.$emit("swiperImageLoad");
    //     this.isLoad = true;
    //   }
    // }
  }
};
</script>

<style scoped>
.de-swiper {
  width: 100%;
  height: 45vh;
  overflow: hidden;
}
</style>