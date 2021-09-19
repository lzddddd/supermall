export default {
  getCartLength(state) {
    return state.cartList.length
  },
  
  cartList(state) {
    return state.cartList
  },
  // 计算总价
  getPriceSum(state) {
    return state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.price * item.count
    }, 0).toFixed(2)
  },

  // 选中的商品个数
  checkedLength(state) {
    return state.cartList.filter(item => {
      return item.checked
    }).length
  }


}

