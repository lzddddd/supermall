import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





// 购物车
import { getDetailData } from 'network/detail'
let iid = '1lqxuvu'

getDetailData(iid).then(res => {
  console.log(res);
  const data = res.result
  const product = {};
  product.iid = iid;
  product.shoplogo = data.shopInfo.shopLogo;
  product.shopname = data.shopInfo.name;
  product.image = data.itemInfo.topImages[0];
  product.title = data.itemInfo.title;
  product.desc = data.itemInfo.desc;
  product.price = data.itemInfo.lowNowPrice;

  product.count = 1
  product.checked = true

  // store.state.cartList.push(product)
})