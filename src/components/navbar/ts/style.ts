import mitt, {type Emitter} from "mitt";
import {onMounted, onUnmounted, type Ref, ref} from "vue";

type styleEvent={
    backgroundColorChange:{value:string};
}
const navbarStyleEvent: Emitter<styleEvent> = mitt<styleEvent>();

export function navbarStyleInit(){
    const styBackgroundColor:Ref<string>=ref('');
    function handleBackgroundColor(data:{value:string}){
        if (styBackgroundColor.value!=data.value)
            styBackgroundColor.value=data.value;
    }
    onMounted(async () => {
        navbarStyleEvent.on('backgroundColorChange',handleBackgroundColor);
    });
    onUnmounted(async ()=>{
        navbarStyleEvent.off('backgroundColorChange',handleBackgroundColor);
    });
    return {styBackgroundColor};
}

/**
 * 设置导航栏背景色
 * @param val 值
 */
export function setBackgroundColor(val:string){
    navbarStyleEvent.emit('backgroundColorChange',{value:val});
}