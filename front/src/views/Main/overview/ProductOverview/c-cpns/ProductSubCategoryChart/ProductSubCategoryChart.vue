<template>
  <a-card title="商品详情" class="card">
    <div ref="chartDom" class="chart"></div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import * as echarts from "echarts";
import { Card as ACard } from "ant-design-vue"; // 确保正确引入 a-card 组件
import { getSubCategoryWithProductNumRequest } from "./ProductSubCategoryChart.request";

// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null);
let chartInstance = null;

onMounted(async () => {
  const subCategory = await getSubCategoryWithProductNumRequest();
  console.log(subCategory);
  await nextTick(); // 确保DOM已经渲染完成
  chartInstance = echarts.init(chartDom.value);
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
      top: "14px",
      right: "23px",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 38,
      top: 80,
      bottom: 20,
      data: subCategory.data.map((item) => item.name),
    },
    series: [
      {
        name: "总数",
        type: "pie",
        radius: "80%",
        center: ["42%", "55%"],
        data: subCategory.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  chartInstance.setOption(option);
});

// 销毁ECharts实例
onUnmounted(() => {
  if (chartInstance != null && chartInstance.dispose) {
    chartInstance.dispose();
  }
});
</script>

<style lang="less" scoped>
.card {
  width: 890px;
  height: 702px;
  margin-left: 15px;
  position: relative;
}
.chart {
  position: absolute;
  left: 10px;
  top: 0px;
  width: 100%;
  height: 100%;
}
</style>