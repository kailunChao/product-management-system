<template>
  <a-modal
    v-model:open="open"
    :title="roleModalStore.menuModalTitle"
    :footer="null"
    style="padding-bottom: -20px"
  >
    <a-form
      :model="roleModalStore.formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="margin-top: 30px"
    >
      <a-form-item
        label="角色名称"
        name="name"
        :rules="[{ required: true, message: '请输入角色名!' }]"
      >
        <a-input v-model:value="roleModalStore.formState.name" />
      </a-form-item>
      <a-form-item label="菜单权限" name="menus">
        <a-tree
          :field-names="{
            title: 'name',
            key: 'id',
            children: 'subMenus',
          }"
          checkable
          :tree-data="menuStore.allMenus"
          v-model:checkedKeys="roleModalStore.checkedKeys"
        >
          <template #title="{ name }">
            {{ name }}
          </template>
        </a-tree>
      </a-form-item>
      <a-form-item label="描述" name="introduce">
        <a-textarea
          v-model:value="roleModalStore.formState.introduce"
          placeholder="请输入描述"
          :rows="5"
          show-count
          :maxlength="100"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 17 }" style="margin: 10px 0 -20px 0">
        <a-button @click="resetForm">取消</a-button>
        <a-button style="margin-left: 10px" type="primary" html-type="submit"
          >确认</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoleModalStore } from "./RoleModal.store";
import { useMenuStore } from "../../../Menu/Menu.store";
import { createRoleRequest, updateRolesRequest } from "../../Role.request";
import { useRoleStore } from "../../Role.store";
import getDifferentAttributes from "@/utils/getDifferentAttributes";

const open = defineModel("isOpen");

const roleModalStore = useRoleModalStore();
const menuStore = useMenuStore();
menuStore.setAllMenusAction();
const roleStore = useRoleStore();

const onFinish = async (values: any) => {
  const menus = menuStore.allMenus.map((item) => item.id);

  roleModalStore.formMode === "create"
    ? await createRoleRequest({
        ...values,
        subMenus: roleModalStore.checkedKeys.filter(
          (key) => !menus.includes(key)
        ),
      }).then(() => {
        roleStore.setPage(1);
      })
    : await updateRolesRequest(roleModalStore.currentRoleId, {
        ...getDifferentAttributes(roleModalStore.formStateCopy, values),
        subMenus: roleModalStore.checkedKeys.filter(
          (key) => !menus.includes(key)
        ),
      });
  open.value = false;
  roleStore.setRolesAction();
};

watch(open, (newValue) => {
  if (newValue === false) {
    roleModalStore.resetFormState();
    roleModalStore.setCheckedKeys([]);
  }
});

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const resetForm = () => {
  open.value = false;
};
</script>

<style lang="less" scoped>
</style>
