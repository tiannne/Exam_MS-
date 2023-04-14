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
//删除
function removeQuestion(data){
    return http.post('/exam/api/qu/qu/delete',data)
}

//添加试题
function addQuestion(data){
    return http.post('/exam/api/qu/qu/save',data)
}
//获取题详情
function questionDetail(data){
    return http.post('/exam/api/qu/qu/detail',data)
}
//获取题库id对应的题库名称
function questionBankDetail(data){
    return http.post('/exam/api/repo/detail',data)
}
export{
    initsubject,
    initQuestionBank,
    tiAddOrMovueToBank,
    removeQuestion,
    addQuestion,
    questionDetail,
    questionBankDetail
}