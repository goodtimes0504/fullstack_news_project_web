<template>
  <div>
    <el-carousel
      height="calc(100vh - 60px)"
      direction="vertical"
      :autoplay="true"
      v-if="loopList.length"
    >
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div class="detail">{{ item.detail }}</div>
            <div class="more">
              更多信息请访问：<br />http://timeismoney.blog
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty description="暂无产品" v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const loopList = ref([])
onMounted(async () => {
  const result = await axios.get('/webapi/product/list')
  // console.log(result.data)
  loopList.value = result.data.data
})
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.item {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.box-card {
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  .detail,
  .more {
    margin-top: 20px;
  }
}
</style>
