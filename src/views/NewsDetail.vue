<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <h2>{{ currentNews.title }}</h2>
      <div class="time">
        {{ whichTime(currentNews.editTime) }}
        <!-- {{ currentNews.editTime }} -->
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="currentNews.content" class="htmlContent"></div>
      </div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 20px; font-weight: 600">最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in topNews"
          :key="item._id"
          class="text item"
          style="padding: 16px"
          @click="handelChangePage(item._id)"
        >
          <span>{{ item.title }}</span>
          <div class="bottom">
            <time class="time">{{ whichTime(item.editTime) }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
// import { whichTime } from './News.vue'
import { StarFilled } from '@element-plus/icons-vue'
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
const router = useRouter()
moment.locale('zh-cn')
const route = useRoute()
const currentNews = ref({})
const topNews = ref([])
const whichTime = time => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
const stop = watchEffect(async () => {
  if (!route.params.id) return

  const result = await axios.get(`/webapi/news/list/${route.params.id}`)
  const result2 = await axios.get(`/webapi/news/toplist?limit=3`)
  topNews.value = result2.data.data
  currentNews.value = result.data.data[0]
})
onBeforeUnmount(() => {
  console.log('unmount')
  stop()
})
const handelChangePage = id => {
  router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: gray;
}
.htmlContent {
  :deep(img) {
    // width: 100%;
    max-width: 100%;
  }
  :deep(p) {
    text-indent: 0 !important;
  }
}
</style>
