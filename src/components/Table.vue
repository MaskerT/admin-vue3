<template>
  <el-table
    v-loading="state.loading"
    :data="state.tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <slot name='column'></slot>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="state.total"
    :page-size="state.pageSize"
    :current-page="state.currentPage"
    @update:current-page="changePage" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, defineExpose, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'
import bus from '../libs/bus'

const props = defineProps({
  action: String,
  tableCode: String
})
const route = useRoute()
const state = reactive({
  // for null
  loading: false, // 加載狀態
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  multipleSelection: [], // 多选框
  // for Goods
  configType: 3,
  // for Category
  level: 1,
  parent_id: 0,
  // for Order
  orderNo: '', // 订单号
  orderStatus: '', // 订单状态
})
// 初始化钩子函数
onMounted(() => {
  getList(props.tableCode)
})
// 获取列表方法
const getList = (stateCode = 'null') => {
  switch (stateCode) {
    case 'null':
      state.loading = true
      axios.get(props.action, {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize
        }
      }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
      break
    case 'Goods':
      state.loading = true
      axios.get(props.action, {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize,
          configType: state.configType
        }
      }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
      break
    case 'Category':
      const { level = 1, parent_id = 0 } = route.query
      state.loading = true
      axios.get(props.action, {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize,
          categoryLevel: level,
          parentId: parent_id
        }
      }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
        state.level = level
        state.parentId = parent_id
      })
      break
    case 'Order':
      state.loading = true
      axios.get(props.action, {
        params: {
          pageNumber: state.currentPage,
          pageSize: state.pageSize,
          orderNo: state.orderNo,
          orderStatus: state.orderStatus
        }
      }).then(res => {
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
      break
    default:
      console.log('未識別的跳轉路徑');
  }
}
// 啓用監聽以便在需要的地方調用獲取列表方法
bus.on('getList', getList)
// 选项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
// 分页方法（將分頁方法更改爲官網更加推薦的雙向數據綁定）
const changePage = (val) => {
  state.currentPage = val
  getList(props.tableCode)
}
defineExpose({ ...toRefs(state), getList, handleSelectionChange, changePage })
// 在組建卸載之前移除監聽
onBeforeUnmount(() => {
  bus.off('getList', getList)
})
</script>

<style scoped>

</style>