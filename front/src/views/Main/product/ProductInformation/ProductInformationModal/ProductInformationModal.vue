<template>
  <a-modal
    v-model:open="open"
    :title="productModalStore.productModalTitle"
    :footer="null"
    style="padding-bottom: -20px"
  >
    <a-tabs v-model:activeKey="tabsActiveKey">
      <a-tab-pane key="1" tab="商品信息"> </a-tab-pane>
      <a-tab-pane
        key="2"
        tab="商品图片"
        :disabled="productModalStore.tabDisabled"
      >
      </a-tab-pane>
    </a-tabs>
    <template v-if="tabsActiveKey === '1'">
      <a-form
        :model="productModalStore.formState"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        style="margin-top: 30px"
      >
        <a-form-item
          label="商品名称"
          name="name"
          :rules="[{ required: true, message: '请输入商品名!' }]"
        >
          <a-input v-model:value="productModalStore.formState.name" />
        </a-form-item>
        <a-form-item label="价格" name="price">
          <a-input v-model:value="productModalStore.formState.price" />
        </a-form-item>
        <a-form-item label="数量" name="quantity">
          <a-input v-model:value="productModalStore.formState.quantity" />
        </a-form-item>

        <a-form-item
          label="分类"
          name="subCategoryId"
          :rules="[{ required: true, message: '请选择分类!' }]"
        >
          <a-cascader
            v-model:value="productModalStore.formState.subCategoryId"
            :field-names="{
              label: 'name',
              value: 'id',
              children: 'subCategories',
            }"
            :options="categoryStore.allCategories"
            placeholder="Please select"
          />
        </a-form-item>

        <a-form-item
          :wrapper-col="{ offset: 17 }"
          style="margin: 10px 0 -20px 0"
        >
          <a-button @click="resetForm">取消</a-button>
          <a-button style="margin-left: 10px" type="primary" html-type="submit"
            >确认
          </a-button>
        </a-form-item>
      </a-form>
    </template>
    <template v-else>
      <a-upload
        name="file"
        v-model:file-list="productModalStore.fileList"
        :action="BASE_URL + '/' + REQUEST_PREFIX + '/upload/product'"
        list-type="picture"
        :maxCount="9"
        :data="{ id: productModalStore.currentProductId }"
        multiple
        :headers="uploadHeaders"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          upload
        </a-button>
      </a-upload>
      <a-button
        style="margin: 20px 0 0 412px"
        type="primary"
        @click="open = false"
        >完成
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import getDifferentAttributes from "@/utils/getDifferentAttributes";
import {
  FormState,
  useProductModalStore,
} from "./ProductInformationModal.store";
import { useCategoryStore } from "../../ProductCategory/ProductCategory.store";
import { useProductStore } from "../ProductInformation.store";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import {
  createProductRequest,
  removeProductPicRequest,
  updateProductRequest,
} from "../ProductInformation.request";
import useRef from "@/hooks/useRef";
import { BASE_URL, REQUEST_PREFIX } from "@/config";

const open = defineModel("isOpen");

const productModalStore = useProductModalStore();
const categoryStore = useCategoryStore();
categoryStore.setAllCategoriesAction();
const productStore = useProductStore();

const [tabsActiveKey, setTabsActiveKey] = useRef<string>("1");

// 删除图片文件处理
watch(
  () => productModalStore.fileList,
  async (newArr, oldArr) => {
    if (newArr.length < oldArr.length) {
      const removedItem = oldArr.find((item) => !newArr.includes(item));
      console.log(removedItem);
      removedItem!.process && removedItem!.status === "removed"
        ? await removeProductPicRequest(removedItem!.uid)
        : await removeProductPicRequest(removedItem!.response.data.id);
    }
    productStore.setProductsAction();
  }
);

const uploadHeaders = ref({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

const onFinish = async (values: FormState) => {
  console.log(values);
  values.subCategoryId.length === 2
    ? productModalStore.formMode === "create"
      ? await createProductRequest({
          ...values,
          price: Number(values.price),
          quantity: Number(values.quantity),
          subCategoryId: values.subCategoryId[1],
        }).then((res) => {
          console.log(res.data.id);
          productModalStore.setCurrentProductId(res.data.id);
        })
      : await updateProductRequest(productModalStore.currentProductId, {
          ...getDifferentAttributes(productModalStore.formStateCopy, values),
          price: Number(values.price),
          quantity: Number(values.quantity),
          subCategoryId: undefined,
        })
    : message.error("请选择一个子分类", 2);

  if (values.subCategoryId.length === 1) return;
  productStore.setProductsAction();
  productModalStore.setTabDisabled(false);
  productModalStore.setFileList([]);
  productModalStore.formMode === "create"
    ? setTabsActiveKey("2")
    : (open.value = false);
};

watch(open, (newValue) => {
  if (newValue === false) {
    productModalStore.setTabDisabled(true);
    setTabsActiveKey("1");
    productModalStore.resetFormState();
  }
});

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const resetForm = () => {
  open.value = false;
};
</script>

<style lang="less" scoped>
</style>
