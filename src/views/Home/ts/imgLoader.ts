//引用与修改于 https://github.com/Hgnim/perweb/blob/3585b10ecf343e245f6eb977aa9a575bcd28afa6/src/views/Home/ts/imgLoader.ts

export function imgLoaded(e: Event){
    (e.target as HTMLElement).parentElement?.classList.add('loaded');
}

export function imgError(e: Event){
    (e.target as HTMLElement).parentElement?.classList.add('error');
}