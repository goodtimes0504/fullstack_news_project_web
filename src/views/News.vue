<template>
  <div class="container">
    <div
      class="news-header"
      :style="{
        backgroundImage: `url(${require('@/assets/newsbg.jpg')})`,
      }"
    ></div>
    <div class="search">
      <el-popover
        placement="bottom"
        title="检索结果"
        width="50%"
        :visible="searchVisible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            type="search"
            size="large"
            placeholder="请输入想要搜索的内容"
            :prefix-icon="Search"
            @input="searchVisible = true"
            @blur="searchVisible = false"
          />
        </template>
        <!-- <div>1111</div> -->
        <div v-if="searchNewsList.length">
          <div
            v-for="item in searchNewsList"
            :key="item._id"
            class="search-item"
            @click="handelChangePage(item._id)"
          >
            {{ item.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无数据" :image-size="50"></el-empty>
        </div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card
            style="max-width: 480px"
            shadow="hover"
            @click="handelChangePage(item._id)"
          >
            <img :src="`${baseURL + item.cover}`" style="width: 100%" />
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
                <!-- <el-button text class="button">操作</el-button> -->
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs style="margin: 20px" v-model="whichTab" class="demo-tabs">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <!-- <div v-for="data in tabNews[item.name]" :key="data._id">
          {{ data.title }}
        </div> -->
        <el-row :gutter="20">
          <el-col :span="18">
            <div v-for="data in tabNews" :key="data._id" style="padding: 10px">
              <el-card
                shadow="hover"
                :body-style="{ padding: '0px' }"
                @click="handelChangePage(item._id)"
              >
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(${baseURL + data.cover})`,
                  }"
                ></div>
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="time">{{ whichTime(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline style="max-width: 600px">
              <el-timeline-item
                v-for="(data, index) in tabNews"
                :key="index"
                :timestamp="whichTime(data.editTime)"
                @click="handelChangePage(data._id)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        "
      >
        <el-icon><Top /></el-icon>
      </div>
    </el-backtop>
    <!-- Scroll down to see the bottom-right button.
    <el-backtop :right="100" :bottom="100" /> -->
  </div>
</template>

<script setup>
import { Top } from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import moment from 'moment'
moment.locale('zh-cn')
import _ from 'lodash'
import { useRouter } from 'vue-router'
const router = useRouter()
const newsList = ref([])
const searchText = ref('')
const searchVisible = ref(false)
const whichTab = ref(1)
const baseURL = process.env.VUE_APP_BASE_URL

onMounted(async () => {
  // console.log('news mounted')
  const result = await axios.get('/webapi/news/list')
  // console.log(result.data.data)
  newsList.value = result.data.data
  // console.log(_.groupBy(newsList.value, item => item.category))
})
const searchNewsList = computed(() => {
  return searchText.value
    ? newsList.value.filter(item => {
        return (
          item.title.includes(searchText.value) ||
          item.content.includes(searchText.value)
        )
      })
    : []
})
const topNewsList = computed(() => {
  return newsList.value.slice(0, 4)
})
const whichTime = time => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
const tabList = [
  {
    label: '最新动态',
    name: 1,
  },
  {
    label: '典型案例',
    name: 2,
  },
  {
    label: '通知公告',
    name: 3,
  },
]
// const tabNews = computed(() => {
//   return newsList.value.filter(item => {
//     return item.category == whichTab.value
//   })
// })
const tabNews = computed(() => {
  return newsList.value.filter(item => {
    return item.category == whichTab.value
  })
})

// const tabNews = computed(() => {
//   return _.groupBy(newsList.value, item => item.category)
// })
// console.log(tabNews.value)
// setTimeout(() => {
//   console.log(tabNews.value)
// }, 1000)
// watch(whichTab, () => {
//   console.log(tabNews.value)
// })
// _.groupBy(newsList.value, item => item.category)
const handelChangePage = id => {
  console.log(id)
  // router.push({
  //   name: 'newsDetail',
  //   params: {
  //     id,
  //   },
  // })
  router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
// :deep(.demo-tabs > .el-tabs__content) {
//   padding: 32px;
//   color: #6b778c;
//   font-size: 32px;
//   font-weight: 600;
// }
:deep(.el-tabs__item) {
  padding: 32px;
  font-size: 20px;
}
// .demo-tabs > .el-tabs__content {
//   padding: 32px;
//   color: #6b778c;
//   font-size: 32px;
//   font-weight: 600;
// }
.container {
  position: relative;
  .news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
  }
  .search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;
    .el-input {
      width: 50%;
    }
  }
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
    color: red;
  }
}
.topnews {
  margin: 20px;
}
.time {
  color: gray;
  font-size: 13px;
}
.tab-image {
  width: 150px;
  height: 150px;
  background-size: cover;
  float: left;
}
// .tab-news {
//   .el-card {
//     display: flex;
//     align-items: center; // 让子元素在交叉轴（垂直方向）上居中对齐，确保图片和文字部分垂直方向上是对齐的
//   }

//   .tab-img {
//     flex: 1; // 让图片占据剩余空间的一部分，可根据实际效果调整比例
//     margin-right: 10px; // 给图片和文字部分之间添加一点间距，可按需调整数值
//   }

//   .el-card div {
//     flex: 2; // 让包含标题和时间的 div 占据剩余空间的另一部分，可根据实际效果调整比例
//   }
// }
</style>
