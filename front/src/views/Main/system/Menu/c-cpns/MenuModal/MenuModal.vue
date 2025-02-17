<template>
  <a-modal
    v-model:open="open"
    :title="menuModalStore.menuModalTitle"
    :footer="null"
    style="padding-bottom: -20px"
  >
    <a-form
      :model="menuModalStore.formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="margin-top: 30px"
    >
      <a-form-item
        label="菜单名称"
        name="name"
        :rules="[{ required: true, message: '请输入菜单名!' }]"
      >
        <a-input v-model:value="menuModalStore.formState.name" />
      </a-form-item>

      <a-form-item
        v-if="menuModalStore.whichMenu === 'menu'"
        label="图标"
        name="icon"
        :rules="[{ required: true, message: '请输入图标名!' }]"
      >
        <a-input v-model:value="menuModalStore.formState.icon" />
      </a-form-item>

      <a-form-item
        v-if="menuModalStore.whichMenu === 'subMenu'"
        label="路径"
        name="path"
        :rules="[{ required: true, message: '请输入路径!' }]"
      >
        <a-input v-model:value="menuModalStore.formState.path" />
      </a-form-item>

      <a-form-item label="描述" name="introduce">
        <!-- <a-input v-model:value="menuModalStore.formState.introduce" /> -->
        <a-textarea
          v-model:value="menuModalStore.formState.introduce"
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
import {
  createSubMenuRequest,
  updateMenuRequest,
  updateSubMenuRequest,
} from "../../Menu.request";
import { createMenuRequest } from "../../Menu.request";
import { useMenuStore } from "../../Menu.store";
import { useMenuModalStore } from "./MenuModal.store";
import getDifferentAttributes from "@/utils/getDifferentAttributes";

const open = defineModel("isOpen");

const menuModalStore = useMenuModalStore();
const menuStore = useMenuStore();

const onFinish = async (values: any) => {
  console.log(values, menuModalStore.whichMenu, menuModalStore.formMode);
  if (menuModalStore.whichMenu === "menu") {
    if (menuModalStore.formMode === "create") {
      await createMenuRequest(values).then(() => {
        menuStore.setPage(1);
      });
    } else {
      await updateMenuRequest(
        menuModalStore.currentMenuId,
        getDifferentAttributes(menuModalStore.formStateCopy, values)
      );
    }
  } else {
    if (menuModalStore.formMode === "create") {
      await createSubMenuRequest({
        ...values,
        menuId: menuModalStore.currentMenuId,
      });
    } else {
      console.log(getDifferentAttributes(menuModalStore.formStateCopy, values));
      await updateSubMenuRequest(
        menuModalStore.currentMenuId,
        getDifferentAttributes(menuModalStore.formStateCopy, values)
      );
    }
  }
  menuStore.setMenusAction();
  open.value = false;
};

watch(open, (newValue) => {
  if (newValue === false) menuModalStore.resetFormState();
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
