<template>
  <div class="loginForm">
    <a-form
      :model="loginStore.formState"
      ref="formRef"
      name="normal_login"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1 :style="{ margin: h1Margin }">{{ titles.title }}</h1>
      <h4>{{ titles.subTitle }}</h4>
      <img
        v-if="module !== '用户名登录'"
        :src="pointer"
        class="pointer"
        alt=""
        @click="
          loginStore.setModuleState('用户名登录');
          formRef?.resetFields();
        "
      />
      <AccountInput v-if="module === '用户名登录'" />
      <PhoneNumberInput v-if="module !== '用户名登录'" />
      <CaptchaInput
        v-if="module !== '用户名登录'"
        @checkPhoneNumber="formRef?.validateFields(['phoneNumber'])"
      />
      <PasswordInput v-if="module !== '手机号登录'" />
      <PasswordConfirmInput v-if="module === '找回密码'" />
      <LoginOption
        v-if="module !== '找回密码'"
        @reset="formRef?.resetFields()"
      />
      <SubmitButton />
      <FindPassword
        v-if="module === '用户名登录'"
        @reset="formRef?.resetFields()"
      />
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from "ant-design-vue";
import { useLoginStore } from "../../Login.store";
import { computed, ref, watch } from "vue";
import AccountInput from "./c-cpns/AccountInput/AccountInput.vue";
import PasswordInput from "./c-cpns/PasswordInput/PasswordInput.vue";
import LoginOption from "./c-cpns/LoginOption/LoginOption.vue";
import SubmitButton from "./c-cpns/SubmitButton/SubmitButton.vue";
import FindPassword from "./c-cpns/FindPassword/FindPassword.vue";
import CaptchaInput from "./c-cpns/CaptchaInput/CaptchaInput.vue";
import PhoneNumberInput from "./c-cpns/PhoneNumberInput/PhoneNumberInput.vue";
import useRef from "@/hooks/useRef";
import PasswordConfirmInput from "./c-cpns/PasswordConfirmInput/PasswordConfirmInput.vue";
import pointer from "@/assets/img/左箭头.svg";
import router from "@/router";
import { forgotPasswordRequest } from "../../Login.request";

const loginStore = useLoginStore();

const onFinish = (values: any) => {
  loginStore.moduleState === "用户名登录"
    ? loginStore
        .accountLoginAction({ name: values.account, password: values.password })
        .then((token) => {
          localStorage.setItem("token", token);
          router.push("/main");
        })
    : loginStore.moduleState === "手机号登录"
    ? loginStore
        .phoneNumberLoginAction({ phoneNumber: values.phoneNumber })
        .then((token) => {
          localStorage.setItem("token", token);
          router.push("/main");
          loginStore.setModuleState("用户名登录");
        })
    : forgotPasswordRequest({
        phoneNumber: values.phoneNumber,
        password: values.password,
        password_confirm: values.passwordConfirm,
      }).then(() => {
        loginStore.setModuleState("用户名登录");
      });
};

const [module, setModule] = useRef<string>(loginStore.moduleState);
watch(
  () => loginStore.moduleState,
  (newValue) => {
    setTimeout(() => {
      setModule(newValue);
    }, 500);
  }
);

const formRef = ref<FormInstance>();

// 表单校验错误提示
const onFinishFailed = (errorInfo: any) => {
  console.log(errorInfo.errorFields);
};

const titles = computed(() => ({
  title:
    module.value === "用户名登录"
      ? "Welcome!"
      : module.value === "手机号登录"
      ? "Login by phone"
      : "Find password",
  subTitle:
    module.value === "用户名登录"
      ? "Please login to continue"
      : module.value === "手机号登录"
      ? "Login with phone number"
      : "Secure your account easily",
}));

const h1Margin = computed(() =>
  module.value === "用户名登录"
    ? "43px 0 0 0"
    : module.value === "手机号登录"
    ? "60px 0 0 0"
    : "12px 0 0 0"
);
</script>

<style lang="less" scoped>
.loginForm {
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;

  .pointer {
    width: 50px;
    height: 44px;
    position: absolute;
    z-index: 4;
    top: -10px;
    left: -14px;
    cursor: pointer;
  }

  h1 {
    font-size: 33px;
    text-align: center;
    font-weight: 500;
    color: #1677ff;
    flex-basis: 100%;
  }

  h4 {
    margin: 10px 0 6px 0;
    font-weight: 500;
    transition: all 2s;
    text-align: center;
    color: #669ce7;
    padding: 0 0 17px 0;
  }

  > form {
    width: 80%;
  }

  :deep(.ant-input) {
    height: 30px;
  }

  :deep(.ant-input-affix-wrapper) {
    border-radius: 20px;
    padding-top: 6px;
    font-size: 15px;
  }

  .ant-otp .ant-otp-input {
    border-radius: 6px;
    height: 40px;
  }
}
</style>
