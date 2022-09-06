import axios from 'axios'
import { ApiRes } from '@/types/data'
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
    return Promise.reject(error)
    })

    export default instance