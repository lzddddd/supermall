import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type"


export default {
  // Detail.vue  添加购物车，验证是否商品第一次加入购物车

  addCart(context, payload) {
    // state.cartList.push(payload.product)
    // 需要判断是否已存在该商品

    // 方法一：
    // let oldProduct = null
    // for (const item of state.cartList) {
    //   if (item.iid === payload.product.iid) {
    //     oldProduct = item
    //   }
    // }

    return new Promise((resolve, reject) => {
      // 方法二：
      let oldProduct = context.state.cartList.find(item => item.iid === payload.product.iid)
      // 是已经添加过的商品
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量加一')
      }
      // 是 新添加 商品
      else {
        // payload.product.count = 1
        // state.cartList.push(payload.product)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')

      }
    })

  }
}
