<template>
  <a-table
    :columns="columns"
    :data-source="menuStore.menus"
    :pagination="false"
    :scroll="{ x: 'max-content', y: 6 * 91 }"
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
        <a-typography-link @click="handleEditMenu(record.id)"
          >编辑</a-typography-link
        >
        <a-typography-link
          style="margin-left: 0.5rem"
          @click="handleAddSubMenu(record.id)"
          >新增</a-typography-link
        >
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <a-table
        :columns="innerColumns"
        :data-source="record.subMenus"
        :pagination="false"
        :showHeader="false"
        rowKey="id"
        :row-selection="subRowSelection"
      >
        <template #bodyCell="{ column, record: subMenu, text }">
          <template
            v-if="['name', 'path', 'introduce'].includes(column.dataIndex)"
          >
            <span class="withoutText" v-if="text === ''">暂无</span>
            <span v-else>
              {{ text }}
            </span>
          </template>
          <template v-if="column.key === 'operation'">
            <a-typography-link @click="handleEditSubMenu(record.id, subMenu.id)"
              >编辑</a-typography-link
            >
          </template>
        </template>
      </a-table>
    </template>
  </a-table>
  <a-pagination
    v-model:current="menuStore.page"
    :defaultPageSize="menuStore.row"
    :total="menuStore.total"
    style="margin-top: 0.8rem; float: right"
    :pageSizeOptions="['10', '20', '50', '100']"
    @change="handleChange"
    :showSizeChanger="true"
  />
</template>

<script lang="ts" setup>
import useRef from "@/hooks/useRef";
import { useMenuStore } from "../../Menu.store";
import { useMenuModalStore } from "../MenuModal/MenuModal.store";
import { watch } from "vue";
import { usePanelStore } from "../../../../../../components/Panel/Panel.store";
import { removeMenusRequest, removeSubMenusRequest } from "../../Menu.request";

const menuStore = useMenuStore();
const menuModalStore = useMenuModalStore();
menuStore.setMenusAction();
const panelStore = usePanelStore();

console.log(menuStore.menus);
const emit = defineEmits<{
  open: [];
}>();

const handleAddSubMenu = (id: string) => {
  emit("open");
  console.log(menuModalStore.formState);
  menuModalStore.setFormMode("create");
  menuModalStore.setWhichMenu("subMenu");
  menuModalStore.setCurrentMenuId(id);
};

// 处理表格默认展开项
const [expandedRowKeys, setExpandedRowKeys] = useRef<string[]>([]);
watch(
  () => menuStore.menus,
  (newMenus) => {
    setExpandedRowKeys(
      newMenus
        .filter((menu) => menu.subMenus && menu.subMenus.length > 0)
        .map((menu) => menu.id)
    );
  },
  { immediate: true }
);

// 编辑菜单
const handleEditMenu = (id: string) => {
  emit("open");
  const menu = menuStore.menus.find((menu) => menu.id === id);
  menuModalStore.setFormMode("update");
  menuModalStore.setWhichMenu("menu");
  menuModalStore.setCurrentMenuId(id);
  menuModalStore.setFormState(menu!);
  menuModalStore.setFormStateCopy(menu!);
};

const handleEditSubMenu = (fid: string, sid: string) => {
  emit("open");
  const menu = menuStore.menus.find((menu) => menu.id === fid);
  const subMenu = menu?.subMenus.find((subMenu) => subMenu.id === sid);
  menuModalStore.setFormMode("update");
  menuModalStore.setWhichMenu("subMenu");
  menuModalStore.setCurrentMenuId(sid);
  menuModalStore.setFormState(subMenu!);
  menuModalStore.setFormStateCopy(subMenu!);
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
      panelStore.setDeleteButtonState("删除菜单", true);
    if (newRowKeys.length === 0 && newSubRowKeys.length === 1)
      panelStore.setDeleteButtonState("删除子菜单", true);
    if (newRowKeys.length + newSubRowKeys.length > 1)
      panelStore.setDeleteButtonState("批量删除", true);
    if (newRowKeys.length === 0 && newSubRowKeys.length === 0)
      panelStore.setDeleteButtonState("", false);
  },
  { immediate: true }
);

// 删除菜单
const removeMenus = () =>
  removeMenusRequest({ ids: selectedRowKeys.value }).then(() => {
    menuStore.setMenusAction();
  });

const removeSubMenus = () =>
  removeSubMenusRequest({ ids: selectedSubRowKeys.value }).then(() => {
    menuStore.setMenusAction();
  });

defineExpose({ removeMenus, removeSubMenus });

// 分页器变化
const handleChange = (page: number, pageSize: number) => {
  setSelectedRowKeys([]);
  setSelectedSubRowKeys([]);
  pageSize !== menuStore.row ? menuStore.setPage(1) : menuStore.setPage(page);
  menuStore.setRow(pageSize);
  menuStore.setMenusAction();
};

const columns = [
  {
    title: "菜单名称",
    dataIndex: "name",
    key: "name",
    width: 150,
  },
  {
    title: "图标 / 路径",
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
    title: "菜单名称",
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