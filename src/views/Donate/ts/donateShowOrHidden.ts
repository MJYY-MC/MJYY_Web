import {useCookies} from "@vueuse/integrations/useCookies";

/**
 * 返回true时表示显示赞助相关的页面与链接等，返回false则相反
 */
export default function ():boolean{
    return (useCookies().get('isHateMjyy')==undefined);
}

export function doHidden(){
    useCookies().set('isHateMjyy',true,{
        maxAge: 60*60*24*365*100,
    });
}
export function doShow(){
    useCookies().remove('isHateMjyy');
}