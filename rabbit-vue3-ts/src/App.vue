<template>
  <div>
    <router-view />
    <p>哈哈哈</p>
    <ul>
      <li>123</li>
      <li>456</li>
    </ul>
    <h1>这是大标题</h1>
  </div>
</template>

<script setup lang="ts">
import { getAllHomepageDataApi } from "./api/home";
const initData = async () => {
  const res = await getAllHomepageDataApi();
  console.log(res);
};
initData();
</script>

<style lang="less" scoped>
h1 {
  background-color: @warnColor;
  .hoverShadow();
}
</style>
