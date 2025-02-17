<template>
  <a-space direction="vertical" class="space" :size="[0, 48]">
    <a-layout>
      <a-layout-sider
        class="sider"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
      >
        <div class="logo">
          <img :src="logo" alt="" />
          <span>{{ collapsed === true ? "" : "电商CMS" }}</span>
        </div>
        <MainMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <MainHeader v-model="collapsed" />
        </a-layout-header>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-space>
</template>

<script setup lang="ts">
import MainHeader from "@/components/MainHeader/MainHeader.vue";
import MainMenu from "@/components/MainMenu/MainMenu.vue";
import { ref } from "vue";
import { useMainStore } from "./Main.store";
import logo from "@/assets/img/翅膀.png";

const collapsed = ref<boolean>(false);

const mainStore = useMainStore();

mainStore.getUserInfoAction();

console.log("main页面");
</script>

<style lang="less" scoped>
.space {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .ant-space-item {
    > section {
      height: 100vh;

      .ant-layout-header {
        padding: 0 1rem;
      }
    }
  }
}
.logo {
  height: 4rem;
  line-height: 4rem;
  img {
    width: 47px;
    height: 38px;
  }
  span {
    font-size: 1rem;
  }
}

.header {
  color: #fff;
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

.content {
  background-color: #fff;
  padding: 1rem 3rem 1rem 3rem;
  box-sizing: border-box;
  overflow: auto;
}

.sider {
  text-align: center;
  background-color: #fff;
}
</style>
