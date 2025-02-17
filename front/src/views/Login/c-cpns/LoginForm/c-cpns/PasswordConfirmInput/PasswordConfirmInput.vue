<template>
  <a-form-item
    name="passwordConfirm"
    :rules="[{ validator, trigger: 'change' }]"
  >
    <a-input-password
      v-model:value="loginStore.formState.passwordConfirm"
      size="large"
      placeholder="请再次输入密码"
    >
      <template #prefix>
        <LockOutlined />
      </template>
    </a-input-password>
  </a-form-item>
</template>

<script setup lang="ts">
import { useLoginStore } from "@/views/Login/Login.store";
import { LockOutlined } from "@ant-design/icons-vue";

const loginStore = useLoginStore();

const validator = async (_rule: any, value: string) =>
  value === ""
    ? Promise.reject("请再次输入密码")
    : value !== loginStore.formState.password
    ? Promise.reject("两次密码输入不一致")
    : Promise.resolve();
</script>