<template>
  <div class="toast" v-show="isShow">
    <div class="message" >{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
      timer: null
    };
  },
  // props: {
  //   message: {
  //     type: String
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // },

  methods: {
    show(message, duration = 2000) {
      clearTimeout(this.timer);

      this.message = message;
      this.isShow = true;
      this.timer = setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  /* 定位 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 8px 20px;
  line-height: 35px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  text-align: center;

  z-index: 999;
}
</style>