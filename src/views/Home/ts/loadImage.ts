import {onMounted, type Ref} from "vue";

export default function (
    backimg_img:Ref<HTMLImageElement|null>,
){
    const imgs = import.meta.glob('@/assets/img/Home/*.png', {
        eager: true,
        as: 'url'
    })
    onMounted(()=>{
        const hour=(new Date()).getHours();
        let code:string='0508';
        if(hour>=2 && hour<5){
            code = '0205';
        }else if(hour>=5 && hour<8){
            code = '0508';
        }else if (hour>=8 && hour<11){
            code = '0811';
        }else if (hour>=11 &&hour<14){
            code = '1114';
        }else if (hour>=14&&hour<17){
            code = '1417';
        }else if (hour>=17&&hour<20){
            code = '1720';
        }else if (hour>=20&&hour<23){
            code = '2023';
        }else if (hour>=23&&hour<2){
            code = '2302';
        }
        backimg_img.value!.src=imgs[`/src/assets/img/Home/main-bkg-time${code}.png`] as string;
    });
}