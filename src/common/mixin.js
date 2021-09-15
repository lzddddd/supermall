import { debounce } from './utils'
import BackTop from "components/content/backtop/BackTop";
import { BACKTOP_DISTANCE } from './const'

export const itemListenMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scrollComp.refresh, 500)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('我是混入中的内容mixin');
  }
}

export const backTopMixin = {
  data() {
    return {
      // 是否显示 “回到顶部”按钮
      isShowBackTop: false
    }
  },
  components: { BackTop },
  methods: {
    // 5.返回顶部点击
    backClick() {
      this.$refs.scrollComp.scrollTo(0, 0, 500);
    },
    listenShopBackTop(position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE;

    }
  }
}