import type {CodeMode} from "./codeMode.type.ts";

/**
 * 代码模式
 * 根据不同的部署平台变动的模式，以适应不同平台
 */
const codeMode:CodeMode=process.env.VITE_CODE_MODE as CodeMode;

export default codeMode;