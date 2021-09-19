<template>
  <div>
     <div class="icon-selector" :class="{'selector-active': isChecked}" @click="selectItem">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem() {
      this.$emit("checkBtnClick");
    }
  }
};
</script>

<style scoped>
.icon-selector {

  width: 22px;
  height: 22px;
  border: 2px solid #ccc;
  border-radius: 50%;
}

.icon-selector img {
  width: 16px;
  height: 16px;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>