<template>
  <a-card title="关于" size="small" style="width: 100%">
    <p>电商CMS是基于vue3、nestJs、MongoDB的现代化的后台管理系统</p>
  </a-card>
  <a-card title="技术栈" size="small" style="width: 100%; margin-top: 10px">
    <div v-for="(technology, index) in technologies" :key="index">
      <a-badge :color="technology.color" :text="technology.text" />
      <span :style="{ color: technology.color }">{{ technology.data }}</span>
    </div>
  </a-card>
  <a-card
    title="前端生产环境依赖"
    size="small"
    style="width: 100%; margin-top: 10px"
  >
    <a-descriptions title="" bordered>
      <a-descriptions-item label="@types/node">^22.10.1</a-descriptions-item>
      <a-descriptions-item label="ant-design-vue">^4.2.6</a-descriptions-item>
      <a-descriptions-item label="axios">^1.1.2</a-descriptions-item>
      <a-descriptions-item label="echarts">^5.6.0</a-descriptions-item>
      <a-descriptions-item label="gsap">^3.12.7</a-descriptions-item>
      <a-descriptions-item label="lodash">^4.17.21</a-descriptions-item>
      <a-descriptions-item label="normalize.css">^8.0.1</a-descriptions-item>
      <a-descriptions-item label="pinia">^2.3.0</a-descriptions-item>
      <a-descriptions-item label="pinia-plugin-persistedstate"
        >^4.2.0</a-descriptions-item
      >
      <a-descriptions-item label="vue">^3.5.13</a-descriptions-item>
      <a-descriptions-item label="vue-router">^4.5.0</a-descriptions-item>
    </a-descriptions>
  </a-card>
  <a-card
    title="后端生产环境依赖"
    size="small"
    style="width: 100%; margin-top: 10px"
  >
    <a-descriptions title="" bordered>
      <a-descriptions-item label="@alicloud/dysmsapi20170525"
        >^3.1.0</a-descriptions-item
      >
      <a-descriptions-item label="@nestjs/cache-manager"
        >^2.3.0</a-descriptions-item
      >
      <a-descriptions-item label="@nestjs/common">^10.0.0</a-descriptions-item>
      <a-descriptions-item label="@nestjs/config">^3.3.0</a-descriptions-item>
      <a-descriptions-item label="@nestjs/core">^10.0.0</a-descriptions-item>
      <a-descriptions-item label="@nestjs/jwt">^10.2.0</a-descriptions-item>
      <a-descriptions-item label="@nestjs/mapped-types"
        >^2.0.6</a-descriptions-item
      >
      <a-descriptions-item label="@nestjs/mongoose"
        >^10.1.0</a-descriptions-item
      >
      <a-descriptions-item label="@nestjs/passport"
        >^10.0.3</a-descriptions-item
      >
      <a-descriptions-item label="@nestjs/platform-express"
        >^10.0.0</a-descriptions-item
      >
      <a-descriptions-item label="@types/md5">^2.3.5</a-descriptions-item>
      <a-descriptions-item label="argon2">^0.41.1</a-descriptions-item>
      <a-descriptions-item label="cache-manager">^5.7.6</a-descriptions-item>
      <a-descriptions-item label="class-transformer"
        >^0.5.1</a-descriptions-item
      >
      <a-descriptions-item label="class-validator">^0.14.1</a-descriptions-item>
      <a-descriptions-item label="dayjs">^1.11.13</a-descriptions-item>
      <a-descriptions-item label="md5">^2.3.0</a-descriptions-item>
      <a-descriptions-item label="mongoose">^8.9.4</a-descriptions-item>
      <a-descriptions-item label="multer">^1.4.5-lts.1</a-descriptions-item>
      <a-descriptions-item label="passport-jwt">^4.0.1</a-descriptions-item>
      <a-descriptions-item label="reflect-metadata">^0.2.0</a-descriptions-item>
      <a-descriptions-item label="rxjs">^7.8.1</a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script setup lang="ts">
const technologies = [
  { color: "#23a8f2", text: "开发工具：", data: "Visual Studio Code" },
  { color: "#0074c1", text: "编程语言：", data: "TypeScript" },
  { color: "#b044fe", text: "构建工具：", data: "Vite" },
  { color: "#42b883", text: "前端框架：", data: "Vue3" },
  { color: "#42b883", text: "路由工具：", data: "Vue Router" },
  { color: "#ffde60", text: "状态管理：", data: "Pinia" },
  { color: "#1a9bff", text: "组件库：", data: "Ant Design Vue" },
  { color: "#e43961", text: "可视化：", data: "ECharts" },
  { color: "#3ded5b", text: "动画库：", data: "GSAP" },
  { color: "#5a29e4", text: "网络请求库：", data: "Axios" },
  { color: "#ea2859", text: "后端框架：", data: "NestJS" },
  { color: "#12ac51", text: "数据库：", data: "MongoDB" },
];
</script>
 
     
