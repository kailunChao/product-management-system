<template>
  <a-form-item name="phoneNumber" :rules="[{ validator, trigger: 'change' }]">
    <a-input :maxlength="11" v-model:value="loginStore.formState.phoneNumber">
      <template #prefix>
        <PhoneOutlined />
      </template>
    </a-input>
  </a-form-item>
</template>

<script setup lang="ts">
import { useLoginStore } from "@/views/Login/Login.store";

import { PhoneOutlined } from "@ant-design/icons-vue";
import validatePhoneNumber from "@/utils/validatePhoneNumber";

const loginStore = useLoginStore();

const validator = async (_rule: any, value: string) =>
  validatePhoneNumber(value);
</script>