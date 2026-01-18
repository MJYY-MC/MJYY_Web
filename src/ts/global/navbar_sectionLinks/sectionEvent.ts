import mitt, {type Emitter} from "mitt";

export type SectionEvent={
    //当前滚动停留的部分变动
    sectionStayChange:{secId:string};
}
//“部分”相关事件
export const sectionEvent: Emitter<SectionEvent> = mitt<SectionEvent>();