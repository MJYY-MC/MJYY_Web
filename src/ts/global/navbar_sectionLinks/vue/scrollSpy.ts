import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {scrollValue} from "@/ts/global/vue/scroll.ts";
import {sectionEvent} from "@/ts/global/navbar_sectionLinks/sectionEvent.ts";

/**
 * 滚动所在元素（部分）监视，检测当前停留在哪个元素（部分）
 * @param allEle 需要被检测的元素
 * @return object 返回当前停留在的元素id
 */
export default function (allEle:HTMLElement[]){
    //当前停留在的元素的id
    const curStayEleId:Ref<string|null>=ref(null);
    const {scrollY,callback}=scrollValue();

    onMounted(()=>{
        callback.onScroll=()=>{
            for (let i=0;i<allEle.length;i++){
                const eTop=allEle[i]!.offsetTop;
                const eTopHeight=eTop+allEle[i]!.offsetHeight;
                if (scrollY.value>=eTop&&scrollY.value<eTopHeight){
                    if (curStayEleId.value != allEle[i]!.id) {
                        curStayEleId.value = allEle[i]!.id;
                        sectionEvent.emit('sectionStayChange',{secId:curStayEleId.value});
                    }
                    break;
                }
            }
        };
    });
    onUnmounted(()=>{
        callback.onScroll=null;
    });

    return {curStayEleId};
}