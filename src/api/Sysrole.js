import http from '../utils/http'
function initRoleList(data){
    return http.post('exam/api/sys/role/paging',data)
}


export {
    initRoleList,
    
}