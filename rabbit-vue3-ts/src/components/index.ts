import XtxSkeleton from './skeleton/index.vue'
import XtxCarousel from './carousel/index.vue'
import XtxCheckbox from './checkbox/index.vue'
import XtxMessage from './message/index.vue'
import { App } from 'vue'
export default {
    install(app: App) {
        app.component('XtxSkeleton', XtxSkeleton)
        app.component('XtxCarousel', XtxCarousel)
        app.component('XtxCheckbox',XtxCheckbox)
        app.component('XtxMessage',XtxMessage)
        
    }
}