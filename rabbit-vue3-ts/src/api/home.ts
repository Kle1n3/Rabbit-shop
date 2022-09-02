import instance from "../utils/request";

// 一次拉取首页所有数据
export const getAllHomepageDataApi = () => instance({
    url:'/home/index'
})