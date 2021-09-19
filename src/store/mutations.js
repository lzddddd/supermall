import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.product.count = 1
    payload.product.checked = false
    state.cartList.push(payload.product)
  }
}