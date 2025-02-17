<template>
  <a-form-item name="password" :rules="[{ validator, trigger: 'change' }]">
    <a-input-password
      v-model:value="loginStore.formState.password"
      size="large"
      placeholder="请输入密码"
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
    ? Promise.reject("请输入密码")
    : value.length < 6
    ? Promise.reject("密码至少六位")
    : Promise.resolve();
</script>