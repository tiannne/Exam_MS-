import http from '../utils/http'
function initLogoInfo(data){
    return http.post('exam/api/sys/config/detail',data)
}
//更新
function RoleListSave(data){
    return http.post('exam/api/sys/config/save',data)
}
export {
    initLogoInfo,
    RoleListSave
}