import type {Ref} from "vue";
import {marked} from "marked";
import {getCurrentLocale, getFallbackLocale} from "@/utils/i18nUtils.ts";
import {isDev} from "@/ts/env/packMode.ts";

const docMdFiles= import.meta.glob('@/views/Document/md/doc/**/*.md', {
    eager: true,
    query: '?url',
    import: 'default',
});

export default function (
    docMd:Ref<HTMLDivElement|null>
){
    async function doLoad(rPath:string){
        if (docMd.value){
            docMd.value.innerHTML=marked.parse(
                (await (async (): Promise<string> => {
                    try{
                        const tryLocale: string[] = [
                            ...[getCurrentLocale()],//当前语言
                            ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
                        ];
                        for (let i = 0; i < tryLocale.length; i++) {
                            const res= await fetch(
                                docMdFiles[
                                    (`/src/views/Document/md/doc/${rPath}`).replace('{lang}',tryLocale[i]!)
                                    ] as string
                            );
                            const contentType: string = res.headers.get('content-type') || '';
                            if (res.ok &&
                                (
                                    //添加内容类型判断，避免未匹配到目标时返回index.html导致fetch误以为请求成功
                                    contentType.includes('text/plain') ||
                                    contentType.includes('text/markdown')
                                ))
                                return await res.text();
                        }
                    }catch(e){
                        if (isDev)
                            console.error('[docLoader.ts] 发生错误：', e);
                        return '**X**';
                    }
                    return '**X**';
                })()).toString()
            ) as string;
        }
    }

    return {doLoad};
}