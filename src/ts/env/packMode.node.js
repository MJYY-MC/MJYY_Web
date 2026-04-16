export const getMode = ()=>{process.env.NODE_ENV};


export function getIsProd() {
    const mode = getMode();
    return mode !== undefined
        ? mode == 'production'
        : undefined;
}

export function getIsDev() {
    const mode = getMode();
    mode !== undefined
        ? mode == 'development'
        : undefined;
}