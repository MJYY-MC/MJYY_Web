//region 开发阶段的代码，开发完毕后将移除
import {isProd} from "@/ts/global/packMode.ts";
if (isProd){
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('jump') != 'false')//开发阶段如果不给禁止跳转的参数则自动跳转至旧官网
        window.location.replace('https://old.mjyy.top');
}
//endregion

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import {i18n} from "@/plugins/i18n.ts";

import '@/assets/scss/bootstrap/bs-custom.scss';
import 'bootstrap';
import '@/assets/scss/color/global-color.scss';
import 'virtual:svg-icons-register';//vite-plugin-svg-icons的虚拟模块

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app');
