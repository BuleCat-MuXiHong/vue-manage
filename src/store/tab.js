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
        ]
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        selectMenu(state, val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                let index =state.tableList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tableList.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state,item){
            const index =  state.tableList.findIndex(val=>val.name===item.name)
            state.tableList.splice(index,1)
        }
    }
}