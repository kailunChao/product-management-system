<template>
  <a-descriptions title="用户信息" bordered>
    <a-descriptions-item label="头像">
      <Avatar
        :avatar="mainStore.userInfo.avatar"
        :firstname="mainStore.userInfo.realname[0]"
        :size="5.3"
        :modify="true"
        :preview="false"
      />
    </a-descriptions-item>
    <a-descriptions-item label="用户名">{{
      mainStore.userInfo.name
    }}</a-descriptions-item>
    <a-descriptions-item label="真实姓名">{{
      mainStore.userInfo.realname
    }}</a-descriptions-item>
    <a-descriptions-item label="电话号码">{{
      mainStore.userInfo.phoneNumber
    }}</a-descriptions-item>
    <a-descriptions-item label="角色">{{
      mainStore.userInfo?.role === null
        ? "暂无"
        : mainStore.userInfo?.role?.name
    }}</a-descriptions-item>
    <a-descriptions-item label="状态" :span="3">
      <a-badge
        :status="mainStore.userInfo.enable ? 'processing' : 'error'"
        :text="mainStore.userInfo.enable ? '启用中' : '禁用中'"
      />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script setup lang="ts">
import Avatar from "@/components/Avatar/Avatar.vue";
import { useMainStore } from "../../Main.store";

const mainStore = useMainStore();
console.log("用户信息");
</script>

<style lang="less" scoped>
</style>
