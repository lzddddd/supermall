import { request, request2 } from 'network/request'

export function getHomeMultidata() {
  return request({
    url: 'home/multidata'
  })
}


export function getHomeGoodsData(type, page) {
  return request2({
    url: 'home/data',
    params: {
      type, page
    }
  })
}