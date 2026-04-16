/**
 * 代码模式
 * 根据不同的部署平台变动的模式，以适应不同平台
 */
const getCodeMode=(()=>{return process.env.VITE_CODE_MODE});

export default getCodeMode;