import http from '../utils/http'
//初始搜索部门
function findDepart(data) {
 return http.post('/exam/api/sys/config/detail', data)
}

//搜索部门
function findPaging(data) {
 return http.post('/exam/api/sys/depart/paging', data)
}

//添加部门
function findSave(data){
 return http.post('/exam/api/sys/depart/save',data)
}

//删除部门
function finddelete(data){
 return http.post('/exam/api/sys/depart/delete',data)
}

export {
 findDepart,
 findSave,
 findPaging,
 finddelete
}