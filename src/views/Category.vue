<template>
  <el-card class="category-container">
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
    </template>
    <Table
      action='/categories'
      tableCode="Category"
      ref="table">
      <template #column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="categoryRank"
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
          width="220">
          <template #default="scope">
            <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.categoryId)">修改</a>
            <a style="cursor: pointer; margin-right: 10px" @click="handleNext(scope.row)">下级分类</a>
            <el-popconfirm
              title="确定删除吗？"
              @confirm="handleDeleteOne(scope.row.categoryId)">
              <template #reference>
                <a style="cursor: pointer">删除</a>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </Table>
    <DialogAddCategory ref='addCate' :type="state.type" />
  </el-card>
</template>

<script setup>
import { onUnmounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'
import DialogAddCategory from '@/components/DialogAddCategory.vue'
import Table from '@/components/Table.vue'
import bus from '../libs/bus'

const router = useRouter() // 声明路由实例
const table = ref()
const state = reactive({ type: 'add', /* 操作类型 */ })
// 每次路由变化的时候，都会触发监听时间，重新获取列表数据
const unwatch = router.afterEach((to) => {
  if (['category', 'level2', 'level3'].includes(to.name)) {
    bus.emit('getList', 'Category')
  }
})
onUnmounted(() => {
  unwatch()
})
// 访问下级分类
const handleNext = (item) => {
  const levelNumber = item.categoryLevel + 1
  if (levelNumber === 4) {
    ElMessage.error('没有下一级')
    return
  }
  router.push({
    name: `level${levelNumber}`,
    query: {
      level: levelNumber,
      parent_id: item.categoryId
    }
  })
}
//添加或修改对应项逻辑
const addCate = ref(null)
// 添加分类
const handleAdd = () => {
  state.type = 'add' // 传入弹窗组件用于弹窗 title 判断
  addCate.value.open()
}
// 修改分类
const handleEdit = (id) => {
  state.type = 'edit' // 传入弹窗组件用于弹窗 title 判断
  addCate.value.open(id)
}
// 批量删除
const handleDelete = () => {
  if (!table.value.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.delete('/categories', {
    data: {
      ids: table.value.multipleSelection.map(i => i.categoryId)
    }
  }).then(() => {
    ElMessage.success('删除成功')
    bus.emit('getList', 'Category')
  })
}
// 单个删除
const handleDeleteOne = (id) => {
  axios.delete('/categories', {
    data: {
      ids: [id]
    }
  }).then(() => {
    ElMessage.success('删除成功')
    bus.emit('getList', 'Category')
  })
}
</script>

<style scoped>

</style>