import { createApp } from "vue";
import {
  ElButton,
  ElContainer,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElPopover,
  ElTag,
  ElCard,
  ElTable,
  ElTableColumn,
  ElPopconfirm,
  ElUpload,
  ElDialog,
  ElPagination,
  ElCascader,
  ElRadioGroup,
  ElRadio,
  ElSelect,
  ElOption,
  ElLoading,
} from "element-plus";
import App from "./App.vue";
import router from "@/router/index.js";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

const app = createApp(App);
// 聲明一個全局方法給路徑添加host
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith("http")) {
      // 当 url 以 http 开头时候，我们返回原路径
      return url;
    } else {
      // 否则，我们给路径添加 host，如下
      url = `http://backend-api-02.newbee.ltd${url}`;
      return url;
    }
  },
};
// 將滾動條滾動到最上方
app.config.globalProperties.goTop = function () {
  const main = document.querySelector(".main");
  main.scrollTop = 0;
};
//引入图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//引用路由
app.use(router);
//引入elementUI 中使用到的对应组件
app
  .use(ElButton)
  .use(ElContainer)
  .use(ElAside)
  .use(ElMenu)
  .use(ElSubMenu)
  .use(ElMenuItemGroup)
  .use(ElMenuItem)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElCheckbox)
  .use(ElInput)
  .use(ElPopover)
  .use(ElTag)
  .use(ElCard)
  .use(ElTable)
  .use(ElTableColumn)
  .use(ElPopconfirm)
  .use(ElUpload)
  .use(ElDialog)
  .use(ElPagination)
  .use(ElCascader)
  .use(ElRadioGroup)
  .use(ElRadio)
  .use(ElSelect)
  .use(ElOption)
  .use(ElLoading);
//挂载app
app.mount("#app");
