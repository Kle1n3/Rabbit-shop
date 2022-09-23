import { h, render } from 'vue'
import XtxMessage from './index.vue'
type Props = {
    type: 'success' | 'error' | 'warning'
    text: string,
    isShow?:boolean
    duration?:number
}

const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
export default function Message({ type, text, isShow,duration=2000 }: Props) {
    const vNode = h(XtxMessage, { type, text,isShow })
    render(vNode, div)
    let timer=-1
    clearTimeout(timer)
     timer = window.setTimeout(() => {
        render(null,div)
     }, duration)  
}
Message.error = (text: string, duration = 2000) => {
    Message({
        type: 'error',
        text,
        isShow:true,
        duration,
    })
}
Message.success = (text:string , duration = 2000 ) => {
    Message({
        type: 'success',
        text,
        isShow:true,
        duration
    })
}
Message.warning = (text: string, duration = 2000)=>{
    Message({
        type: 'warning',
        text,
        isShow:true,
        duration
    })
}

