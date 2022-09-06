import instance from "../utils/request";

// 一次拉取首页所有数据
export const getAllHomepageDataApi = () => instance({
    url:'/home/index'
})

// 首页-广告区域
export const getBannerPicApi = () => instance({
    url:'/home/banner'
})