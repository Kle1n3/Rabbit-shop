export interface ApiRes<any>{
    code: string
    msg: string
    result:any
}

export type CategoryItem = {
    id: string
    name: string
    picture: string
    goods: []
    open:boolean
    children:CategoryItem[]
}

export type CategoryGoods = {
    desc: string
    id: string
    name: string
    picture: string
    price:string
}

export type BannerItem = {
    hrefUrl: string
    id: string
    imgUrl: string
    type:string
}