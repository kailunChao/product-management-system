<template>
  <div
    class="wrapper"
    @mouseenter="
      () => {
        style.opacity = '1';
      }
    "
    @mouseleave="
      () => {
        style.opacity = '0';
      }
    "
  >
    <div v-if="!$props.avatar" class="avatar realname" type="file">
      {{ $props.firstname }}
    </div>
    <img v-else :src="BASE_URL + $props.avatar" alt="" :style="avatar" />
    <div
      v-if="($props.modify || $props.preview) && !!$props.avatar"
      class="inner"
      @click="handleModalBoxClick"
    >
      <FormOutlined v-if="$props.modify" />
      <SearchOutlined v-else />&nbsp;{{ hoverText() }}
    </div>
    <input
      v-if="$props.modify"
      type="file"
      accept="image/*"
      @change="handleFileChange"
    />
    <a-image
      v-if="$props.preview"
      :width="200"
      :style="{ display: 'none' }"
      :preview="{
        visible,
        onVisibleChange: setVisible,
      }"
      :src="BASE_URL + $props.avatar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FormOutlined, SearchOutlined } from "@ant-design/icons-vue";
import uploadFile from "@/utils/uploadFile";
import { useMainStore } from "../../views/Main/Main.store";
import { BASE_URL } from "@/config";

const props = defineProps<{
  avatar: string | null;
  firstname: string;
  size: number;
  modify: boolean;
  preview: boolean;
}>();

const style = ref({
  width: `${props.size}rem`,
  height: `${props.size}rem`,
  borderRadius: `10rem`,
  lineHeight: `${props.size}rem`,
  fontSize: `${props.size / 2}rem`,
  opacity: "0",
});

const mainStore = useMainStore();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    const formData = uploadFile(file);
    mainStore.changeUserAvatarAction(formData);
  }
};

const hoverText = () => {
  if (props.modify) return "修改";
  if (props.preview) return "预览";
};

// 预览组件展示 ↓
const visible = ref<boolean>(false);
const setVisible = (): void => {
  visible.value = !visible.value;
};

const handleModalBoxClick = () => {
  if (!props.preview) return;
  setVisible();
};
</script>

<style lang="less" scoped>
.avatar,
img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: v-bind("style.width");
  height: v-bind("style.height");
  border-radius: 10rem;
}

.realname {
  text-align: center;
  font-weight: 900;
  line-height: v-bind("style.lineHeight");
  background-color: @primary-color;
  color: white;
  font-size: v-bind("style.fontSize");
}

.wrapper {
  position: relative;
  box-sizing: border-box;
  width: v-bind("style.width");
  height: v-bind("style.height");
}

.inner {
  position: absolute;
  width: v-bind("style.width");
  height: v-bind("style.height");
  left: 0;
  bottom: 0;
  border-radius: 10rem;
  background-color: @text-color;
  color: white;
  display: flex;
  opacity: v-bind("style.opacity");
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
  }
}

input {
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #ffffff00;
  width: 100%;
  height: 100%;
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
}
</style>