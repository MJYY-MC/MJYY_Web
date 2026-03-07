const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
} as const;
export type Breakpoint = keyof typeof breakpoints;

/**
 * 当前窗口宽度是否小于指定断点
 * 类似scss中的media-breakpoint-down()
 * @param breakpoint 断点
 */
export function breakpointIsDown(breakpoint: Exclude<Breakpoint, 'xs'/*排除xs，因为不可为xs*/>): boolean {
    return window.innerWidth < breakpoints[breakpoint];
}

/**
 * 当前窗口宽度是否大于等于指定断点
 * 类似scss中的media-breakpoint-up()
 * @param breakpoint 断点
 */
export function breakpointIsUp(breakpoint: Exclude<Breakpoint, 'xxl'/*排除xxl*/>): boolean {
    return window.innerWidth >= breakpoints[breakpoint];
}