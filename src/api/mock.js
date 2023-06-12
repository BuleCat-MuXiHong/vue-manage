import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permissionApi from './mockServeData/permission'


Mock.mock('/api/home/getData', homeApi.getStatisticalData)

Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUsers/,user.getUserList)

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)