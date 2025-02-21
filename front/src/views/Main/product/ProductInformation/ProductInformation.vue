<template>
  <SearchPanel @startSearch="handelStartSearch" @delete="handelStartSearch" />
  <Panel
    @create="
      () => {
        open = true;
        productModalStore.setFormMode('create');
      }
    "
    text="新增商品"
    @delete="handleDeteteButtonClick"
    :dropdown-data="dropDownData"
    @search="handleAddSearch"
    :search="true"
  />
  <ProductInformationTable
    ref="ProductInformationTableRef"
    @edit="
      () => {
        open = true;
      }
    "
  />
  <ProductInformationModal v-model:is-open="open" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePanelStore } from "../../../../components/Panel/Panel.store";
import { useSearchPanelStore } from "../../../../components/SearchPanel/SearchPanel.store";
import { useProductModalStore } from "./ProductInformationModal/ProductInformationModal.store";
import ProductInformationModal from "./ProductInformationModal/ProductInformationModal.vue";
import ProductInformationTable from "./ProductInformationTable/ProductInformationTable.vue";
import { useProductStore } from "./ProductInformation.store";

const searchPanelStore = useSearchPanelStore();

interface ProductInformationTableExposed {
  removeProducts: () => void;
}

const panelStore = usePanelStore();
const productModalStore = useProductModalStore();
const ProductInformationTableRef = ref<ProductInformationTableExposed | null>(
  null
);
const productStore = useProductStore();

const open = ref<boolean>(false);
const handleDeteteButtonClick = () => {
  if (ProductInformationTableRef.value) {
    ProductInformationTableRef.value.removeProducts();
  }
  panelStore.setDeleteButtonState("", false);
};

const handleAddSearch = (obj: { title: string; dataIndex: string }) => {
  searchPanelStore.add(obj);
};

const handelStartSearch = () => {
  productStore.setProductsAction();
};

const dropDownData = [
  {
    title: "商品名称",
    dataIndex: "name",
  },
  {
    title: "价格",
    dataIndex: "price",
  },
  {
    title: "数量",
    dataIndex: "quantity",
  },
];
</script>

<style lang="less" scoped>
</style>
