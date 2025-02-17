<template>
  <Panel
    @create="
      () => {
        open = true;
        categoryModalStore.setFormMode('create');
        categoryModalStore.setWhichCategory('category');
      }
    "
    text="新增分类"
    :search="false"
    @delete="handleDeteteButtonClick"
  />
  <ProductCategoryTable
    @open="
      () => {
        open = true;
      }
    "
    ref="productCategoryTableRef"
  />
  <ProductCategoryModal v-model:is-open="open" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePanelStore } from "../../../../components/Panel/Panel.store";
import { useCategoryModalStore } from "./c-cpns/ProductCategoryModal/ProductCategoryModal.store";
import ProductCategoryTable from "./c-cpns/ProductCategoryTable/ProductCategoryTable.vue";
import ProductCategoryModal from "./c-cpns/ProductCategoryModal/ProductCategoryModal.vue";

interface ProductCategoryTableExposed {
  removeCategories: () => void;
  removeSubCategories: () => void;
}

const open = ref<boolean>(false);
const categoryModalStore = useCategoryModalStore();
const panelStore = usePanelStore();
const productCategoryTableRef = ref<ProductCategoryTableExposed | null>(null);

const handleDeteteButtonClick = () => {
  if (productCategoryTableRef.value) {
    productCategoryTableRef.value.removeCategories();
    productCategoryTableRef.value.removeSubCategories();
  }
  panelStore.setDeleteButtonState("", false);
};
</script>

<style lang="less" scoped>
</style>
