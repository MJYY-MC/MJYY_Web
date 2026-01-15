import mitt, {type Emitter} from "mitt";
import {onMounted, onUnmounted, type Ref} from "vue";

type styleEvent={
    classToggle:{className:string, toggle?:boolean|undefined},
    backgroundColorChange:{value:string};
    opacityChange:{value:string};
}
const navbarStyleEvent: Emitter<styleEvent> = mitt<styleEvent>();

export function navbarStyleInit(navbar:Ref<HTMLDivElement|null>){
    function handleBackgroundColor(data:{value:string}){
        if (navbar.value && navbar.value.style.backgroundColor!=data.value)
            navbar.value.style.backgroundColor=data.value;
    }
    function handleOpacityChange(data:{value:string}){
        if (navbar.value && navbar.value.style.opacity!=data.value)
            navbar.value.style.opacity=data.value;
    }
    onMounted(async () => {
        navbarStyleEvent.on('backgroundColorChange',handleBackgroundColor);
        navbarStyleEvent.on('opacityChange',handleOpacityChange);
    });
    onUnmounted(async ()=>{
        navbarStyleEvent.off('backgroundColorChange',handleBackgroundColor);
        navbarStyleEvent.off('opacityChange',handleOpacityChange);
    });
}

/**
 * 设置导航栏背景色
 * @param val 值
 */
export function setBackgroundColor(val:string){
    navbarStyleEvent.emit('backgroundColorChange',{value:val});
}
export function setOpacity(val:string){
    navbarStyleEvent.emit('opacityChange',{value:val});
}


export function navbarClassInit(navbar:Ref<HTMLDivElement|null>){
    function handleClassToggle(data:{className:string,toggle?:boolean|undefined}) {
        if (navbar.value){
            if (data.toggle!==undefined)
                navbar.value.classList.toggle(data.className,data.toggle);
            else
                navbar.value.classList.toggle(data.className);
        }
    }
    onMounted(()=>{
        navbarStyleEvent.on('classToggle',handleClassToggle);
    });
    onUnmounted(()=>{
        navbarStyleEvent.off('classToggle',handleClassToggle);
    });
}

/**
 * 切换样式类名
 * @param cn 类名
 * @param tog 切换开关
 */
export function toggleClass(cn:string,tog:boolean|undefined=undefined){
    navbarStyleEvent.emit('classToggle',{className:cn,toggle:tog});
}