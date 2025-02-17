<template>
  <section class="wrapper">
    <div class="left">
      <ProductStatisticsChart />
      <ProductCategoryChart />
    </div>
    <div class="right">
      <ProductSubCategoryChart />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCategoryChart from "./c-cpns/ProductCategoryChart/ProductCategoryChart.vue";
import ProductStatisticsChart from "./c-cpns/ProductStatisticsChart/ProductStatisticsChart.vue";
import ProductSubCategoryChart from "./c-cpns/ProductSubCategoryChart/ProductSubCategoryChart.vue";
</script>

<style lang="less" scoped>
.wrapper {
  margin-top: 2rem;
  width: 720px;
  height: 700px;
  display: flex;

  .left {
    flex: 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: start;
  }

  .right {
    flex: 7;
  }
}
</style>
