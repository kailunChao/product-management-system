<template>
  <SearchPanel @startSearch="handelStartSearch" @delete="handelStartSearch" />
  <Panel
    @create="
      () => {
        open = true;
        userModalStore.setFormMode('create');
      }
    "
    @delete="handleDeteteButtonClick"
    :dropdown-data="dropDownData"
    @search="handleAddSearch"
    text="新增用户"
    :search="true"
  />
  <UserTable
    ref="userTableRef"
    @edit="
      () => {
        open = true;
      }
    "
  />
  <UserModal v-model:is-open="open" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserModal from "./c-cpns/UserModal/UserModal.vue";
import UserTable from "./c-cpns/UserTable/UserTable.vue";
import Panel from "@/components/Panel/Panel.vue";
import { usePanelStore } from "../../../../components/Panel/Panel.store";
import { useUserModalStore } from "./c-cpns/UserModal/UserModal.store";
import SearchPanel from "@/components/SearchPanel/SearchPanel.vue";
import { useSearchPanelStore } from "@/components/SearchPanel/SearchPanel.store";
import { useUserStore } from "./User.store";

const panelStore = usePanelStore();
const userModalStore = useUserModalStore();
const searchPanelStore = useSearchPanelStore();
const userStore = useUserStore();

interface UserTableExposed {
  removeUsers: () => void;
}

const open = ref<boolean>(false);
const userTableRef = ref<UserTableExposed | null>(null);

const handleDeteteButtonClick = () => {
  if (userTableRef.value) {
    userTableRef.value.removeUsers();
  }
  panelStore.setDeleteButtonState("", false);
};

const handleAddSearch = (obj: { title: string; dataIndex: string }) => {
  searchPanelStore.add(obj);
};

const handelStartSearch = () => {
  userStore.setUsersAction();
};

const dropDownData = [
  {
    title: "用户名",
    dataIndex: "name",
  },
  {
    title: "真实姓名",
    dataIndex: "realname",
  },
  {
    title: "电话",
    dataIndex: "phoneNumber",
  },
  {
    title: "状态",
    dataIndex: "enable",
  },
];
</script>

<style lang="less" scoped>
</style>