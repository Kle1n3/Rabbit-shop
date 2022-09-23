import { defineStore } from 'pinia'
import { Profile } from '@/types/user'
import { loginbyAccountApi,getMobileMsgApi,mobileLoginApi } from '@/api/login'
import { setProfile, getProfile, removeProfile } from '@/utils/LocalStorage'
export default defineStore({
    id: 'user',
    state: () => ({
        profile:getProfile() ||{} as Profile
    }),
    actions: {
        async login(account: any, password: any) {
            console.log(account,password);
            console.log(333);
            const {result} = await loginbyAccountApi({
                account,
                password
            })
            console.log(444);
            
            this.profile = result
            setProfile(result)
        },
        logout() {
            this.profile = {} as Profile
            removeProfile()
        },
        async sendMobileMSG(mobile: string) {
            await getMobileMsgApi({ mobile })
        },
        async mobileLogin(mobile: string, code: string) {
            const {result} = await mobileLoginApi({ mobile, code })
            this.profile = result
            setProfile(result)
        }
    }
})