import axios from 'axios'
import { ApiRes } from '@/types/data'
import Message from '@/components/message'
const instance = axios.create({
    baseURL: 'http://apipc-xiaotuxian-front.itheima.net/',
    timeout:5000,
})


instance.interceptors.request.use(config => {
    return config
},
    error => {
    return Promise.reject(error)
    })

instance.interceptors.response.use<ApiRes<any>>(response => {
    console.log(response);
    const { data,status } = response
    if (status===200) {
        return data
    }
    else {  
        return response
    }
    // return response
},
    error => {
        if (!error.response) {
            Message.error('网络异常，请稍后重置')
        } else {
            Message.error(error.response.data.message)
        }
    return Promise.reject(error)
    })

    export default instance