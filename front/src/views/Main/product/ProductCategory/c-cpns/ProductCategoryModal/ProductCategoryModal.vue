<template>
  <a-modal
    v-model:open="open"
    :title="categoryModalStore.categoryModalTitle"
    :footer="null"
    style="padding-bottom: -20px"
  >
    <a-form
      :model="categoryModalStore.formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="margin-top: 30px"
    >
      <a-form-item
        label="分类名称"
        name="name"
        :rules="[{ required: true, message: '请输入分类名称!' }]"
      >
        <a-input v-model:value="categoryModalStore.formState.name" />
      </a-form-item>

      <a-form-item
        v-if="categoryModalStore.whichCategory === 'category'"
        label="图标"
        name="icon"
        :rules="[{ required: true, message: '请输入图标名!' }]"
      >
        <a-input v-model:value="categoryModalStore.formState.icon" />
      </a-form-item>

      <a-form-item label="描述" name="introduce">
        <a-textarea
          v-model:value="categoryModalStore.formState.introduce"
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
import getDifferentAttributes from "@/utils/getDifferentAttributes";
import { useCategoryModalStore } from "./ProductCategoryModal.store";
import { useCategoryStore } from "../../ProductCategory.store";
import {
  createCategoryRequest,
  createSubCategoryRequest,
  updateCategoryRequest,
  updateSubCategoryRequest,
} from "../../ProductCategory.request";

const open = defineModel("isOpen");

const categoryModalStore = useCategoryModalStore();
const categoryStore = useCategoryStore();

const onFinish = async (values: any) => {
  console.log(
    values,
    categoryModalStore.whichCategory,
    categoryModalStore.formMode
  );
  if (categoryModalStore.whichCategory === "category") {
    if (categoryModalStore.formMode === "create") {
      await createCategoryRequest(values).then(() => {
        categoryStore.setPage(1);
      });
    } else {
      await updateCategoryRequest(
        categoryModalStore.currentCategoryId,
        getDifferentAttributes(categoryModalStore.formStateCopy, values)
      );
    }
  } else {
    if (categoryModalStore.formMode === "create") {
      await createSubCategoryRequest({
        ...values,
        categoryId: categoryModalStore.currentCategoryId,
      });
    } else {
      console.log(
        getDifferentAttributes(categoryModalStore.formStateCopy, values)
      );
      await updateSubCategoryRequest(
        categoryModalStore.currentCategoryId,
        getDifferentAttributes(categoryModalStore.formStateCopy, values)
      );
    }
  }
  categoryStore.setCategoriesAction();
  open.value = false;
};

watch(open, (newValue) => {
  if (newValue === false) categoryModalStore.resetFormState();
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
