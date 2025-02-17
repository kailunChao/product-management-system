<template>
  <a-table
    :columns="columns"
    :data-source="productStore.products"
    :pagination="false"
    :scroll="{ x: 'max-content', y: 6 * 91 }"
    :row-selection="rowSelection"
    rowKey="id"
  >
    <template #bodyCell="{ column, record, text }">
      <template v-if="['name', 'introduce'].includes(column.dataIndex)">
        <p class="withoutText" v-if="text === ''">暂无</p>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-if="column.key === 'pics'">
        <a-badge
          v-if="record?.pics.length > 0"
          :count="record?.pics.length"
          :number-style="{ backgroundColor: '#52c41a' }"
        >
          <a-image-preview-group>
            <div style="width: 100px; height: 100px; overflow: hidden">
              <a-image
                v-for="item in record.pics"
                :key="item.id"
                :width="100"
                :src="BASE_URL + item.path"
              />
            </div>
          </a-image-preview-group>
        </a-badge>
      </template>
      <template v-if="column.key === 'operation'">
        <a-typography-link @click="handleEditProduct(record.id)"
          >编辑</a-typography-link
        >
        <a-typography-link
          style="margin-left: 0.5rem"
          @click="handleDeleteProduct(record.id)"
          >删除</a-typography-link
        >
      </template>
    </template>
  </a-table>
  <a-pagination
    v-model:current="productStore.page"
    :defaultPageSize="productStore.row"
    :total="productStore.total"
    style="margin-top: 0.8rem; float: right"
    :pageSizeOptions="['8', '20', '50', '100']"
    @change="handleChange"
    :showSizeChanger="true"
  />
</template>

<script lang="ts" setup>
import useRef from "@/hooks/useRef";
import { watch } from "vue";
import { useProductStore } from "../ProductInformation.store";
import _ from "lodash";
import { usePanelStore } from "@/components/Panel/Panel.store";
import { useCategoryStore } from "../../ProductCategory/ProductCategory.store";
import { useProductModalStore } from "../ProductInformationModal/ProductInformationModal.store";
import { removeProductsRequest } from "../ProductInformation.request";
import { BASE_URL } from "@/config";
import changePicsToFileList from "@/utils/changePicsToFileList";

const emit = defineEmits<{
  edit: [];
}>();

const panelStore = usePanelStore();
const categoryStore = useCategoryStore();
categoryStore.setAllCategoriesAction();
const productStore = useProductStore();
productStore.setProductsAction();
const productModalStore = useProductModalStore();

// 分页器变化
const handleChange = (page: number, pageSize: number) => {
  setSelectedRowKeys([]);
  pageSize !== productStore.row
    ? productStore.setPage(1)
    : productStore.setPage(page);
  productStore.setRow(pageSize);
  productStore.setProductsAction();
};

const handleEditProduct = (id: string) => {
  const product = productStore.products.find((item) => item.id === id);
  console.log(product);
  if (product) {
    productModalStore.setFormState({
      ...product,
      subCategoryId: [product.category.id, product.category.subCategory.id],
    });
    productModalStore.setFormStateCopy({
      ...product,
      subCategoryId: [product.category.id, product.category.subCategory.id],
    });
  }
  productModalStore.setFormMode("update");
  productModalStore.setCurrentProductId(id);
  productModalStore.setFileList(changePicsToFileList(product!.pics));
  productModalStore.setTabDisabled(false);
  emit("edit");
};

const handleDeleteProduct = (id: string) => {
  removeProductsRequest({ ids: [id] }).then(() => {
    productStore.setProductsAction();
  });
};

// 选择框选中的keys
const [selectedRowKeys, setSelectedRowKeys] = useRef<string[]>([]);
const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (selectedRowKeys: string[]) => {
    setSelectedRowKeys(selectedRowKeys);
  },
};

// 处理panel中的删除按钮
watch(selectedRowKeys, (n, _) => {
  console.log(selectedRowKeys);
  n.length > 0
    ? n.length === 1
      ? panelStore.setDeleteButtonState("删除商品", true)
      : panelStore.setDeleteButtonState("批量删除", true)
    : panelStore.setDeleteButtonState("", false);
});

// 删除角色
const removeProducts = () => {
  removeProductsRequest({ ids: selectedRowKeys.value })
    .then(() => {
      productStore.setProductsAction();
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

defineExpose({ removeProducts });

const columns = [
  {
    title: "商品名称",
    dataIndex: "name",
    key: "name",
    width: 600,
  },
  {
    title: "商品图片",
    dataIndex: "pics",
    key: "pics",
    width: 200,
  },
  {
    title: "价钱",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
  {
    title: "数量",
    dataIndex: "quantity",
    key: "quantity",
    width: 150,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
</script>

<style lang="less" scoped>
.withoutText {
  color: @null-color;
}
</style>