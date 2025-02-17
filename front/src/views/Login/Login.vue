<template>
  <div class="wrapper" ref="wrapper">
    <div class="box">
      <div className="circle"></div>
      <div className="form">
        <LoginForm />
      </div>
      <Girl />
    </div>
    <Cloud />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useLoginStore } from "./Login.store";
import {
  backgroundAnimation,
  cloudAnimation,
  fadeInOut,
  fadeInOutV2,
  moveCircleToLeft,
  moveCircleToRight,
  moveGirlToLeft,
  moveGirlToRight,
} from "./Login.animation";
import Cloud from "./c-cpns/Cloud/Cloud.vue";
import Girl from "./c-cpns/Girl/Girl.vue";
import LoginForm from "./c-cpns/LoginForm/LoginForm.vue";

const loginStore = useLoginStore();

const wrapper = ref<HTMLDivElement | null>(null);

onMounted(() => {
  backgroundAnimation(wrapper.value as HTMLDivElement);
  cloudAnimation(wrapper.value as HTMLDivElement);
});

watch(
  () => loginStore.moduleState,
  (newValue) => {
    console.log(21312123123, newValue);
    if (newValue === "手机号登录" || newValue === "找回密码") {
      fadeInOut(wrapper.value?.children[0].children[1] as HTMLDivElement);
      moveCircleToLeft(
        wrapper.value?.children[0].children[0] as HTMLDivElement
      );
      moveGirlToRight(wrapper.value?.children[0].children[2] as HTMLDivElement);
    } else {
      fadeInOutV2(wrapper.value?.children[0].children[1] as HTMLDivElement);
      moveCircleToRight(
        wrapper.value?.children[0].children[0] as HTMLDivElement
      );
      moveGirlToLeft(wrapper.value?.children[0].children[2] as HTMLDivElement);
    }
  }
);
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  margin: 0;
  min-height: 100%;
  height: 100%;
  background-color: #abc6f8a8;
  background-image: radial-gradient(
      closest-side,
      rgb(255, 255, 255),
      rgba(235, 105, 78, 0)
    ),
    radial-gradient(closest-side, rgb(250, 203, 203), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgb(237, 252, 202), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgb(197, 248, 241), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(243, 226, 200), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;

  .box {
    width: 900px;
    height: 500px;
    border-radius: 26px;
    background-color: #88bde809;
    box-shadow: inset 0px 0px 6px #0d5ebb20, 0px 0px 8px 1px #60676f21;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    backdrop-filter: blur(5px);
    z-index: 1;

    .pointer {
      position: absolute;
      z-index: 4;
      top: -10px;
      left: -14px;
      cursor: pointer;

      &:hover {
        color: #c6def9 !important;
      }
    }

    .circle {
      position: absolute;
      width: 700px;
      height: 700px;
      background-color: #ffffffa8;
      box-shadow: 0px 0px 6px 5px #d7d7d71f;
      border-radius: 50%;
      transform: translateX(402px);
    }

    .form {
      position: absolute;
      width: 360px;
      height: 440px;
      transform: translateX(502px);
      display: flex;
      z-index: 9;

      > div {
        width: 360px;
        height: 440px;
        flex-shrink: 0;
      }
    }
  }
}
</style>