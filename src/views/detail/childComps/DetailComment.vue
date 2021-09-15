<template>
  <div v-if="Object.keys(detailComment).length !== 0" class="goods-comment">
    <!-- 评价标题 -->
    <div class="title">
      <h5>用户评价（{{detailComment.cRate}}）</h5>
     <div class="more">
       <span>更多</span>
       <i class="arrow-right"></i>
     </div>
    </div>
    <!-- 用户头像，名称 -->
    <div class="user-info">
      <img :src="detailComment.avatar" alt="用户头像">
      <span>{{detailComment.uname}}</span>
    </div>
    <!-- 评论内容 -->
    <div class="all-comment">
      <div class="comment-content">
        <p>{{detailComment.content}}</p>
      </div> 

      <!-- 评论额外信息，不一定有 -->
      <div class="extra-info">
       <p v-for="(info,index) in detailComment.extraInfo" :key="index">{{info}}</p>
      </div>
    </div>
    
    <!-- 评论的其他信息：日期，购买款式 -->
    <div class="comment-other">
      <span>{{detailComment.created |showDate}}</span>
      <span>{{detailComment.style}}</span>
    </div>

    <!-- 评论图片，不一定有 -->
    <div class="commnet-img">
      <img v-for="(img,index) in detailComment.images" :key="index" :src="img" alt="">
    </div>
  </div>


  <!-- 评论图片 -->
</template>

<script>
import { formatDate } from "@/common/utils";

export default {
  name: "DetailComment",
  props: {
    detailComment: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showDate(value) {
      // 将时间戳（单位：秒）转换成Date对象
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style scoped>
.goods-comment {
  padding: 5px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}

.title h5 {
  float: left;
  font-size: 15px;
  font-weight: 400;
}

.title .more {
  float: right;
  margin-right: 15px;
  font-size: 13px;
}

.title .more i {
  margin-right: 15px;
}

/* 用户头像 名称 */
.user-info {
  display: flex;
  align-items: center;
  padding: 10px 8px;
  line-height: 45px;
}

.user-info h5 {
  vertical-align: top;
}

.user-info img {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* 评价内容 */
.all-comment {
  padding: 5px 8px;
  line-height: 20px;
}

.comment-content {
  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本行数 */
  -webkit-line-clamp: 2;
  /* 设置或检索伸缩盒对象的子元素的排列元素 */
  -webkit-box-orient: vertical;
}

.extra-info {
  margin-top: 10px;
}

/* 评价其他信息：日期，款式 */
.comment-other {
  padding: 5px 8px;
  font-size: 12px;
  color: #aaa;
}

.comment-other span:last-child {
  margin-left: 10px;
}

/* 评论图片 */
.commnet-img {
  overflow: hidden;
  margin-top: 10px;
}

.commnet-img img {
  margin-left: 5px;
  width: 100px;
  height: 100px;
}
</style>