<template>
  <a-table
    :columns="columns"
    :data-source="categoryStore.categories"
    :pagination="false"
    :scroll="{ x: 'max-content', y: 6 * 87 }"
    rowKey="id"
    v-model:expandedRowKeys="expandedRowKeys"
    :row-selection="rowSelection"
  >
    <template #bodyCell="{ column, record, text }">
      <template v-if="['name', 'icon', 'introduce'].includes(column.dataIndex)">
        <span class="withoutText" v-if="text === ''">暂无</span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-if="column.key === 'operation'">
        <a-typography-link @click="handleEditCategory(record.id)"
          >编辑</a-typography-link
        >
        <a-typography-link
          style="margin-left: 0.5rem"
          @click="handleAddSubCategory(record.id)"
          >新增</a-typography-link
        >
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <a-table
        :columns="innerColumns"
        :data-source="record.subCategories"
        :pagination="false"
        :showHeader="false"
        rowKey="id"
        :row-selection="subRowSelection"
      >
        <template #bodyCell="{ column, record: subCategory, text }">
          <template
            v-if="['name', 'path', 'introduce'].includes(column.dataIndex)"
          >
            <span class="withoutText" v-if="text === ''">暂无</span>
            <span v-else>
              {{ text }}
            </span>
          </template>
          <template v-if="column.key === 'operation'">
            <a-typography-link
              @click="handleEditSubCategory(record.id, subCategory.id)"
              >编辑</a-typography-link
            >
          </template>
        </template>
      </a-table>
    </template>
  </a-table>
  <a-pagination
    v-model:current="categoryStore.page"
    :defaultPageSize="categoryStore.row"
    :total="categoryStore.total"
    style="margin-top: 0.8rem; float: right"
    :pageSizeOptions="['10', '20', '50', '100']"
    @change="handleChange"
    :showSizeChanger="true"
  />
</template>

<script lang="ts" setup>
import useRef from "@/hooks/useRef";
import { useCategoryStore } from "../../ProductCategory.store";
import { watch } from "vue";
import { usePanelStore } from "../../../../../../components/Panel/Panel.store";
import { useCategoryModalStore } from "../ProductCategoryModal/ProductCategoryModal.store";
import {
  removeCategoriesRequest,
  removeSubCategoriesRequest,
} from "../../ProductCategory.request";

const categoryStore = useCategoryStore();
const categoryModalStore = useCategoryModalStore();
categoryStore.setCategoriesAction();
const panelStore = usePanelStore();

console.log(categoryStore.categories);
const emit = defineEmits<{
  open: [];
}>();

const handleAddSubCategory = (id: string) => {
  emit("open");
  console.log(categoryModalStore.formState);
  categoryModalStore.setFormMode("create");
  categoryModalStore.setWhichCategory("subCategory");
  categoryModalStore.setCurrentCategoryId(id);
};

// 处理表格默认展开项
const [expandedRowKeys, setExpandedRowKeys] = useRef<string[]>([]);
watch(
  () => categoryStore.categories,
  (newMenus) => {
    setExpandedRowKeys(
      newMenus
        .filter((menu) => menu.subCategories && menu.subCategories.length > 0)
        .map((menu) => menu.id)
    );
  },
  { immediate: true }
);

// 编辑菜单
const handleEditCategory = (id: string) => {
  emit("open");
  const category = categoryStore.categories.find((item) => item.id === id);
  categoryModalStore.setFormMode("update");
  categoryModalStore.setWhichCategory("category");
  categoryModalStore.setCurrentCategoryId(id);
  categoryModalStore.setFormState(category!);
  categoryModalStore.setFormStateCopy(category!);
};

const handleEditSubCategory = (fid: string, sid: string) => {
  emit("open");
  const category = categoryStore.categories.find((item) => item.id === fid);
  const subCategory = category?.subCategories.find(
    (subItem) => subItem.id === sid
  );
  categoryModalStore.setFormMode("update");
  categoryModalStore.setWhichCategory("subCategory");
  categoryModalStore.setCurrentCategoryId(sid);
  categoryModalStore.setFormState(subCategory!);
  categoryModalStore.setFormStateCopy(subCategory!);
};

// 选择框选中的keys
const [selectedRowKeys, setSelectedRowKeys] = useRef<string[]>([]);
const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (selectedRowKeys: string[]) => {
    setSelectedRowKeys(selectedRowKeys);
  },
};

const [selectedSubRowKeys, setSelectedSubRowKeys] = useRef<string[]>([]);
const subRowSelection = {
  selectedRowKeys: selectedSubRowKeys,
  onChange: (selectedSubRowKeys: string[]) => {
    setSelectedSubRowKeys(selectedSubRowKeys);
  },
};

watch(
  [selectedRowKeys, selectedSubRowKeys],
  ([newRowKeys, newSubRowKeys]) => {
    if (newRowKeys.length === 1 && newSubRowKeys.length === 0)
      panelStore.setDeleteButtonState("删除分类", true);
    if (newRowKeys.length === 0 && newSubRowKeys.length === 1)
      panelStore.setDeleteButtonState("删除子类目", true);
    if (newRowKeys.length + newSubRowKeys.length > 1)
      panelStore.setDeleteButtonState("批量删除", true);
    if (newRowKeys.length === 0 && newSubRowKeys.length === 0)
      panelStore.setDeleteButtonState("", false);
  },
  { immediate: true }
);

// 删除菜单
const removeCategories = () =>
  removeCategoriesRequest({ ids: selectedRowKeys.value }).then(() => {
    categoryStore.setCategoriesAction();
  });

const removeSubCategories = () =>
  removeSubCategoriesRequest({ ids: selectedSubRowKeys.value }).then(() => {
    categoryStore.setCategoriesAction();
  });

defineExpose({ removeCategories, removeSubCategories });

// 分页器变化
const handleChange = (page: number, pageSize: number) => {
  setSelectedRowKeys([]);
  setSelectedSubRowKeys([]);
  pageSize !== categoryStore.row
    ? categoryStore.setPage(1)
    : categoryStore.setPage(page);
  categoryStore.setRow(pageSize);
  categoryStore.setCategoriesAction();
};

const columns = [
  {
    title: "类别名称",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "图标",
    dataIndex: "icon",
    key: "icon",
    width: 300,
  },
  {
    title: "描述",
    dataIndex: "introduce",
    key: "introduce",
    width: 600,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];

const innerColumns = [
  {
    title: "子类别名称名称",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "路径",
    dataIndex: "path",
    key: "path",
    width: 300,
  },
  {
    title: "描述",
    dataIndex: "introduce",
    key: "introduce",
    width: 600,
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