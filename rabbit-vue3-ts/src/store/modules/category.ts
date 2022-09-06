import { defineStore } from 'pinia'
import { getHeaderCategoryApi } from '@/api/category'
import { ApiRes, CategoryItem } from '@/types/data'
import { topCategory } from '../constants'
const defaultCategory = topCategory.map(item => {
    return {
        name:item
    }
})
export default defineStore('category', {
    state: ()=>({
        categoryList:defaultCategory as CategoryItem[]
    }),
    getters: {
        
    },
    actions: {
        async getHeaderCategory() {
            const { result } = await getHeaderCategoryApi()
            console.log(result);
            
            result.forEach(item => {
                item.open=false
            })
            this.categoryList = result
        },
        show(id: string) {
            const category = this.categoryList.find(item => item.id === id)
            category!.open=true
        },
        hide(id: string) {
            const category = this.categoryList.find(item => item.id === id)
            category!.open = false
        }
    }
})