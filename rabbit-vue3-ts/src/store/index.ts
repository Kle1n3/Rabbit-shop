import useCategoryStore from './modules/category'
import useHomeStore from './modules/home'
const useStore = () => {
    return {
        category: useCategoryStore(),
        home:useHomeStore()
    }
}
export default useStore