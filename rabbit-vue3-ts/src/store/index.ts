import useCategoryStore from './modules/category'
import useHomeStore from './modules/home'
import useUserStore from './modules/user'
const useStore = () => {
    return {
        category: useCategoryStore(),
        home: useHomeStore(),
        user:useUserStore()
    }
}
export default useStore