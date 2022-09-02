import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
    timeout:5000,
})


instance.interceptors.request.use(config => {
    return config
},
    error => {
    return error
    })

instance.interceptors.response.use(response => {
    return response
},
    error => {
    return error
    })

    export default instance