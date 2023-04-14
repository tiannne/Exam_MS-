import http from '../utils/http'

//初始化获得题
function initsubject(data){
 return http.post('/exam/api/qu/qu/paging',data)
}

//初始化搜索题库
function initQuestionBank(data){
    return http.post('/exam/api/repo/paging',data)
}

//批量添加到/移出题库

function tiAddOrMovueToBank(data){
    return http.post('/exam/api/repo/batch-action',data)
}
function removeQuestion(data){
    return http.post('/exam/api/qu/qu/delete',data)
}

//删除
export{
    initsubject,
    initQuestionBank,
    tiAddOrMovueToBank,
    removeQuestion
}