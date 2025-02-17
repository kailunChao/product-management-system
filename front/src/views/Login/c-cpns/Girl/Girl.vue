<template>
  <div class="pics">
    <img :src="picUrl" alt="" />
    <img :src="picUrl" alt="Shadow" />
  </div>
</template>

<script setup lang="ts">
import girl_01 from "@/assets/img/girl_01.png";
import girl_02 from "@/assets/img/girl_02.png";
import girl_03 from "@/assets/img/girl_03.png";
import { useLoginStore } from "../../Login.store";
import { watch } from "vue";
import useRef from "@/hooks/useRef";

const loginStore = useLoginStore();

const picUrlMap: Record<string, string> = {
  用户名登录: girl_01,
  手机号登录: girl_02,
  找回密码: girl_03,
};

const [picUrl, setPicUrl] = useRef(picUrlMap[loginStore.moduleState]);
watch(
  () => loginStore.moduleState,
  (newValue) => {
    setTimeout(() => {
      setPicUrl(picUrlMap[newValue]);
    }, 700);
  }
);
</script>

<style lang="less" scoped>
.pics {
  width: 560px;
  height: 560px;
  transform: translateX(-50px);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: -14px;
  }

  > img:nth-child(2) {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    filter: blur(9px);
    transform: translate(6px, 9px);
  }

  > img:nth-child(1) {
    z-index: 3;
  }
}
</style>
