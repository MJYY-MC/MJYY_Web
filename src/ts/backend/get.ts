import type {RequestFuncResponse} from "@/ts/backend/result.type.ts";
import {apiKey, baseUrl} from "@/ts/env/backend.ts";
import {isDev} from "@/ts/env/packMode.ts";
import {checkValue} from "@/ts/backend/globalFunc.ts";

export default async function(path:string):Promise<RequestFuncResponse>{
    {
        const cv = checkValue('get.ts');
        if (cv!=null)
            return cv;
    }
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: 'GET',
            headers: {
                'X-API-Key': apiKey!,
                'Content-Type': 'application/json',
            }
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
            console.error('[ts/backend/get.ts] 出现错误：',err);
        return {code:4};
    }
}