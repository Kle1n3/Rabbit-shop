<script lang="ts" setup name="XtxCarousel">
    import{BannerItem} from '@/types/data'
import {onMounted,onUnmounted, PropType,ref } from 'vue';

    const props=defineProps({
        list:{
            type:Array as PropType<BannerItem[]>,
            required:true
        },
        duration:{
            type:Number,
            default:3000
        },
        autoPlay:{
            type:Boolean,
            default:true
        }
    })
    let activeID=ref(0)
    const leftFn=()=>{
        
        if(activeID.value<=0){
            activeID.value = props.list.length-1
        }else{
            activeID.value--
        }
        
    }
    const rightFn=()=>{
        if(activeID.value>=props.list.length-1){
            activeID.value=0
        }else{
            activeID.value++
        }
        
    }
    let timer =-1
    const play=()=>{
        if(!props.autoPlay) return
         timer = window.setInterval(()=>{
            rightFn()
        },props.duration)

    }
    const clear=()=>{
        clearInterval(timer)
    }
    onMounted(()=>{
        play()
    })
    onUnmounted(()=>{
        clear()
    })
    </script>
    
    <template>
      <div @mouseenter="clear" @mouseleave="play" class="xtx-carousel">
        <ul class="carousel-body">
          <li  class="carousel-item"  v-for="(obj,index) in list" :key="obj.id" :class="{fade:activeID===index}">
            <RouterLink :to="obj.hrefUrl">
              <img
                :src="obj.imgUrl"
                alt=""
              />
            </RouterLink>
          </li>
        </ul>
        <a @click="leftFn" href="javascript:;" class="carousel-btn prev"
          ><i class="iconfont icon-angle-left"></i
        ></a>
        <a @click="rightFn" href="javascript:;" class="carousel-btn next"
          ><i class="iconfont icon-angle-right"></i
        ></a>
        <div class="carousel-indicator">
          <span @mouseenter="activeID=index"  v-for="(obj,index) in list" :key="obj.id" :class="{active:activeID===index}"></span>
        </div>
      </div>
    </template>
    
    <style scoped lang="less">
    .xtx-carousel {
      width: 100%;
      height: 100%;
      min-width: 300px;
      min-height: 150px;
      position: relative;
      .carousel {
        &-body {
          width: 100%;
          height: 100%;
        }
        &-item {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          transition: opacity 0.5s linear;
          &.fade {
            opacity: 1;
            z-index: 1;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        &-indicator {
          position: absolute;
          left: 0;
          bottom: 20px;
          z-index: 2;
          width: 100%;
          text-align: center;
          span {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            cursor: pointer;
            ~ span {
              margin-left: 12px;
            }
            &.active {
              background: #fff;
            }
          }
        }
        &-btn {
          width: 44px;
          height: 44px;
          background: rgba(0, 0, 0, 0.2);
          color: #fff;
          border-radius: 50%;
          position: absolute;
          top: 228px;
          z-index: 2;
          text-align: center;
          line-height: 44px;
          opacity: 0;
          transition: all 0.5s;
          &.prev {
            left: 20px;
          }
          &.next {
            right: 20px;
          }
        }
      }
      &:hover {
        .carousel-btn {
          opacity: 1;
        }
      }
    }
    </style>