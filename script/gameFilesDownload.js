const logHeader='[gameFilesDownload.js] ';

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import dgr from 'download-github-release';
import getCodeMode from "../src/ts/env/codeMode.node.js";
import dotenv from "dotenv";

function doDownload(data){
    console.log(`${logHeader} '${data.user}/${data.repo}'开始下载，输出目录：'${data.outputDir}'`);
    dgr(data.user, data.repo, data.outputDir, data.filterRelease, data.filterAsset, data.leaveZipped)
        .then(function() {
            console.log(`${logHeader} '${data.user}/${data.repo}'下载完成`);
        })
        .catch(function(err) {
            console.error(`${logHeader} 下载'${data.user}/${data.repo}'时发生错误：`,err.message);
        });
}
function checkDir(targetDir,doClear=false){
    if (!fs.existsSync(targetDir)) {//检查目录是否存在
        fs.mkdirSync(targetDir, { recursive: true });//递归创建目标目录
        console.log(`${logHeader} '${targetDir}'目标目录不存在，已创建`);
    }
    else{
        console.log(`${logHeader} '${targetDir}'目标目录存在`);

        if(doClear){
            const files = fs.readdirSync(targetDir, { withFileTypes: true });
            if (files.length > 0){
                console.log(`${logHeader} 检测到目录下包含文件，将执行清空：`,files);
                files.forEach(file=>{
                    const filePath = path.join(targetDir, file.name);
                    fs.rmSync(filePath, { recursive: true, force: true });
                    console.log(`${logHeader} 已删除：'${filePath}'`)
                });
            }
        }
    }
}

dotenv.config();//获取环境变量

if (getCodeMode()!=='cf'){
    const td= path.resolve(__dirname, '../public/gameFiles/defender');
    checkDir(td,true);
    doDownload({
        user: 'MJYY-MC',
        repo: 'mjyy-web-game_defender',
        outputDir: td,
        filterRelease: (release) => {
            // noinspection JSUnresolvedReference
            return release.prerelease === false;
        },
        filterAsset: (asset) => {
            return asset.name.toString().startsWith('mjyy-web-game_defender_web_');
        },
        leaveZipped: false,
    });
}else{
    console.log(`${logHeader} 当前代码模式为cf，不执行目标文件下载`);
}