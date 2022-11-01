<template>
  <el-card class="order-container">
    <template #header>
      <div class="header">
        <el-input
          style="width: 200px; margin-right: 10px"
          placeholder="请输入订单号"
          v-model="orderNo"
          @change="handleOption"
          size="small"
          clearable />
        <el-select @change="handleOption" v-model="orderStatus" size="small"
          style="width: 200px; margin-right: 10px">
          <el-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
        <el-button type="primary" :icon="HomeFilled" @click="handleConfig()">配货完成</el-button>
        <el-button type="primary" :icon="HomeFilled" @click="handleSend()">出库</el-button>
        <el-button type="danger" :icon="Delete" @click="handleClose()">关闭订单</el-button>
      </div>
    </template>
    <Table
      action='/orders'
      tableCode="Order"
      ref="table">
      <template #column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="订单总价">
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态">
          <template #default="scope">
            <span>{{ $filters.orderMap(scope.row.orderStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="payType"
          label="支付方式">
          <template #default='scope'>
            <span v-if="scope.row.payType == 1">微信支付</span>
            <span v-else-if="scope.row.payType == 2">支付宝支付</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template #default="scope">
            <el-popconfirm
              v-if="scope.row.orderStatus == 1"
              title="确定配货完成吗？"
              @confirm="handleConfig(scope.row.orderId)"
              confirm-button-text="确定"
              cancel-button-text="取消">
              <template #reference>
                <a class="link">配货完成</a>
              </template>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.orderStatus == 2"
              title="确定出库吗？"
              @confirm="handleSend(scope.row.orderId)"
              confirm-button-text="确定"
              cancel-button-text="取消">
              <template #reference>
                <a class="link">出库</a>
              </template>
            </el-popconfirm>
            <el-popconfirm
              v-if="!(scope.row.orderStatus == 4 || scope.row.orderStatus < 0)"
              title="确定关闭订单吗？"
              @confirm="handleClose(scope.row.orderId)"
              confirm-button-text="确定"
              cancel-button-text="取消">
              <template #reference>
                <a class="link">关闭订单</a>
              </template>
            </el-popconfirm>
            <router-link class="link" :to="{ path: '/order_detail', query: { id: scope.row.orderId } }">订单详情
            </router-link>
          </template>
        </el-table-column>
      </template>
    </Table>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { HomeFilled, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'
import bus from '../libs/bus'
import Table from '@/components/Table.vue'

const table = ref() // 獲取绑定 Table 的 ref 属性
let orderNo = ref('')
let orderStatus = ref('')
const state = reactive({
  // 订单状态筛选项默认值
  options: [{
    value: '',
    label: '全部'
  }, {
    value: 0,
    label: '待支付'
  }, {
    value: 1,
    label: '已支付'
  }, {
    value: 2,
    label: '配货完成'
  }, {
    value: 3,
    label: '出库成功'
  }, {
    value: 4,
    label: '交易成功'
  }, {
    value: -1,
    label: '手动关闭'
  }, {
    value: -2,
    label: '超时关闭'
  }, {
    value: -3,
    label: '商家关闭'
  }]
})
// 触发过滤项方法
const handleOption = () => {
  table.value.currentPage = 1
  table.value.orderNo = orderNo.value
  table.value.orderStatus = orderStatus.value
  bus.emit('getList', 'Order')
}
// 配货方法
const handleConfig = (id) => {
  let params
  // 当个配置
  if (id) {
    params = [id]
  } else {
    if (!table.value.multipleSelection.length) {
      console.log('state.multipleSelection', table.value.multipleSelection.length)
      ElMessage.error('请选择项')
      return
    }
    // 多选配置
    params = table.value.multipleSelection.map(i => i.orderId)
  }
  axios.put('/orders/checkDone', {
    ids: params
  }).then(() => {
    ElMessage.success('配货成功')
    bus.emit('getList', 'Order')
  })
}
// 出库方法
const handleSend = (id) => {
  let params
  if (id) {
    params = [id]
  } else {
    if (!table.value.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    params = table.value.multipleSelection.map(i => i.orderId)
  }
  axios.put('/orders/checkOut', {
    ids: params
  }).then(() => {
    ElMessage.success('出库成功')
    bus.emit('getList', 'Order')
  })
}
// 关闭订单方法
const handleClose = (id) => {
  let params
  if (id) {
    params = [id]
  } else {
    if (!table.value.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    params = table.value.multipleSelection.map(i => i.orderId)
  }
  axios.put('/orders/close', {
    ids: params
  }).then(() => {
    ElMessage.success('关闭成功')
    bus.emit('getList', 'Order')
  })
}
</script>

<style scoped>
.link {
  cursor: pointer;
  margin-right: 10px;
  color: blue;
  text-decoration: none;
}
</style>