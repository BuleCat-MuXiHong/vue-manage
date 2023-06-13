<template>
    <div class="manage">
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd">+ 新增</el-button>
        <!--  收缩  -->
            <el-form :inline="true" :model="userForm" label-width="80px">
                <el-form-item >
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
                :title="modalType===0?'新增':'修改'"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"/>
                        <el-option label="女" :value="0"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                            v-model="form.birth"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-DD"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <el-table :data='tableData' height="88%" style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="birth" label="出生日期"></el-table-column>
            <el-table-column prop="addr" label="地址"></el-table-column>
            <el-table-column prop="addr" label="地址">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageData.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {addUser, delUser, editUser, getUser} from "@/api";

export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                ],
                age: [
                    {required: true, message: '请输入年龄', trigger: 'blur'},
                ],
                sex: [
                    {required: true, message: '请输入性别', trigger: 'blur'},
                ],
                birth: [
                    {required: true, message: '请输入出生日期', trigger: 'blur'},
                ],
                addr: [
                    {required: true, message: '请输入地址', trigger: 'blur'},
                ]
            },
            tableData: [],
            modalType: 0,  //0是新增弹框 1是编辑
            pageData:{
                page:1,
                limit:10,
            },
            total:0,
            userForm:{
                name:''
            }
        }
    },
    methods: {
        handleSizeChange(val){
            this.pageData.limit = val
            this.getUserList()
        },
        handleCurrentChange(val){
            this.pageData.page  = val
            this.getUserList()
        },
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            //刷新
                            this.getUserList()
                        })
                    } else {
                        editUser(this.form).then(() => {

                            //刷新
                            this.getUserList()
                        })
                    }


                    this.$message.success("提交成功")
                    this.handleClose()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        cancel() {
            this.handleClose()
        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true;
        }
        ,
        handleEdit(val) {
            this.modalType = 1;
            this.dialogVisible = true;
            //注意需要对数据进行深拷贝，否则会出错
            this.form = JSON.parse(JSON.stringify(val))
        },
        handleDel(val) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({id:val.id}).then(()=>{
                    this.getUserList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        getUserList() {
            getUser({params:{ ...this.userForm,...this.pageData}}).then(({data}) => {
                console.log(data)
                console.log({...this.userForm,...this.pageData})
                this.tableData = data.list
                this.total = data.count
            })
        },
        onSubmit(){
            console.log(this.userForm.name)
            console.log({...this.userForm,...this.pageData})
            this.getUserList()
        }
    },
    mounted() {
        this.getUserList()
    }
}
</script>

<style scoped>
    .manage{
        height: 100%;
    }
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
