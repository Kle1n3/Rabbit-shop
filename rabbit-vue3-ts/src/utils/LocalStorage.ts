import { Profile } from '@/types/user'
const PROFILE_KEY = 'rabbit-profile-92'

export const setProfile = (profile: Profile): void => {
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))
}

export const getProfile = ():Profile => {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}')
}

export const removeProfile = (): void => {
    localStorage.removeItem(PROFILE_KEY)
}