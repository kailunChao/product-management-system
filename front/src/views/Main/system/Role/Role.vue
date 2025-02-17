<template>
  <Panel
    @create="
      () => {
        open = true;
        roleModalStore.setFormMode('create');
      }
    "
    text="新增角色"
    :search="false"
    @delete="handleDeteteButtonClick"
  />
  <RoleTable
    ref="roleTableRef"
    @edit="
      () => {
        open = true;
      }
    "
  />
  <RoleModal v-model:is-open="open" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import RoleTable from "./c-cpns/RoleTable/RoleTable.vue";
import { useRoleModalStore } from "./c-cpns/RoleModal/RoleModal.store";
import RoleModal from "./c-cpns/RoleModal/RoleModal.vue";
import { usePanelStore } from "../../../../components/Panel/Panel.store";

interface RoleTableExposed {
  removeRoles: () => void;
}

const panelStore = usePanelStore();
const roleModalStore = useRoleModalStore();
const roleTableRef = ref<RoleTableExposed | null>(null);

const open = ref<boolean>(false);
const handleDeteteButtonClick = () => {
  if (roleTableRef.value) {
    roleTableRef.value.removeRoles();
  }
  panelStore.setDeleteButtonState("", false);
};
</script>

<style lang="less" scoped>
</style>
