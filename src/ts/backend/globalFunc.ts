import {apiKey, baseUrl} from "@/ts/env/backend.ts";
import {isDev} from "@/ts/env/packMode.ts";
import {isClient} from "@vueuse/core";
import type {RequestFuncResponse} from "@/ts/backend/result.type.ts";

/**
 * 检查变量或环境是否合法
 * @param headName 调用函数的文件名，用于输出日志
 * @return 如果检查通过，返回null；否则返回非0代码
 */
export function checkValue(headName:string):RequestFuncResponse|null{
    if (apiKey==undefined) {
        if (isDev)
            console.error(`[ts/backend/${headName}] 未配置apikey值`);
        return {code:1};
    }
    if (baseUrl==undefined){
        if (isDev)
            console.error(`[ts/backend/${headName}] 未配置后端地址`);
        return {code:2};
    }
    if (!isClient) {
        if (isDev)
            console.warn(`[ts/backend/${headName}] 当前非客户端环境，不执行请求`);
        return {code:3};
    }
    return null;
}