<template>
  <div class="container">
    <el-carousel height="calc(100vh - 60px)">
      <el-carousel-item v-for="item in 4" :key="1">
        <div
          :style="{
            backgroundImage: `url(${require('@/assets/home' + item + '.jpg')})`,
          }"
        >
          <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">互联网+时代</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.container {
  position: relative;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
