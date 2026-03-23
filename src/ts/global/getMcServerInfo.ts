import staticDataAddress from "@/ts/env/staticDataAddress.ts";

export type McServerVersion={
    serverVersion: string,
    javaVersionMin: string,
    javaVersionMax: string,
    bedrockVersionMin: string,
    bedrockVersionMax: string,
};
export type McServerAddress={
    count: number,
    addresses:{
        je:{
            addrs: string,
            port: number,
        },
        be:{
            addrs: string,
            port: number,
        },
    }[]
};
export async function getMcServerVersion():Promise<McServerVersion|null> {
    const res=await fetch(`${staticDataAddress}/mcServerInfo/version.json`);
    if (res.ok)
        return await res.json();
    else
        return null;
}
export async function getMcServerAddress():Promise<McServerAddress|null> {
    const res=await fetch(`${staticDataAddress}/mcServerInfo/address.json`);
    if (res.ok)
        return await res.json();
    else
        return null;
}