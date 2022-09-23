import {  BannerItem } from "@/types/data";
import { defineStore } from "pinia";
import { getBannerPicApi } from '@/api/home'

export default defineStore('home', {
    state: () => ({
        bannerList:[]as BannerItem[]
    }),
    actions: {
        async getBannerList() {
            const {result}= await getBannerPicApi()
            this.bannerList = result
        }
    }
})