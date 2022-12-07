// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import {
  $http
} from '@escook/request-miniprogram'

import store from 'store/store.js'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title:'数据加载中...'
	})
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

// 挂载弹框组件
uni.$showToast=function(title = '数据请求失败' , duration = 1500 , icon = 'none'){
	uni.showToast({
		title,
		duration,
		icon
	})
}

Vue.config.productionTip = false
import { eventBus } from './utils/eventBus.js'
Vue.prototype.$eventBus = eventBus

App.mpType = 'app'

const app = new Vue({
  ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp,
	Vue
} from 'vue'
import ClUni from "cl-uni";
import App from './App.vue'

Vue.use(ClUni, {
	// 进入业务单页时，页面栈只有一个，自定义导航左侧返回按钮跳转的路径
	homePage: "/"
});
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
