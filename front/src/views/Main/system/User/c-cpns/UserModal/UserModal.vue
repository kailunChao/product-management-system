<template>
  <a-modal
    v-model:open="open"
    :title="userModalStore.userModalTitle"
    :footer="null"
    style="padding-bottom: -20px"
  >
    <a-form
      :model="userModalStore.formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="margin-top: 30px"
    >
      <a-form-item
        label="用户名"
        name="name"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="userModalStore.formState.name" />
      </a-form-item>
      <a-form-item
        label="姓名"
        name="realname"
        :rules="[{ required: true, message: '请输入真实姓名!' }]"
      >
        <a-input v-model:value="userModalStore.formState.realname" />
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
        style="display: flex"
        v-if="userModalStore.formMode === 'create'"
      >
        <a-input-password v-model:value="userModalStore.formState.password" />
      </a-form-item>
      <a-form-item
        label="手机号"
        name="phoneNumber"
        :rules="[{ required: true, message: '请输入手机号!' }]"
        disabled
      >
        <a-input v-model:value="userModalStore.formState.phoneNumber" />
      </a-form-item>

      <a-form-item
        name="role"
        label="角色"
        :rules="[{ required: true, message: '请选择角色' }]"
      >
        <a-select
          v-model:value="userModalStore.formState.role"
          placeholder="请选择角色"
        >
          <a-select-option
            v-for="item in roleStore.allRoles"
            :key="item.id"
            :value="item.name"
            >{{ item.name }}</a-select-option
          >
          <a-select-option value="暂不选择">暂不选择</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="是否启用" name="enable">
        <a-switch v-model:checked="userModalStore.formState.enable" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 17 }" style="margin: 0 0 -20px 0">
        <a-button @click="resetForm">取消</a-button>
        <a-button style="margin-left: 10px" type="primary" html-type="submit"
          >确认</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import getDifferentAttributes from "@/utils/getDifferentAttributes";
import { watch } from "vue";
import { useRoleStore } from "../../../Role/Role.store";
import { createUserRequest, updateUserByIdRequest } from "../../User.request";
import { useUserStore } from "../../User.store";
import { useUserModalStore } from "./UserModal.store";

const roleStore = useRoleStore();
roleStore.setAllRolesAction();
const userStore = useUserStore();
const userModalStore = useUserModalStore();

const open = defineModel("isOpen");

const onFinish = async (values: any) => {
  const role = roleStore.allRoles.find((item) => item.name === values.role);

  if (userModalStore.formMode === "create") {
    await createUserRequest({
      ...values,
      role: values.role === "暂不选择" ? null : role?.id,
    }).then(() => {
      userStore.setPage(1);
    });
  } else {
    const obj = getDifferentAttributes(userModalStore.formStateCopy, values);
    obj.role = obj.role
      ? obj.role === "暂不选择"
        ? null
        : role?.id
      : undefined;
    await updateUserByIdRequest(userModalStore.currentUserId, obj).then(() => {
      userModalStore.resetFormStateCopy();
    });
  }
  userStore.setUsersAction();

  // for (let index = 0; index < 100; index++) {
  //   createUserRequest({
  //     name: `test${index}`,
  //     realname: `测试${index}`,
  //     password: "123456",
  //     phoneNumber: String(Date.now()).slice(-11),
  //     role: null,
  //     enable: "",
  //   });
  // }

  open.value = false;
};

watch(open, (newValue) => {
  if (newValue === false) userModalStore.resetFormState();
});

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const resetForm = () => {
  userModalStore.resetFormState();
  open.value = false;
};
</script>

<style lang="less" scoped>
</style>
