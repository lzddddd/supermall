module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375,    //视窗的宽度对应的是设计稿的宽度
      viewportHeight: 667,   //视窗的高度对应的是设计稿的宽度（也可以不设置）
      unitPrecision: 5,      //指定'px'转换成的视窗单位值的小数位数（因为很多时候无法整除）
      viewportUnit: 'vw',     //指定'px'转换成的视窗单位，建议使用vw
      //指定不需要转换的类
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],
      minPixelValue: 1,        //小于或等于'1px'不转换为视窗单位
      mediaQuery: false       //允许在媒体查询中转换为'px'
    }
  }
}