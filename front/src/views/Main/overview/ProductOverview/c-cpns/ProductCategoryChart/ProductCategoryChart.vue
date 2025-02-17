<template>
  <a-card title="商品分类" class="card">
    <div ref="chartDom" class="chart"></div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { getCategoryWithProductNumRequest } from "./ProductCategoryChart.request";
import useRef from "@/hooks/useRef";
import * as echarts from "echarts";

// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null);
let chartInstance = null;

// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
onMounted(async () => {
  const category = await getCategoryWithProductNumRequest();
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
      right: "14px",
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [30, 90],
        center: ["50%", "58%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: category.data,
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
  width: 390px;
  height: 344px;
  margin-top: 14px;
  position: relative;
  .chart {
    position: absolute;
    left: 0;
    top: 0px;
    width: 390px;
    height: 344px;
  }
}
</style>
