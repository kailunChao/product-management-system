<template>
  <div class="findPassword" style="text-align: center">
    忘记密码?<a @click.prevent="handleFindPasswordClick">立即找回</a>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from "@/views/Login/Login.store";

const loginStore = useLoginStore();

const emit = defineEmits<{
  reset: [];
}>();

const handleFindPasswordClick = () => {
  loginStore.resetPassword();
  loginStore.resetCaptcha();
  loginStore.setModuleState("找回密码");
  emit("reset");
};
</script>

<style lang="less" scoped>
.findPassword {
  a {
    color: @link-color;
    &:hover {
      color: @link-hover-color;
    }
  }
}
</style>
