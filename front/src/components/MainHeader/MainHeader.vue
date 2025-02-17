<template>
  <component
    :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
    class="svg_collapse"
    @click="toggleCollapsed"
  />
  <Breadcrumb />
  <HeaderInfo />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import HeaderInfo from "./c-cpns/HeaderInfo/HeaderInfo.vue";
import Breadcrumb from "./c-cpns/Breadcrumb/Breadcrumb.vue";
const collapsed = ref<boolean>(false);
const model = defineModel();
const toggleCollapsed = () => {
  model.value = !model.value;
  collapsed.value = !collapsed.value;
};
</script>

<style lang="less" scoped>
.svg_collapse {
  font-size: 1.4rem;
  color: @text-color;
  &:hover {
    color: @primary-color;
  }
}
</style>
