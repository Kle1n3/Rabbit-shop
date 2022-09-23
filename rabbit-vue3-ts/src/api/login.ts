import instance from "@/utils/request";
interface dataType{
    account: string
    password:string
}
// 登录-用户名和密码
export const loginbyAccountApi = (data:dataType) => instance({
    url: '/login',
    method: 'POST',
    data
})

// 获取短信验证码-登录-PC
export const getMobileMsgApi = (params:{mobile:string}) => instance({
    url: '/login/code',
    params
})

// 手机验证码登录
export const mobileLoginApi = (data: { mobile: string, code: string }) => instance({
    url: '/login/code',
    method: 'post',
    data
})