import http from '../utils/http'

//初始化获得题
function initsubject(data){
 return http.post('/exam/api/qu/qu/paging',data)
}

//初始化搜索题库
function initQuestionBank(data){
    return http.post('/exam/api/repo/paging',data)
}

export{
    initsubject,
    initQuestionBank
}