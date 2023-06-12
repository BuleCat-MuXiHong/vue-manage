import Cookie from "js-cookie";
import Router from "@/router";

export default {
    state: {
        isCollapse: false,
        tableList: [
            //面包屑
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state, val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                let index = state.tableList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tableList.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state, item) {
            const index = state.tableList.findIndex(val => val.name === item.name)
            state.tableList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item=>{
                if (item.children){
                    item.children = item.children.map(item=>{
                        item.component = () => import(`../Views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else {
                    item.component= ()=>import(`../Views/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item=>{
                Router.addRoute('Main',item)
            })

        }
    }

}