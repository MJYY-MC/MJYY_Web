import { onUnmounted } from "vue";
import { onMounted } from "vue";

export type Emits = {
    (e: "onMounted"): void;
    (e: "onUnmounted"): void;
};

export default function (emit:Emits) {
    onMounted(() => {
        emit("onMounted");
    });
    onUnmounted(() => {
        emit("onUnmounted");
    });
}