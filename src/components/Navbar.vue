<template>
  <div class="navbar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="" @click="handleClick">登录</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClick = () => {
  window.location = 'http://admin.qianfengnews.timeismoney.blog/#/login'
}
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.right {
  position: fixed;
  top: 0;
  right: 20px;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  //   background-color: #409eff;
}
</style>
