<template>
  <img :src="cloud_blue" alt="" class="cloudBlue" />
  <img :src="cloud_pink" alt="" class="cloudPink" />
  <img :src="cloud_orange" alt="" class="cloudOrange" />
</template>

<script setup lang="ts">
import cloud_blue from "@/assets/img/cloud_blue.png";
import cloud_pink from "@/assets/img/cloud_pink.png";
import cloud_orange from "@/assets/img/cloud_orange.png";
</script>

<style lang="less" scoped>
.cloudBlue,
.cloudPink,
.cloudOrange {
  position: absolute;
  left: 50%;
  top: 50%;
}

.cloudBlue {
  width: 666px;
  height: 666px;
  transform: translate(-806px, -490px);
}

.cloudPink {
  width: 400px;
  height: 400px;
  transform: translate(190px, -409px);
}

.cloudOrange {
  z-index: 9;
  width: 270px;
  height: 155px;
  opacity: 0.9;
  transform: translate(303px, 144px);
}
</style>
