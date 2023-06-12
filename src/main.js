import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' //全局引入
// import { Row,Button } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router";
import store from "@/store";
import "./api/mock"
import Cookie from "js-cookie";


Vue.config.productionTip = false
Vue.use(ElementUI) //全局引入
// Vue.use(Row)
// Vue.use(Button)

router.beforeEach((to, from, next) => {
    //判断token是否存在
    const token = Cookie.get("token")
    if (!token && to.name!=='login'){
        next({name:'login'})
    }else if (token && to.name === 'login'){
        next({name:'home'})
    }else {
        next()
    }
})

new Vue({
    router,
    store,
    created() {
        store.commit('addMenu',router)
    },
    render: h => h(App),
}).$mount('#app')
