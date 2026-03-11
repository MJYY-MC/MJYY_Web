import {inject} from "vue";
import type {CreateToast, ToastData} from "@/components/toast/ts/toast.type.ts";
import {createToastKey} from "@/ts/App/toastInit.ts";
import dayjs from "dayjs";
import {sleep} from "@/utils/sleep.ts";

/**
 * 创建吐司框
 * @param toastData 吐司框数据
 * @param doneCallBack 完成后的回调函数
 * @param autoTime 自动将时间板块的内容设置为当前时间
 * @param autoUseI18nKey 自动将toastData.title.i18n.isI18nKey的值设置为true
 */
export default async function (
    toastData:ToastData,
    doneCallBack:(()=>void)|undefined=undefined,
    autoTime:boolean=true,
    autoUseI18nKey:boolean=true,
) {
    while (true) {
        const ct: CreateToast | undefined = inject(createToastKey);
        if (ct) {
            if (autoTime) {
                toastData.time = {
                    content: dayjs().format('HH:mm:ss.SSS'),
                };
            }
            if (autoUseI18nKey){
                if (toastData.title.i18n)
                    toastData.title.i18n.isI18nKey=true
                else
                    toastData.title.i18n={
                        isI18nKey:true,
                    };
                if (toastData.body.i18n)
                    toastData.body.i18n.isI18nKey = true;
                else
                    toastData.body.i18n={
                        isI18nKey:true,
                    };
            }
            ct(toastData).then(() => {
                if (doneCallBack)
                    doneCallBack();
            });
            break;
        }
        else
            await sleep(100);//如果未初始化完成则等待其初始化完成
    }
}