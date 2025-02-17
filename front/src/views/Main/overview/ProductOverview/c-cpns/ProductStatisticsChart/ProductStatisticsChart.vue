<template>
  <a-card title="商品概览" class="card">
    <div ref="chartDom" class="chart"></div>
  </a-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { getStatisticsRequest } from "./ProductStatisticsChart.request";
import useRef from "@/hooks/useRef";
import * as echarts from "echarts";

const chartDom = ref(null);
let chartInstance = null;

onMounted(async () => {
  const statistics = await getStatisticsRequest();
  await nextTick();
  chartInstance = echarts.init(chartDom.value);
  // 定义每条数据的颜色
  const colors = ["#ff915a", "#91cc75", "#73c0de"];

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
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
    grid: {
      left: "14%", // 调整图表左边缘
      right: "10%", // 调整图表右边缘
      top: "25%", // 调整图表上边缘
      bottom: "14%", // 调整图表下边缘
    },
    xAxis: {
      type: "category",
      data: statistics.data.map((item) => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "总数",
        data: statistics.data.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: colors[index],
          },
        })),
        type: "bar",
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