import {Collapse as bsCollapse} from 'bootstrap'
import { onMounted, onUnmounted, type Ref } from "vue";

export default function (
    //navbar: Ref<HTMLDivElement | null>,
    navbarCollapseContent: Ref<HTMLDivElement | null>
) {
    let collapser: bsCollapse | null;
    let navLinks: NodeListOf<Element>|null|undefined;
    function getCollapseInstance(): bsCollapse | null {
        return bsCollapse.getInstance(navbarCollapseContent.value!);
    }
    function navLinks_click() {
        if (!collapser) {
            //如果实例不存在则再尝试获取一次
            collapser = getCollapseInstance();
            //console.log(collapser)
            if (!collapser)
                return;
        }
        collapser.hide();
    }
    function bindNavLinks() {
        navLinks = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

        navLinks.forEach(link => {
            link.addEventListener('click', navLinks_click);
            //console.log(link);
        });

        collapser = getCollapseInstance();
    }
    function unbindNavLinks() {
        if (navLinks) {
            navLinks.forEach((link) => {
                link.removeEventListener("click", navLinks_click);
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
        bindNavLinks,unbindNavLinks,
    }
}