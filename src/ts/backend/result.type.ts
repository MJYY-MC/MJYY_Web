export type RequestFuncResponse={
    code:number,
    result?:{
        ok:boolean,
        statusCode:number,
        json:any,
    }|undefined
}