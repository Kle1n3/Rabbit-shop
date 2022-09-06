import { h, render } from 'vue'
import XtxMessage from './index.vue'
type Props = {
    type: 'success' | 'error' | 'warning'
    text: string
    duration?:Number
}

const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
export default function Message({ type, text,duration=2000 }: Props) {
    const vNode = h(XtxMessage, { type, text })
    render(vNode, div)
    const timer=-1
    clearTimeout(timer)
     timer = setTimeout(() => {
        render(null,div)
    },duration)
}

