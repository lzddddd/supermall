import { request2 } from 'network/request'

export function getDetailData(iid) {
  return request2({
    url: 'detail/',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request2({
    url: 'recommend/',
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrcie = itemInfo.newPrcie
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.price
    // 购物车
    this.lowNowPrice = itemInfo.lowNowPrice
  }
}

export class ShopInfo {
  constructor(ShopInfo) {
    this.logo = ShopInfo.shopLogo
    this.name = ShopInfo.name
    this.fans = ShopInfo.cFans
    this.sells = ShopInfo.cSells
    this.score = ShopInfo.score
    this.goodCount = ShopInfo.cGoods
    this.url = ShopInfo.shopUrl
  }
}


export class GoodsParam {
  constructor(info, rule) {
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set
    this.sizes = rule.tables
  }
}

export class Comments {
  constructor(cRate, list) {
    this.cRate = cRate
    this.avatar = list.user.avatar
    this.uname = list.user.uname
    this.content = list.content
    this.extraInfo = list.extraInfo ? list.extraInfo : []
    this.created = list.created
    this.style = list.style
    this.images = list.images ? list.images : []


  }
}