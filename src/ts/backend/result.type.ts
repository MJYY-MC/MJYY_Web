export type RequestFuncResponse={
    //返回代码，非0则代表请求成功
    code:number,
    //结果
    result?:{
        //是否成功
        ok:boolean,
        //响应代码
        statusCode:number,
        //返回json
        json:any,
    }|undefined
}