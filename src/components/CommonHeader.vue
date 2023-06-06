<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="mini" @click="handMenu"></el-button>
            <!--面包屑-->
            <span class="text">首页</span>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                  <img class="userImg" src="../assets/images/user.png" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>推出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods:{
        handMenu(){
            console.log(this.$store)
            console.log(this.$store.state.isCollapse)
            this.$store.commit('collapseMenu')
        }
    }
}
</script>

<style scoped lang="less">
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content{
    .userImg{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

</style>