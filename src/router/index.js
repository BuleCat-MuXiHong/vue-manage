import Vue from "vue";
import VueRouter from "vue-router";
import Main from "@/Views/Main.vue";
import Login from "@/components/Login.vue";

Vue.use(VueRouter)


//1.创建路由组件
const routes = [
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    //主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',
        name:'Main',
        children: [
            // {
            //     path: 'home',
            //     name: 'home',
            //     component: Home
            // },
            // {
            //     path: 'user',
            //     name: 'user',
            //     component: User
            // },
            // {
            //     path: 'mall',
            //     name: 'mall',
            //     component: Mall
            // },
            // {
            //     path: 'page1',
            //     name: 'page1',
            //     component: PageOne
            // },
            // {
            //     path: 'page2',
            //     name: 'page2',
            //     component: PageTwo
            // }
        ]
    }

]

const router = new VueRouter({
    routes
})
export default router
