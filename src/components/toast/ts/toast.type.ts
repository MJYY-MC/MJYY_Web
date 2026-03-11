export type ToastData={
    title:{
        //内容
        content: string,
        //内容是否为html
        isHtml?: boolean,
        //i18n相关
        i18n?:{
            //内容是否为i18n的key
            isI18nKey?: boolean,
            //i18n的翻译替换参数
            i18nArgs?:any|undefined,
        }
    },
    time?:{
        content: string,
        isHtml?: boolean,
        i18n?: {
            isI18nKey?: boolean,
            i18nArgs?:any|undefined,
        }
    },
    body:{
        content: string,
        isHtml?: boolean,
        i18n?: {
            isI18nKey?: boolean,
            i18nArgs?:any|undefined,
        }
    }
};
export type CreateToast=(toastData:ToastData) => Promise<void>;