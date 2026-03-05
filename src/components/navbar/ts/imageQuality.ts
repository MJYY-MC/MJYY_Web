import {onMounted, ref,type Ref} from "vue";
import {useCookies} from "@vueuse/integrations/useCookies";

export type ImageQuality='source'|'high'|'normal'|'mid'|'low'|'potato';
export type ImageQualityFileName='source'|'high'|'normal'|'medium'|'low'|'potato';
export const imageQuality:Ref<ImageQuality>=ref('normal');
export function doImgQualSel(imgQua:ImageQuality,setCookie:boolean=true){
    imageQuality.value=imgQua;
    if (setCookie)
        useCookies().set('imageQuality', imgQua);
}

export function init(){
    onMounted(()=>{
        const imgQua:ImageQuality|undefined=useCookies().get('imageQuality');
        if (imgQua)
            doImgQualSel(imgQua,false);
        else
            doImgQualSel('normal',true);
    });
}

export function imgQual_to_imgQualFileName(imgQua:ImageQuality):ImageQualityFileName{
    if(imgQua=='mid')
        return 'medium';
    else
        return imgQua;
}