<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>


<script scoped>
export default {
  name: "NavBar"
};
</script>

<style>
.navbar {
  /* position: relative; */
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.left,
.right {
  width: 60px;
  /* background-color: red; */
}

.center {
  flex: 1;
  /* background-color: blue; */
}
</style>