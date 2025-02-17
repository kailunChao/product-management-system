<template>
  <Panel
    @create="
      () => {
        open = true;
        menuModalStore.setFormMode('create');
        menuModalStore.setWhichMenu('menu');
      }
    "
    text="新增菜单"
    :search="false"
    @delete="handleDeteteButtonClick"
  />
  <MenuTable
    @open="
      () => {
        open = true;
      }
    "
    ref="menuTableRef"
  />
  <MenuModal v-model:is-open="open" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuTable from "./c-cpns/MenuTable/MenuTable.vue";
import MenuModal from "./c-cpns/MenuModal/MenuModal.vue";
import { useMenuModalStore } from "./c-cpns/MenuModal/MenuModal.store";
import { usePanelStore } from "../../../../components/Panel/Panel.store";

interface MenuTableExposed {
  removeMenus: () => void;
  removeSubMenus: () => void;
}

const open = ref<boolean>(false);
const menuModalStore = useMenuModalStore();
const panelStore = usePanelStore();
const menuTableRef = ref<MenuTableExposed | null>(null);

const handleDeteteButtonClick = () => {
  if (menuTableRef.value) {
    menuTableRef.value.removeMenus();
    menuTableRef.value.removeSubMenus();
  }
  panelStore.setDeleteButtonState("", false);
};
</script>

<style lang="less" scoped>
</style>
