<template>
  <el-card class="introduce">
    <div class="order">
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>今日订单数</span>
          </div>
        </template>
        <div class="item">1888</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>今日日活</span>
          </div>
        </template>
        <div class="item">36271</div>
      </el-card>
      <el-card class="order-item">
        <template #header>
          <div class="card-header">
            <span>转化率</span>
          </div>
        </template>
        <div class="item">20%</div>
      </el-card>
    </div>
  </el-card>
</template>

<script setup>
// import {onMounted, onUnmounted} from "vue";
//
// let myChart = null
//
// onMounted(() => {
//   if (window.echats) {
//     //  基于准备好的dom节点，初始化echarts实例
//     myChart = window.echats.init(document.getElementById('zoom'))
//
//     //  指定图表的配置项和数据
//     const option = {
//       xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//       },
//       yAxis: {
//         type: 'value'
//       },
//       series: [
//         {
//           data: [820, 932, 901, 934, 1290, 1330, 1320],
//           type: 'line',
//           smooth: true
//         }
//       ]
//     }
//
//     // 使用刚指定的配置项和数据显示图表。
//     myChart.setOption(option)
//   }
//   onUnmounted(() => {
//     myChart.dispose()
//   })
// })
</script>

<style scoped>
.introduce .order {
  display: flex;
  margin-bottom: 50px;
}

.introduce .order .order-item {
  flex: 1;
  margin-right: 20px;
}

.introduce .order .order-item:last-child {
  margin-right: 0;
}

#zoom {
  min-height: 300px;
}
</style>