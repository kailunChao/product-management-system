<template>
  <a-dropdown placement="bottomRight" arrow="{ pointAtCenter: true }">
    <div class="userInfo">
      <Avatar
        :avatar="mainStore.userInfo.avatar"
        :firstname="mainStore.userInfo.realname[0]"
        :size="2.6"
        :modify="false"
        :preview="false"
      />
      <span>{{ mainStore.userInfo.name }}</span>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <UserOutlined class="icon" />
          <a href="#" @click.prevent="handleUserInfoClick">用户信息</a>
        </a-menu-item>
        <a-menu-item>
          <UserSwitchOutlined class="icon" />
          <a href="#" @click.prevent="exitClick">退出登录</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- 对话框 -->
  <!-- <a-modal
    v-model:open="open"
    title="用户信息"
    ok-text="确认" 
    cancel-text="取消"
    @ok="handleOk"
  >
  </a-modal> -->
</template>

<script setup lang="ts">
import Avatar from "@/components/Avatar/Avatar.vue";
import router from "@/router";
import { useMainStore } from "@/views/Main/Main.store";
import { UserOutlined, UserSwitchOutlined } from "@ant-design/icons-vue";

const mainStore = useMainStore();
// const open = ref<boolean>(false);

console.log(mainStore.userInfo);

const exitClick = () => {
  mainStore.resetUserInfo();
  localStorage.removeItem("token");
  router.push("/login");
};

const handleUserInfoClick = () => {
  router.push("/main/personal/userInfo");
};
</script>

<style lang="less" scoped>
.userInfo {
  height: 3rem;
  display: flex;
  align-items: center;
  font-size: 1.15rem;
  margin: 0 0.6rem 0 auto;
  // position: absolute;
  // right: 3rem;
  &:hover {
    cursor: pointer;
    span {
      color: @primary-color;
    }
  }

  span {
    color: #1e1e1e;
    margin-left: 0.5rem;
  }
}

.icon {
  margin-right: 0.4rem;
}
</style>
