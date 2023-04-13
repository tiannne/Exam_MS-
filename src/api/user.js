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