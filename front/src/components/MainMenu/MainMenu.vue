<template>
  <a-menu
    v-model:selectedKeys="mainMenuStore.selectedKeys"
    v-model:openKeys="mainMenuStore.openKeys"
    theme="light"
    mode="inline"
  >
    <template v-if="mainStore.userInfo.role">
      <a-sub-menu v-for="item in mainStore.userInfo.menus" :key="item.id">
        <template #title>
          <span>
            <AIcon :type="item.icon" />
            <span>{{ item.name }}</span>
          </span>
        </template>
        <a-menu-item v-for="subItem in item.subMenus" :key="subItem.id">{{
          subItem.name
        }}</a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { useMainStore } from "@/views/Main/Main.store";
import { AIcon } from "@/components/AIcon";
import { useMainMenuStore } from "./MainMenu.store";

const mainStore = useMainStore();
const mainMenuStore = useMainMenuStore();
</script>

<style lang="less" scoped>
</style>
