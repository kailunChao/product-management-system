<template>
  <div class="loginOption">
    <a-form-item name="remember" no-style>
      <a-checkbox
        v-model:checked="loginStore.formState.remember"
        style="margin-left: 0.3rem"
        >记住我</a-checkbox
      >
    </a-form-item>
    <a
      class="login-form-forgot"
      href=""
      @click.prevent="handleLoginOptionClick"
      >{{
        module === "用户名登录"
          ? "手机号登录?"
          : module === "手机号登录"
          ? "账号登录?"
          : ""
      }}</a
    >
  </div>
</template>

<script setup lang="ts">
import useRef from "@/hooks/useRef";
import { useLoginStore } from "@/views/Login/Login.store";
import { watch } from "vue";

const emit = defineEmits<{
  reset: [];
}>();

const loginStore = useLoginStore();

const [module, setModule] = useRef<string>(loginStore.moduleState);
watch(
  () => loginStore.moduleState,
  (newValue) => {
    setTimeout(() => {
      setModule(newValue);
    }, 500);
  }
);

const handleLoginOptionClick = () => {
  loginStore.moduleState === "用户名登录"
    ? loginStore.setModuleState("手机号登录")
    : loginStore.setModuleState("用户名登录");
  emit("reset");
};
</script>

<style lang="less" scoped>
.loginOption {
  display: flex;
  justify-content: space-between;
  transform: translateY(-5px);
  margin-bottom: 10px;

  a {
    color: @link-color;
    &:hover {
      color: @link-hover-color;
    }
  }
}
</style>