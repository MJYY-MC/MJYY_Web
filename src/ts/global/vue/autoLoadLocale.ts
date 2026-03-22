import {loadOtherLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {onMounted, onUnmounted, ref, type Ref} from "vue";

/**
 * 加载语言和监听语言更改并执行加载
 * @param localePrefix 语言文件前缀
 * @param loadedRun 语言加载完成后执行的函数
 */
export default function (localePrefix:string,loadedRun:(()=>void)|null=null){
    const isReady:Ref<boolean>=ref(false);

    async function onLocaleChange(data:{newLocale:string; /*currentLocale:string;*/}){
        isReady.value = false;
        await loadOtherLocale(localePrefix,data.newLocale);//语言更改前加载目标语言
        isReady.value = true;
    }
    onMounted(async () => {
        isReady.value = false;
        await loadOtherLocale(localePrefix);
        isReady.value = true;

        localeEvents.on('beforeLocaleChange',onLocaleChange);
        if (loadedRun)
            loadedRun();
    });
    onUnmounted(async ()=>{
        localeEvents.off('beforeLocaleChange',onLocaleChange);
    });

    return {isReady};
}