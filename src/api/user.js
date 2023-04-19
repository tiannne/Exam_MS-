import instance from '../utils/createaxios'


//登录请求
export const login = (username,password)=>{
   return instance({
        url:'/exam/api/sys/user/login',
        method:'POST',
        data:{
            username,
            password
        }
    
    })
}

//获取考试列表
export const getExamListData = (data)=>{
    return instance({
        url:'/exam/api/exam/exam/paging',
        method:'POST',
        data
    })
}

// 获取部门列表
export const getdepartTree = ()=>{
    return instance({
        url:'exam/api/sys/depart/tree',
        method:'POST',
    })
}

//提交试卷
export const setExamSave = (data)=>{
    return instance({
        url:'/exam/api/exam/exam/save',
        method:'POST',
        data
    })
}


// 获取考试状态列表
export const getExamRepoApi = (data)=>{
    return instance({
        url:'/exam/api/repo/paging',
        method:'POST',
        data
    })
}

export const getExampaging = (data)=>{
    return instance({
        url:'/exam/api/user/exam/paging',
        method:'POST',
        data
    })
}

export const getExamXiangQing = (data)=>{
    return instance({
        url:'/exam/api/paper/paper/paging',
        method:'POST',
        data
    })
}

//状态接口
export const setExamStore =(ids,state) =>{
    return instance({
        url:'/exam/api/exam/exam/state',
        method:'POST',
        data:{
            ids,
            state
        }
    })
}

export const setExamDel  = (data) => instance({url:'/exam/api/exam/exam/delete',method:'POST',data})


//身份校验
export const info = (token)=>{
    return instance({
        url:'/exam/api/sys/user/info',
        method:'POST',
        data:{
            token
        }
    })
}

export const getlist =()=>{
    
}