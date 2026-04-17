const logHeader='[downloadGithubRelease.js]';

import dgr from 'download-github-release';

export function doDownload(data,doneCallBack=null,errorCallBack=null){
    console.log(`${logHeader} '${data.user}/${data.repo}'开始下载，输出目录：'${data.outputDir}'`);
    dgr(data.user, data.repo, data.outputDir, data.filterRelease, data.filterAsset, data.leaveZipped)
        .then(function() {
            console.log(`${logHeader} '${data.user}/${data.repo}'下载完成`);
            if (doneCallBack!==null && doneCallBack!==undefined)
                doneCallBack();
        })
        .catch(function(err) {
            console.error(`${logHeader} 下载'${data.user}/${data.repo}'时发生错误：`,err.message);
            if (errorCallBack!==null && errorCallBack!==undefined)
                errorCallBack();
        });
}