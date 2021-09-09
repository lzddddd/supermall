import { request2 } from 'network/request'

export function getDetailData(iid) {
  return request2({
    url: 'detail/',
    params: {
      iid
    }
  })
}
