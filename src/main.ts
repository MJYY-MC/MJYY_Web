//region 开发阶段的代码，开发完毕后将移除
import {isProd} from "@/ts/env/packMode.ts";
if (isProd){
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('jump') != 'false')//开发阶段如果不给禁止跳转的参数则自动跳转至旧官网
        window.location.replace('https://old.mjyy.top');
}
//endregion

import renderMode from "@/ts/env/renderMode.ts";

export const createApp:any=async ()=>{
    switch (renderMode){
        case 'spa':
        case 'spa-hash': {
            const module = await import("@/main-spa.ts");
            return module.default();
        }
        case 'ssg': {
            const module = await import("@/main-ssg.ts");
            return await module.default().createApp();
        }
        default:
            throw new Error(`Unknown RENDER_MODE: ${renderMode}`);
    }
};
createApp();