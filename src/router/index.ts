import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {nextTick} from "vue";
import renderMode from "@/ts/env/renderMode.ts";

export function hashCheckAndScroll(){
    //元素锚点跳转处理。示例url：/#/#home
    nextTick(() => {
        const hash:string[] = window.location.hash.split('#');
        if (hash.length>1) {
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
    history: (()=>{
        switch (renderMode){
            case 'ssg':
                return import.meta.env.SSR ? createMemoryHistory() : createWebHistory();
            case 'spa':
                return createWebHistory();
            case 'spa-hash':
                return createWebHashHistory();//hash模式，使用'#'内部导航，'#'及后面的内容不会发送给服务器，避免了非'/'时404的情况。
            default:
                throw new Error(`Unknown RENDER_MODE: ${renderMode}`);
        }
    })(),
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
            path: '/servermap',
            name: 'serverMap',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                route_reloadKey: "serverMap",

                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,

                authSubPage_targetUrlPath: '/gateway/post/minecraft_servermap',
                localePrefix: 'view_rpsp_serverMap',

                navbar_sectionLinks_Comp: () => import("@/components/pages/serverMap/component/navbar_tool-button.vue"),
                //执行serverMap页面所需的问题修复代码
                authSubPage_doServerMapFix: true,
            },
        },
        {
            path: '/analyticspanel',
            name: 'analyticsPanel',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                route_reloadKey: "analyticsPanel",

                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,

                authSubPage_targetUrlPath: '/gateway/post/minecraft_plan',
                localePrefix: 'view_rpsp_analyticsPanel',
            },
        },
        {
            path: '/messageboard',
            name: 'messageBoard',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                //使用不同的key，让router-view重新加载复用页面
                route_reloadKey: "messageBoard",

                //为view添加顶部内边距，防止导航栏遮挡
                app_view_usePaddingTop: true,
                //将view大小固定为全屏
                app_view_useFullScreen: true,

                //目标请求地址
                authSubPage_targetUrlPath: '/gateway/post/minecraft_messagepage',
                //语言文件前缀
                localePrefix: 'view_rpsp_messageBoard',
            }
        },
        {
            path: '/game/fiar',
            name: 'game_fiar',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                route_reloadKey: "game_fiar",

                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,

                authSubPage_targetUrlPath: '/gateway/post/game_fiar',
                localePrefix: 'view_rpsp_game_fiar',
            }
        },
    ],
});
router.afterEach((_to,_from)/*(to,from)*/ => {
    hashCheckAndScroll();
});

export default router;