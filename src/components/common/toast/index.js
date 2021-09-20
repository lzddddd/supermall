import Toast from './Toast'

const obj = {}


obj.install = function (Vue) {
  // 尚未挂载元素，Toast.$el == undefined
  // console.log(Toast.$el);
  // document.body.appendChild((Toast.$el)
  // Vue.prototype.$toast = Toast

  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 根据组件构造器，可以new 一个组件对象
  const toast = new toastConstructor()

  // 3. 将组件对象，手动地挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4. toast.$el对应的是上面创建的div
  document.body.appendChild(toast.$el)

  // 5.将Toast组件加入到原型
  Vue.prototype.$toast = toast
}

// 导出
export default obj