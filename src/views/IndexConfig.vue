<template>
  <el-card class="index-container">
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
      action='/indexConfigs'
      tableCode='Goods'
      ref="table">
      <template #column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="configName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          label="跳转链接">
          <template #default="scope">
            <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="configRank"
          label="排序值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="goodsId"
          label="商品编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template #default="scope">
            <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.configId)">修改</a>
            <el-popconfirm
              title="确定删除吗？"
              confirmButtonText='确定'
              cancelButtonText='取消'
              @confirm="handleDeleteOne(scope.row.configId)">
              <template #reference>
                <a style="cursor: pointer">删除</a>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </Table>
  </el-card>
  <DialogAddGood ref='addGood' :type="state.type" :configType="state.configType" />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import DialogAddGood from '@/components/DialogAddGood.vue'
import Table from '../components/Table.vue'
import bus from '../libs/bus'

//获取实例
const addGood = ref()
const table = ref()

// 首页配置类型参数
const configTypeMap = {
  hot: 3,
  new: 4,
  recommend: 5
}

const router = useRouter()
const route = useRoute()
const state = reactive({ type: 'add', /* 操作类型 */ })
// 监听路由变化
router.beforeEach((to) => {
  if (['hot', 'new', 'recommend'].includes(to.name)) {
    // 通过 to.name 去匹配不同路径下，configType 参数也随之变化。
    table.value.configType = configTypeMap[to.name]
    table.value.currentPage = 1
    bus.emit('getList', 'Goods')
  }
})
// 初始化
onMounted(() => {
  table.value.configType = configTypeMap[route.name]
})
// 添加商品
const handleAdd = () => {
  state.type = 'add'
  addGood.value.open()
}
// 修改商品
const handleEdit = (id) => {
  state.type = 'edit'
  addGood.value.open(id)
}
// 删除
const handleDelete = () => {
  if (!table.value.multipleSelection.length) {
    ElMessage.error('请选择项')
    return
  }
  axios.post('/indexConfigs/delete', {
    ids: table.value.multipleSelection.map(i => i.configId)
  }).then(() => {
    ElMessage.success('删除成功')
    bus.emit('getList', 'Goods')
  })
}
// 单个删除
const handleDeleteOne = (id) => {
  axios.post('/indexConfigs/delete', {
    ids: [id]
  }).then(() => {
    ElMessage.success('删除成功')
    bus.emit('getList', 'Goods')
  })
}
</script>

<style scoped>

</style>