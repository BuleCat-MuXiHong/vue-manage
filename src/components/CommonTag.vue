<template>
    <div class="tags">
        <el-tag
                v-for="(item,index) in tags"
                :key="item.path"
                :effect="$route.name===item.name ? 'dark':'plain'"
                :closable="item.name!=='home'"
                @click="changeMenu(item)"
                @close="handleClose(item,index)"
                size="small"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: 'CommonTag',
    computed: {
        ...mapState({
            tags: state => state.tab.tableList
        })
    },
    methods: {
        ...mapMutations(['closeTag']),
        //点击tag跳转页面
        changeMenu(item) {
            if (this.$route.name !== item.name && !(this.$route.path === '/home' && (item.path === '/'))) {
                this.$router.push({name: item.name})
            }

        },
        //删除tag
        handleClose(item, index) {
            const length = this.tags.length
            //调用store中的Mutations
            this.closeTag(item)
            //删除之后的效果
            if (item.name !== this.$route.name) {
                return
            }
            //表示删除的是最后一项
            if (index === length - 1) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}

</script>

<style scoped>
.tags {
    padding: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>
