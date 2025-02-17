<template>
  <a-table
    :columns="columns"
    :data-source="roleStore.roles"
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
      <template v-if="column.key === 'menus'">
        <a-tree
          :field-names="{
            title: 'name',
            key: 'id',
            children: 'subMenus',
          }"
          :tree-data="record.menus"
        >
          <template #title="{ name }">
            {{ name }}
          </template>
        </a-tree>
      </template>
      <template v-if="column.key === 'operation'">
        <a-typography-link @click="handleEditRole(record.id)"
          >编辑</a-typography-link
        >
        <a-typography-link
          style="margin-left: 0.5rem"
          @click="handleDeleteRole(record.id)"
          >删除</a-typography-link
        >
      </template>
    </template>
  </a-table>
  <a-pagination
    v-model:current="roleStore.page"
    :defaultPageSize="roleStore.row"
    :total="roleStore.total"
    style="margin-top: 0.8rem; float: right"
    :pageSizeOptions="['8', '20', '50', '100']"
    @change="handleChange"
    :showSizeChanger="true"
  />
</template>

<script lang="ts" setup>
import useRef from "@/hooks/useRef";
import { watch } from "vue";
import { usePanelStore } from "../../../../../../components/Panel/Panel.store";
import { useMenuStore } from "../../../Menu/Menu.store";
import { removeRolesRequest } from "../../Role.request";
import { useRoleStore } from "../../Role.store";
import { useRoleModalStore } from "../RoleModal/RoleModal.store";
import extractSubMenuId from "@/utils/extractSubMenuId";
import _ from "lodash";

const emit = defineEmits<{
  edit: [];
}>();

const panelStore = usePanelStore();
const roleStore = useRoleStore();
roleStore.setRolesAction();
const menuStore = useMenuStore();
menuStore.setAllMenusAction();
const roleModalStore = useRoleModalStore();

// 分页器变化
const handleChange = (page: number, pageSize: number) => {
  setSelectedRowKeys([]);
  pageSize !== roleStore.row ? roleStore.setPage(1) : roleStore.setPage(page);
  roleStore.setRow(pageSize);
  roleStore.setRolesAction();
};

const handleEditRole = (id: string) => {
  const role = roleStore.roles.find((item) => item.id === id);
  // console.log(setCheckedKeys);
  roleModalStore.setCheckedKeys(extractSubMenuId(role?.menus));
  console.log(role?.menus);
  if (role) {
    roleModalStore.setFormState(_.omit(role, ["menus", "id"]));
    roleModalStore.setFormStateCopy(_.omit(role, ["menus", "id"]));
  }
  roleModalStore.setFormMode("update");
  roleModalStore.setCurrentRoleId(id);
  emit("edit");
};

const handleDeleteRole = (id: string) => {
  removeRolesRequest({ ids: [id] }).then(() => {
    roleStore.setRolesAction();
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
      ? panelStore.setDeleteButtonState("删除角色", true)
      : panelStore.setDeleteButtonState("批量删除", true)
    : panelStore.setDeleteButtonState("", false);
});

// 删除角色
const removeRoles = () => {
  removeRolesRequest({ ids: selectedRowKeys.value })
    .then(() => {
      roleStore.setRolesAction();
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

defineExpose({ removeRoles });

const columns = [
  {
    title: "角色名称",
    dataIndex: "name",
    key: "name",
    width: 170,
  },
  {
    title: "菜单",
    dataIndex: "menus",
    key: "menus",
    width: 330,
  },
  {
    title: "描述",
    dataIndex: "introduce",
    key: "introduce",
    width: 500,
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