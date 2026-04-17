const logHeader='[defender_download.js]';

import path from 'path';
import {fileURLToPath} from "url";
import checkDir from "../js/checkDir.js";
import {doDownload} from "../js/downloadGithubRelease.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function defender_download() {
    const td = path.resolve(__dirname, '../../public/gameFiles/defender');
    checkDir(td, true);
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
    },
        ()=>{
        console.log(`${logHeader} 下载完成`)
        },
        ()=>{
        console.log(`${logHeader} 下载失败，重新执行下载`);
        defender_download();
        });
}

export default defender_download;