import {isClient} from "@vueuse/core";
import {apiKey, baseUrl} from "@/ts/env/backend.ts";
import {isDev} from "@/ts/env/packMode.ts";
import type {RequestFuncResponse} from "@/ts/backend/result.type.ts";

export type PostPassword={
    Password:string,
}

export default async function(
    path:string,
    body:PostPassword|undefined=undefined
):Promise<RequestFuncResponse>{
    if (apiKey==undefined) {
        if (isDev)
            console.error('[ts/backend/post.ts] 未配置apikey值');
        return {code:1};
    }
    if (baseUrl==undefined){
        if (isDev)
            console.error('[ts/backend/post.ts] 未配置后端地址');
        return {code:2};
    }
    if (!isClient) {
        if (isDev)
            console.warn('[ts/backend/post.ts] 当前非客户端环境，不执行请求');
        return {code:3};
    }
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body || {}),
        });
        return {
            code: 0,
            result:{
                ok: res.ok,
                json: await res.json(),
                statusCode: res.status,
            }
        }
    }catch (err){
        if (isDev)
            console.error('[ts/backend/post.ts] 出现错误：',err);
        return {code:4};
    }
}