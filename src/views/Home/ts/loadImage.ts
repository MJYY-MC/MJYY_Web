import {type Ref, ref} from "vue";
import {imageQuality} from "@/components/navbar/ts/imageQuality.ts";
import {isClient} from "@/ts/env/ssr.ts";

export default function (){
    const imgs = import.meta.glob('@/assets/img/Home/**/*.{png,webp}', {
        eager: true,
        as: 'url'
    });
    //region photos
    /*const img_photos=import.meta.glob('@/assets/img/Home/photos/*.{png,webp}', {
        eager: true,
        as: 'url'
    });*/
    const home_root_path='/src/assets/img/Home';
    const img_photos_path=`${home_root_path}/photos`;
    const photoObjects = ref([
        {
            photo: {
                source: imgs[`${img_photos_path}/photo-1.png`] as string,
                high: imgs[`${img_photos_path}/photo-1-high.webp`] as string,
                normal: imgs[`${img_photos_path}/photo-1-normal.webp`] as string,
                mid: imgs[`${img_photos_path}/photo-1-medium.webp`] as string,
                low: imgs[`${img_photos_path}/photo-1-low.webp`] as string,
                potato: imgs[`${img_photos_path}/photo-1-potato.webp`] as string,
            },
        },
        {
            photo: {
                source: imgs[`${img_photos_path}/photo-2.png`] as string,
                high: imgs[`${img_photos_path}/photo-2-high.webp`] as string,
                normal: imgs[`${img_photos_path}/photo-2-normal.webp`] as string,
                mid: imgs[`${img_photos_path}/photo-2-medium.webp`] as string,
                low: imgs[`${img_photos_path}/photo-2-low.webp`] as string,
                potato: imgs[`${img_photos_path}/photo-2-potato.webp`] as string,
            },
        },
        {
            photo: {
                source: imgs[`${img_photos_path}/photo-3.png`] as string,
                high: imgs[`${img_photos_path}/photo-3-high.webp`] as string,
                normal: imgs[`${img_photos_path}/photo-3-normal.webp`] as string,
                mid: imgs[`${img_photos_path}/photo-3-medium.webp`] as string,
                low: imgs[`${img_photos_path}/photo-3-low.webp`] as string,
                potato: imgs[`${img_photos_path}/photo-3-potato.webp`] as string,
            },
        },
        {
            photo: {
                source: imgs[`${img_photos_path}/photo-4.png`] as string,
                high: imgs[`${img_photos_path}/photo-4-high.webp`] as string,
                normal: imgs[`${img_photos_path}/photo-4-normal.webp`] as string,
                mid: imgs[`${img_photos_path}/photo-4-medium.webp`] as string,
                low: imgs[`${img_photos_path}/photo-4-low.webp`] as string,
                potato: imgs[`${img_photos_path}/photo-4-potato.webp`] as string,
            },
        },
        {
            photo: {
                source: imgs[`${img_photos_path}/photo-5.png`] as string,
                high: imgs[`${img_photos_path}/photo-5-high.webp`] as string,
                normal: imgs[`${img_photos_path}/photo-5-normal.webp`] as string,
                mid: imgs[`${img_photos_path}/photo-5-medium.webp`] as string,
                low: imgs[`${img_photos_path}/photo-5-low.webp`] as string,
                potato: imgs[`${img_photos_path}/photo-5-potato.webp`] as string,
            },
        },
        {
            photo: {
                source: imgs[`${img_photos_path}/photo-6.png`] as string,
                high: imgs[`${img_photos_path}/photo-6-high.webp`] as string,
                normal: imgs[`${img_photos_path}/photo-6-normal.webp`] as string,
                mid: imgs[`${img_photos_path}/photo-6-medium.webp`] as string,
                low: imgs[`${img_photos_path}/photo-6-low.webp`] as string,
                potato: imgs[`${img_photos_path}/photo-6-potato.webp`] as string,
            },
        },
    ]);
    //endregion
    const backImgSrc_get:Ref<()=>string>=ref(()=>{
        if (isClient) {//只在客户端执行，避免时区问题
            const hour = (new Date()).getHours();
            let code: string = '0508';
            if (hour >= 2 && hour < 5) {
                code = '0205';
            } else if (hour >= 5 && hour < 8) {
                code = '0508';
            } else if (hour >= 8 && hour < 11) {
                code = '0811';
            } else if (hour >= 11 && hour < 14) {
                code = '1114';
            } else if (hour >= 14 && hour < 17) {
                code = '1417';
            } else if (hour >= 17 && hour < 20) {
                code = '1720';
            } else if (hour >= 20 && hour < 23) {
                code = '2023';
            } else if (hour >= 23 && hour < 2) {
                code = '2302';
            }
            return imgs[
                imageQuality.value == 'source'
                    ? `${home_root_path}/mainbkg/main-bkg-time${code}.png`
                    : `${home_root_path}/mainbkg/main-bkg-time${code}-${imageQuality.value}.webp`
                ] as string;
        }else return '';
    });
    /**
     * 获取指定图片的路径
     * @param relaPath 目标图片的相对路径，并且不携带后缀名
     */
    const imgSrc_get:Ref<(relaPath:string)=>string>=ref((relaPath:string)=>{
        return imgs[
            imageQuality.value=='source'
                ? `${home_root_path}/${relaPath}.png`
                : `${home_root_path}/${relaPath}-${imageQuality.value}.webp`
            ] as string;
    });

    return {photoObjects,backImgSrc_get,imgSrc_get};
}