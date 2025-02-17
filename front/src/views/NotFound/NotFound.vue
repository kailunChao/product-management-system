<template>
  <div>
    <img :src="notFound" alt="" />
  </div>
</template>

<script setup lang="ts">
import notFound from "@/assets/img/404.gif";
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

img {
  width: 1000px;
  height: 1000px;
}
</style>
