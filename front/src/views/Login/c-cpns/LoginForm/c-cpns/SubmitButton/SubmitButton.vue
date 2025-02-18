<template>
  <a-form-item style="text-align: center">
    <a-button
      type="primary"
      html-type="submit"
      class="login-form-button"
      size="large"
      shape="round"
    >
      {{ btnText }}
    </a-button>
  </a-form-item>
</template>

<script setup lang="ts">
import useRef from "@/hooks/useRef";
import { useLoginStore } from "@/views/Login/Login.store";
import { watch } from "vue";

const loginStore = useLoginStore();

const [btnText, setBtnText] = useRef<string>("");

watch(
  () => loginStore.moduleState,
  (newValue) => {
    setTimeout(() => {
      newValue === "用户名登录" || newValue === "手机号登录"
        ? setBtnText("登录")
        : setBtnText("确认并返回登录");
    }, 500);
  },
  { immediate: true }
);
</script>  

<style lang="less" scoped>
.login-form-button {
  width: 230px;
  margin-top: 3px;
  font-size: 0.9rem;
}
</style>