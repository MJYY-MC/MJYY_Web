import {onMounted, ref,type Ref} from "vue";
import {useCookies} from "@vueuse/integrations/useCookies";
import createToast from "@/ts/global/function/createToast.ts";

export type ImageQuality='source'|'high'|'normal'|'mid'|'low'|'potato';
export type ImageQualityFileName='source'|'high'|'normal'|'medium'|'low'|'potato';
export const imageQuality:Ref<ImageQuality>=ref('normal');
export function doImgQualSel(imgQua:ImageQuality,setCookie:boolean=true){
    imageQuality.value=imgQua;
    if (setCookie)
        useCookies().set('imageQuality', imgQua,{
            maxAge: 60*60*24*365,
        });
}

export function init(lp:string){
    onMounted(()=>{
        const imgQua:ImageQuality|undefined=useCookies().get('imageQuality');
        const connType:ConnectionType|undefined=navigator.connection?.type;
        const connEffectiveType:EffectiveConnectionType|undefined=navigator.connection?.effectiveType;

        let isSet=false;
        if (connType!=undefined || connEffectiveType!=undefined){//网速过慢与蜂窝网络使用检测
            let imgq:ImageQuality|null = null;
            function slowToast(){
                createToast({
                    title:{
                        content: 'global.toast.title.info'
                    },
                    body:{
                        content: `${lp}.toast.imageQuality.isSlow`,
                    }
                }).then();
            }
            switch (connEffectiveType){
                case '4g':
                case '3g':
                    if (connType=='cellular') {//检测是否为移动数据，如果是则切换为省流模式
                        imgq = 'low';
                        createToast({
                            title:{
                                content: 'global.toast.title.info'
                            },
                            body:{
                                content: `${lp}.toast.imageQuality.isCellular`,
                                /*i18n:{
                                    i18nArgs:{
                                        quality: ''
                                    }
                                }*/
                            }
                        }).then();
                    }
                    else{
                        if (connEffectiveType=='3g') {
                            imgq = 'mid';
                            slowToast();
                        }
                    }
                    break;
                case '2g'://网速过慢则直接跳过移动数据检测
                    imgq = 'low';
                    slowToast();
                    break;
                case 'slow-2g':
                    imgq = 'potato';
                    slowToast();
                    break;
            }
            if (imgq!=null){
                isSet=true;
                doImgQualSel(imgq, false);
            }
        }
        if (!isSet) {
            if (imgQua)
                doImgQualSel(imgQua, false);
            else
                doImgQualSel('normal', true);
        }
    });
}

export function imgQual_to_imgQualFileName(imgQua:ImageQuality):ImageQualityFileName{
    if(imgQua=='mid')
        return 'medium';
    else
        return imgQua;
}