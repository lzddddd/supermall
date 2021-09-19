import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

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