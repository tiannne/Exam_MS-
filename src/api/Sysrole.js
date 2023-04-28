import http from '../utils/http'
function initRoleList(data){
    return http.post('exam/api/sys/role/paging',data)
}
function save(data){
    return http.post('exam/api/sys/user/save',data)
}



export {
    initRoleList,
    save
    
}