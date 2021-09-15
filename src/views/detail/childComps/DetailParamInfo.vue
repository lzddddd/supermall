<template>
  <div class="param-info" v-if="Object.keys(detailParam).length !== 0">
    <!-- 尺码信息 -->
    <table v-for="(table,index) in detailParam.sizes" :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <!-- 商品详细信息：材料，厂家等 -->
    <table class="goods-info">
      <tr v-for="(info,index) in detailParam.infos" :key="index">
        <td class="info-key">{{info.key}}</td>
        <td class="info-value">{{info.value}}</td>
      </tr>   
    </table>
    <div class="info-img" v-if="detailParam.image.length !== 0">
      <img :src="detailParam.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    detailParam: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  padding: 15px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.goods-info {
  margin-top: 15px;
}

.info-key {
  width: 95px;
}

.info-value {
  color: #eb4868;
}

.info-img {
  width: 100%;
}
</style>