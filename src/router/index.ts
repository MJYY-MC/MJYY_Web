import {createRouter, createWebHashHistory} from 'vue-router';
import {nextTick} from "vue";

export function hashCheckAndScroll(){
    //元素锚点跳转处理。示例url：/#/#home
    nextTick(() => {
        const hash:string[] = window.location.hash.split('#');
        if (hash.length==2+1) {
            const sectionHash: string | undefined = (()=>{
                const popStr:string|undefined=hash.pop();
                if (popStr!=undefined){
                    const urlParCheck=popStr.split('?');
                    if (urlParCheck.length!=1)
                        return `#${urlParCheck[0]}`
                    else
                        return `#${popStr}`;
                }
                else
                    return undefined;
            })();
            if (sectionHash!=undefined) {
                const targetEl: HTMLElement | null = document.querySelector<HTMLElement>(sectionHash);
                if (targetEl) {
                    targetEl.scrollIntoView({
                        behavior: 'smooth',//平滑
                        block: 'start',//元素顶对其视口顶
                    });
                }
            }
        }
    }).then();
}

const router = createRouter({
    history: createWebHashHistory(),//hash模式，使用'#'内部导航，'#'及后面的内容不会发送给服务器，避免了非'/'时404的情况。
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/Home.vue'),
            meta:{
                navbar_sectionLinks_Comp: () => import("@/views/Home/components/navbar_section-links.vue"),
            }
        },
        {
            path: '/test',
            name: 'test',
            component: ()=>import('@/views/test/test.vue'),
        }
    ],
});
router.afterEach((_to,_from)/*(to,from)*/ => {
    hashCheckAndScroll();
});

export default router;