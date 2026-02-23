type UrlParams={
    params:{
        name:string,
        value:string|undefined|null,
    }[]
}
export default function (
    baseUrl:string,
    urlParams:UrlParams
    ):string{
    let output=baseUrl;
    let first=true;
    urlParams.params.forEach(para=>{
        if (para.value!==undefined && para.value!==null) {
            if (!first)
                output += `&${para.name}=${para.value}`;
            else {
                first = false;
                output += `?${para.name}=${para.value}`;
            }
        }
    });
    return output;
}