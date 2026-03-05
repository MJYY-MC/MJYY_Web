//引用与修改于 https://github.com/Hgnim/perweb/blob/3585b10ecf343e245f6eb977aa9a575bcd28afa6/src/views/Home/ts/imgLoader.ts

export function imgLoaded(e: Event){
    const ele=(e.target as HTMLElement) as HTMLImageElement;
    ele.parentElement?.classList.toggle('error',false);
    ele.parentElement?.classList.toggle('loaded',true);
}

export function imgError(e: Event){
    const ele=(e.target as HTMLElement) as HTMLImageElement;
    ele.parentElement?.classList.toggle('loaded',false);
    if(ele.src!=='')
        ele.parentElement?.classList.toggle('error',true);
}
