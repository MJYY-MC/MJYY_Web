import dotenv from "dotenv";
dotenv.config();

import {getMode,getIsDev,getIsProd} from "../src/ts/env/packMode.node.js";
import getRenderMode from "../src/ts/env/renderMode.node.js";
import getCodeMode from "../src/ts/env/codeMode.node.js";

console.log('谧静幽原官方网站：');
console.log(`当前模式：${getMode()}; isDev(${getIsDev()}); isProd(${getIsProd()})`);
console.log(`当前渲染模式：${getRenderMode()}`);
console.log(`当前代码模式：${getCodeMode()}`);
console.log('------------------------------');