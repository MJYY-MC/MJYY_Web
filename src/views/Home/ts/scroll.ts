import {onMounted, onUnmounted, type Ref, ref} from "vue";

export function scrollValue() {
    //滚动位置
    const scrollY: Ref<number> = ref(0);
    function handleScroll() {
        scrollY.value = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if (callback.onScroll)
            callback.onScroll();
    }

    //事件回调函数
    const callback:{
        //滚动事件
        onScroll:(()=>void)|null
    }
    ={
        onScroll:null
    };
    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
    return {scrollY,callback};
}