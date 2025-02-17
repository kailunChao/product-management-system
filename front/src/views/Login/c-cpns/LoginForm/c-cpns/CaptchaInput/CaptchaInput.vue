<template>
  <a-form-item name="captcha" :rules="[{ validator, trigger: 'change' }]">
    <div style="display: flex">
      <a-input
        v-model:value="loginStore.formState.captcha"
        :maxlength="6"
        style="margin-right: 1rem"
      >
        <template #prefix>
          <MailOutlined />
        </template>
      </a-input>
      <a-button
        :disabled="countdown > 0"
        type="primary"
        size="large"
        style="border-radius: 20px; font-size: 0.85rem"
        @click="sendCaptcha"
      >
        {{ buttonText }}
      </a-button>
    </div>
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { MailOutlined } from "@ant-design/icons-vue";
import validatePhoneNumber from "@/utils/validatePhoneNumber";
import { createCaptchaRequest } from "../../../../Login.request";
import { useLoginStore } from "@/views/Login/Login.store";

const emit = defineEmits<{
  checkPhoneNumber: [];
}>();

const loginStore = useLoginStore();
const countdown = ref(0);
let timer: NodeJS.Timeout | null = null;

// 计算按钮文字
const buttonText = computed(() =>
  countdown.value > 0 ? `${countdown.value}秒后重新发送` : "发送验证码"
);

// 清理定时器
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

// 启动倒计时
const startCountdown = () => {
  countdown.value = 60;
  timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

// 发送验证码逻辑
const sendCaptcha = async () => {
  validatePhoneNumber(loginStore.formState.phoneNumber)
    .then(() => {
      createCaptchaRequest({
        phoneNumber: loginStore.formState.phoneNumber,
      }).then(() => {
        startCountdown(); // 请求成功后再启动倒计时
      });
    })
    .catch(() => {
      emit("checkPhoneNumber");
    });
};

// 表单验证逻辑
const validator = async (_rule: any, value: string) => {
  if (!value) return Promise.reject("请输入验证码");
  if (value.length !== 6) return Promise.reject("验证码必须为6位");
  return Promise.resolve();
};
</script>