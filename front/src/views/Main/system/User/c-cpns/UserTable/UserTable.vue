<template>
  <a-table
    :columns="columns"
    :data-source="userStore.users"
    :scroll="{ x: 'max-content', y: 6 * 87 }"
    :pagination="false"
    :row-selection="rowSelection"
    rowKey="id"
  >
    <template #bodyCell="{ column, text, record }">
      <template
        v-if="
          ['name', 'realname', 'role', 'phoneNumber'].includes(column.dataIndex)
        "
      >
        <span class="withoutText" v-if="text === '' || text === null"
          >暂无</span
        >
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template v-if="column.key === 'avatar'">
        <div>
          <Avatar
            :avatar="text"
            :size="3.4"
            :preview="true"
            :firstname="record.realname[0]"
          />
        </div>
      </template>
      <template v-if="column.key === 'enable'">
        <a-badge v-if="text" status="processing" text="启用" />
        <a-badge v-else status="default" text="禁用" />
      </template>
      <template v-if="column.key === 'operation'">
        <a-typography-link @click="handleEdit(record.id)"
          >编辑</a-typography-link
        >
      </template>
    </template>
  </a-table>
  <a-pagination
    v-model:current="userStore.page"
    :defaultPageSize="userStore.row"
    :total="userStore.total"
    style="margin-top: 0.8rem; float: right"
    :pageSizeOptions="['6', '10', '20', '50', '100']"
    @change="handleChange"
    :showSizeChanger="true"
  />
</template>
<script lang="ts" setup>
import useRef from "@/hooks/useRef";
import { watch } from "vue";
import { useUserStore } from "../../User.store";
import { usePanelStore } from "@/components/Panel/Panel.store";
import { removeUsersRequest } from "../../User.request";
import { useUserModalStore } from "../UserModal/UserModal.store";
import _ from "lodash";

const emit = defineEmits<{
  edit: [];
}>();

const userStore = useUserStore();
const panelStore = usePanelStore();
const userModalStore = useUserModalStore();

if (userStore.users.length === 0) userStore.setUsersAction();

// 选择框选中的keys
const [selectedRowKeys, setSelectedRowKeys] = useRef<string[]>([]);
const rowSelection = {
  selectedRowKeys: selectedRowKeys,
  onChange: (selectedRowKeys: string[]) => {
    setSelectedRowKeys(selectedRowKeys);
  },
};

// 分页器变化
const handleChange = (page: number, pageSize: number) => {
  setSelectedRowKeys([]);
  pageSize !== userStore.row ? userStore.setPage(1) : userStore.setPage(page);
  userStore.setRow(pageSize);
  userStore.setUsersAction();
};

// 处理panel中的删除按钮
watch(selectedRowKeys, (n, _) => {
  console.log(selectedRowKeys);
  n.length > 0
    ? n.length === 1
      ? panelStore.setDeleteButtonState("删除用户", true)
      : panelStore.setDeleteButtonState("批量删除", true)
    : panelStore.setDeleteButtonState("", false);
});

// 删除用户
const removeUsers = () => {
  removeUsersRequest({ ids: selectedRowKeys.value })
    .then(() => {
      userStore.setUsersAction();
    })
    .catch((err) => {
      Promise.reject(err);
    });
};

defineExpose({ removeUsers });

// 编辑用户
const handleEdit = (id: string) => {
  const user = userStore.users.find((item) => item.id === id);
  if (user) {
    userModalStore.setFormState(
      _.omit(user, ["avatar", "createdAt", "updatedAt"])
    );
    userModalStore.setFormStateCopy(
      _.omit(user, ["avatar", "createdAt", "updatedAt"])
    );
  }
  userModalStore.setFormMode("update");
  userModalStore.setCurrentUserId(id);
  emit("edit");
};

const columns = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "真实姓名",
    dataIndex: "realname",
    key: "realname",
  },
  {
    title: "用户头像",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "电话",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "状态",
    key: "enable",
    dataIndex: "enable",
  },
  {
    title: "角色",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "最近更新",
    dataIndex: "updatedAt",
    key: "updatedAt",
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