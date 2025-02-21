<template>
  <a-form layout="inline">
    <a-form-item
      v-for="(item, index) in searchPanelStore.searchs"
      :label="item.title"
      name="key"
      :key="index"
      style="margin-bottom: 1rem"
    >
      <div style="display: flex">
        <a-input
          v-model:value="searchPanelStore.formState[item.dataIndex]"
        /><DeleteOutlined
          class="deleteIcon"
          @click="
            () => {
              searchPanelStore.remove(item);
              $emit('delete');
            }
          "
        />
      </div>
    </a-form-item>
    <a-form-item v-if="searchPanelStore.searchs.length !== 0">
      <div style="display: flex">
        <a-button
          type="primary"
          size="small"
          ghost
          @click="searchPanelStore.resetFormState()"
          >重置</a-button
        >
        <a-button
          type="primary"
          size="small"
          ghost
          style="margin-left: 0.5rem"
          @click="$emit('startSearch', undefined)"
          >搜索</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
// import { reactive } from "vue";
import { watch } from "vue";
// import type { FormProps } from "ant-design-vue";
import { useSearchPanelStore } from "./SearchPanel.store";
import { DeleteOutlined } from "@ant-design/icons-vue";

const searchPanelStore = useSearchPanelStore();

watch(
  () => searchPanelStore.searchs,
  (n) => {
    console.log(n);
  }
);

// interface FormState {
//   [key: string]: any
// }
// const formState: UnwrapRef<FormState> = reactive({
//   user: "",
//   password: "",
// });
// const handleFinish: FormProps["onFinish"] = (values) => {
//   console.log(values, formState);
// };
// const handleFinishFailed: FormProps["onFinishFailed"] = (errors) => {
//   console.log(errors);
// };
</script>

<style lang="less" scoped>
.deleteIcon {
  color: gray;
  font-size: 1rem;
  margin-left: 0.3rem;
  cursor: pointer;
}
</style>
