import { isClient } from "@/ts/env/ssr";
import { onMounted, onUnmounted, type Ref } from "vue";
import type { Collapse as bsCollapse } from "bootstrap";
import {breakpointIsDown} from "@/utils/bootstrap-breakpoints.ts";

export default function (
    //navbar: Ref<HTMLDivElement | null>,
    navbarCollapseContent: Ref<HTMLDivElement | null>,
) {
    let bootstrap: typeof import("bootstrap") | undefined;
    if (isClient) {
        (async () => {
            return await import("bootstrap");
        })().then((module) => {
            bootstrap = module;
        });
    }

    let collapser: bsCollapse | null;
    let navLinks: NodeListOf<Element> | null | undefined;
    function getCollapseInstance(): bsCollapse | null {
        if (bootstrap)
            return bootstrap.Collapse.getInstance(navbarCollapseContent.value!);
        else
            return null;
    }
    function doHideCollapser() {
        if (breakpointIsDown('lg')) {//当折叠栏开始运作时生效
            if (!collapser) {
                //如果实例不存在则再尝试获取一次
                collapser = getCollapseInstance();
                //console.log(collapser)
                if (!collapser) return;
            }
            collapser.hide();
        }
    }
    function bindNavLinks() {
        navLinks = document.querySelectorAll(".nav-link:not(.dropdown-toggle):not(.hover-dropdown-btn)");

        navLinks.forEach((link) => {
            link.addEventListener("click", doHideCollapser);
            //console.log(link);
        });

        collapser = getCollapseInstance();
    }
    function unbindNavLinks() {
        if (navLinks) {
            navLinks.forEach((link) => {
                link.removeEventListener("click", doHideCollapser);
            });
        }
    }
    onMounted(() => {
        bindNavLinks();
    });
    onUnmounted(() => {
        unbindNavLinks();
    });

    return {
        bindNavLinks,
        unbindNavLinks,
        doHideCollapser,
    };
}
