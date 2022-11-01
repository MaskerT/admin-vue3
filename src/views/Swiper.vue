<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          confirmButtonText='确定'
          cancelButtonText='取消'
          @confirm="handleDelete">
          <template #reference>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <DialogAddSwiper ref='addSwiper' :type="state.type" />
    </template>
    <Table
      action='/carousels'
      ref="table">
      <template #column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="轮播图"
          width="200">
          <template #default="scope">
            <img style="width: 150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
          </template>
        </el-table-column>
        <el-table-column
          label="跳转链接">
          <template #default="scope">
            <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="carouselRank"
          label="排序值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template #default="{ row }">
            <a style="cursor: pointer; margin-right: 10px"
              @click="handleEdit(row.carouselId)">修改</a>
          </template>
        </el-table-column>
      </template>
    </Table>
  </el-card>
</template>

<script setup>
import Table from '@/components/Table.vue'
import DialogAddSwiper from '@/components/DialogAddSwiper.vue'
import { reactive, ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'

const addSwiper = ref()
const table = ref()
const state = reactive({ type: 'add' /*操作類型*/ })

// 添加轮播项
const handleAdd = () => {
  state.type = 'add'
  addSwiper.value.open()
}
// 修改轮播图
const handleEdit = (url) => {
  state.type = 'edit'
  addSwiper.value.open(url)
}
// 批量删除
const handleDelete = () => {
  if (!table.value.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.delete('/carousels', {
    data: {
      ids: table.value.multipleSelection.map(i => i.carouselId)
    }
  }).then(() => {
    ElMessage.success('删除成功')
    table.value.getList()
  })
}
</script>

<style scoped>

</style>