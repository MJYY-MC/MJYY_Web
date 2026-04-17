const logHeader='[gameFilesDownload.js] ';

import getCodeMode from "../src/ts/env/codeMode.node.js";
import dotenv from "dotenv";

import defender_download from "./gameFilesDownloadAlone/defender_download.js";

dotenv.config();//获取环境变量

if (getCodeMode()!=='cf'){
    defender_download();
}else{
    console.log(`${logHeader} 当前代码模式为cf，不执行目标文件下载`);
}