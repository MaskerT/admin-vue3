# 基于vue3-vite-Element搭建的后台管理系統

### Build Setup
install dependencies
> npm install

Compiles and hot-reloads for development
> npm run dev

Compiles and minifies for production
> npm run build

### 最近更新
- 抽離公共組件table，更換新的Pagination寫法
- 利用全局時間總綫來統一管理table的渲染
- 用新的公共組件table重寫Guest,Good,Swiper,以減少商品管理，輪播圖配置，會員管理部分的代碼量
- 用新的公共組件table重寫indexConfig,Category，以減少熱銷商品等三個子路由分類，分類管理多級公用table，的代碼量

### 優化相關
- 路由懶加載
- 抽離公共組件，并對其中包含的element組件進行二次封裝

### 鳴謝
特別鳴謝程序員十三提供的教程内容和後端接口
後端倉庫地址：https://github.com/newbee-ltd/newbee-mall-api