import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/Views/Home.vue";
import User from "@/Views/User.vue";
import Main from "@/Views/Main.vue";
import Mall from "@/Views/Mall.vue";
import PageOne from "@/Views/PageOne.vue"
import PageTwo from "@/Views/PageTwo.vue"

Vue.use(VueRouter)


//1.创建路由组件
const routes = [
    //主路由
    {
        path: '/',
        component: Main,
        redirect:'/home',
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'user',
                component: User
            },
            {
                path: 'mall',
                component:Mall
            },
            {
                path: 'page1',
                component: PageOne
            },
            {
                path: 'page2',
                component: PageTwo
            }
        ]
    }

]

const router = new VueRouter({
    routes
})
export default router
