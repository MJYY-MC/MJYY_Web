import {type InjectionKey, provide, type Ref} from "vue";
import toast from "@/components/toast/toast.vue";
import type {CreateToast, ToastData} from "@/components/toast/ts/toast.type.ts";
import {sleep} from "@/utils/sleep.ts";

export const createToastKey:InjectionKey<CreateToast>=Symbol("createToast");

export default function (toastRef:Ref<InstanceType<typeof toast>|null>){
    const func:CreateToast=async (toastData: ToastData)=>{
        while (true) {
            if (toastRef.value) {
                return toastRef.value.createToast(toastData);
            }else{
                await sleep(100);//循环等待其初始化
            }
        }
    }
    provide(createToastKey,func);

    //批注：provide不能在onMounted中使用
}