<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>{{ menu.name }}</a-breadcrumb-item>
    <a-breadcrumb-item
      ><a href="">{{ subMenu.name }}</a></a-breadcrumb-item
    >
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useMainStore } from "@/views/Main/Main.store";
import { watch } from "vue";
import { useMainMenuStore } from "../../../MainMenu/MainMenu.store";
import { Menu, SubMenu } from "@/views/Main/system/Menu/Menu.store";
import useRef from "@/hooks/useRef";

const mainMenuStore = useMainMenuStore();
const mainStore = useMainStore();

const [menu, setMenu] = useRef({
  name: "",
});
const [subMenu, setSubMenu] = useRef({
  name: "",
});

watch(
  [() => mainMenuStore.selectedKeys, () => mainStore.userInfo],
  (newValues) => {
    if (newValues[1].menus.length !== 0) {
      newValues[1].menus.forEach((menuItem: Menu) => {
        menuItem.subMenus.forEach((subMenuItem: SubMenu) => {
          if (subMenuItem.id === newValues[0][0]) {
            setMenu(menuItem);
            setSubMenu(subMenuItem);
            return;
          }
        });
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.breadcrumb {
  margin-left: 0.9rem;
}
</style>
