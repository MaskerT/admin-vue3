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
import { onMounted, reactive, defineExpose, toRefs } from 'vue'
import axios from '@/utils/axios'

const props = defineProps({
  action: String
})
const state = reactive({
  loading: false, // 加載狀態
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  multipleSelection: [], // 多选框
})
// 初始化钩子函数
onMounted(() => {
  getList()
})
// 获取列表方法
const getList = () => {
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
}
// 选项
const handleSelectionChange = (val) => {
  state.multipleSelection = val
}
// 分页方法（將分頁方法更改爲官網更加推薦的雙向數據綁定）
const changePage = (val) => {
  state.currentPage = val
  getList()
}
defineExpose({ ...toRefs(state), props, getList, handleSelectionChange, changePage })
</script>

<style scoped>

</style>