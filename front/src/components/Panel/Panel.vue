<template>
  <a-space :size="10" class="space">
    <a-button
      danger
      v-show="panelStore.isDeleteButtonShow"
      @click="$emit('delete', undefined)"
      >{{ panelStore.deleteButtonText }}</a-button
    >

    <a-dropdown placement="bottom" v-if="$props.search">
      <a-button type="primary" ghost>增加检索</a-button>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="(item, index) in $props.dropdownData"
            :key="index"
          >
            <a
              href="javascript:;"
              @click="
                $emit('search', {
                  title: item.title,
                  dataIndex: item.dataIndex,
                })
              "
              >{{ item.title }}</a
            >
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <a-button type="primary" ghost @click="$emit('create', undefined)">{{
      $props.text
    }}</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { DropdownData, usePanelStore } from "./Panel.store";

const panelStore = usePanelStore();

defineProps<{
  text: string;
  dropdownData: DropdownData[];
  search: boolean;
}>();

defineEmits<{
  create: [value: undefined];
  delete: [value: undefined];
  search: [
    value: {
      title: string;
      dataIndex: string;
    }
  ];
}>();
</script>

<style lang="less" scoped>
.space {
  float: right;
  margin-bottom: 0.5rem;
}
</style>
