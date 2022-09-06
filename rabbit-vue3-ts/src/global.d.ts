import XtxSkeleton from '@/components/skeleton/index.vue'
// import XtxCheckbox from '@/components/checkbox/index.vue'
declare module 'vue' {
    export interface GlobalComponents{
      XtxSkeleton: typeof XtxSkeleton,
      // XtxCheckbox: typeof XtxCheckbox
    }
}