import instance from '../utils/createaxios'


//登录请求
export const login = (username, password) => {
    return instance({
        url: '/exam/api/sys/user/login',
        method: 'POST',
        data: {
            username,
            password
        }

    })
}

//身份校验
export const info = (token) => {
    return instance({
        url: '/exam/api/sys/user/info',
        method: 'POST',
        data: {
            token
        }
    })
}

//初始化渲染部门
export const findPaging = (data) => {
    return instance({
        url: '/exam/api/sys/depart/paging',
        method: 'POST',
        data
    })
}


//添加部门
export const findSave = (data) => {
    return instance({
        url: '/exam/api/sys/depart/save',
        method: 'POST',
        data
    })
}
