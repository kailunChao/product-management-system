<template>
  <a-form-item name="account" :rules="[{ validator, trigger: 'change' }]">
    <a-input
      v-model:value="loginStore.formState.account"
      :maxlength="11"
      size="large"
      placeholder="请输入用户名"
    >
      <template #prefix>
        <UserOutlined />
      </template>
    </a-input>
  </a-form-item>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { useLoginStore } from "@/views/Login/Login.store";

const loginStore = useLoginStore();

const validator = async (_rule: any, value: string) =>
  value === "" ? Promise.reject("请输入用户名") : Promise.resolve();
</script>