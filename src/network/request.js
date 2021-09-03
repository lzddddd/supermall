import axios from 'axios'

// 再包装一个Promise  有点多此一举：
// 之所以在instance中可以使用.then, .catch吗，是因为axios.create()返回的这个实例instance就是一个Promise

export function request(config) {

  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 发送真正的网络请求

  // 2. axios拦截器
  // 2.1 请求拦截器
  instance.interceptors.request.use(config => {
    // 2.1  拦截器的作用
    // 1. 比如config中的一些信息不符合服务器的要求

    // 2.  比如每次发送网络请求时，都希望在界面中显示一些请求的图标

    // 3.  某些网络请求（比如登录  token），必须携带一些特殊的信息

    // 拦截后，需要将config返回出去
    return config

  }, err => {
    console.log(err);
  })

  // 2.2响应拦截器
  instance.interceptors.response.use(res => {
    // 同理，需要将结果返回出去   结果只需要data
    return res.data
  }, err => {
    console.log(err);
  })


  // 返回一个Promise
  return instance(config)
}



