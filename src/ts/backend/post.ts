import {apiKey, baseUrl} from "@/ts/env/backend.ts";
import {isDev} from "@/ts/env/packMode.ts";
import type {RequestFuncResponse} from "@/ts/backend/result.type.ts";
import {checkValue} from "@/ts/backend/globalFunc.ts";

export type PostPassword={
    Password:string,
}

export default async function(
    path:string,
    body:PostPassword|undefined=undefined
):Promise<RequestFuncResponse>{
    {
        const cv = checkValue('post.ts');
        if (cv!=null)
            return cv;
    }
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey!,
                'Content-Type': 'application/json',
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