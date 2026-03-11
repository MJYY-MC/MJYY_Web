<script setup lang="ts">
import {nextTick, onMounted, type Ref, ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import type{Toast} from "bootstrap";
import {sleep} from "@/utils/sleep.ts";
import type {CreateToast, ToastData} from "@/components/toast/ts/toast.type.ts";
import {autoUseI18n} from "@/utils/i18nUtils.ts";

const {gt:t}=autoUseI18n();

const toastsRef:Ref<HTMLDivElement[]>=ref([]);
const toasts:Ref<ToastData[]>=ref([]);

const setToastRef = (el:any, index:number) => {
  if (el) {
    toastsRef.value[index]=el;
  }
}

let bootstrap: typeof import("bootstrap") | undefined;
const bsToast:Toast[]=[];
onMounted(async ()=>{
  if (isClient) {
    await (async () => {
      return await import("bootstrap");
    })().then((module) => {
      bootstrap = module;
    });
  }
});
//自动移除是否已启动
let autoRemove_isStarted = false;
//循环检测并自动移除已关闭的吐司框
async function autoRemove(){
  autoRemove_isStarted=true;
  while (true){
    if (toastsRef.value.length==0)
      break;
    await sleep(1000);
    {
      let isAllHidden:boolean = true;
      //检测其吐司框是否全部关闭，如果有开启状态的吐司框则不执行删除操作，避免异常
      for (let i = 0; i < toastsRef.value.length; i++) {
        if (!toastsRef.value[i]!.classList.contains('hide')) {
          isAllHidden=false;
          break;
        }
      }
      if (isAllHidden){
        for (let i = 0; i < toastsRef.value.length; i++) {
          removeToast(i);
        }
      }
    }
  }
  autoRemove_isStarted=false;
}

/**
 * 创建吐司框
 * @param toastData 吐司框数据
 */
const createToast:CreateToast=async (toastData:ToastData)=>{
  if (isClient) {
    while (true) {
      if (bootstrap) {
        toasts.value.push(toastData);

        await nextTick();
        for (let i = bsToast.length; i < toasts.value.length; i++) {//检查并添加实例
          bsToast.push(bootstrap.Toast.getOrCreateInstance(toastsRef.value[i] as Element));
          bsToast[i]!.show();
        }

        if (!autoRemove_isStarted)
          autoRemove().then();

        break;
      } else {
        await sleep(100);//如果未初始化完成，则等待
      }
    }
  }
}
/**
 * 移除吐司框
 * @param index 吐司框索引
 */
function removeToast(index:number){
  if (isClient) {
    if (bootstrap) {
      toasts.value.splice(index, 1);
      toastsRef.value.splice(index, 1);
      bsToast.splice(index, 1);
    }
  }
}

defineExpose({
  createToast,/*removeToast,*/
});
</script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div v-for="(toast,index) in toasts" :key="index" :ref="el=>setToastRef(el, index)"
         class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="@/assets/svg/logo/mjyy-logo.svg"
             width="24" height="24"
             class="rounded me-2"
             alt="logo"
        >
        <strong v-if="toast.title.isHtml" v-html="toast.title.content"
                class="me-auto"
        ></strong>
        <strong v-else-if="toast.title.i18n?.isI18nKey && toast.title.i18n?.i18nArgs"
                class="me-auto"
        >{{t(toast.title.content,toast.title.i18n?.i18nArgs)}}</strong>
        <strong v-else-if="toast.title.i18n?.isI18nKey"
                class="me-auto"
        >{{t(toast.title.content)}}</strong>
        <strong v-else
                class="me-auto"
        >{{toast.title.content}}</strong>
        <small v-if="toast.time?.isHtml" v-html="toast.time.content"></small>
        <small v-else-if="toast.time?.i18n?.isI18nKey && toast.time?.i18n?.i18nArgs">{{t(toast.time?.content,toast.time?.i18n?.i18nArgs)}}</small>
        <small v-else-if="toast.time?.i18n?.isI18nKey">{{t(toast.time?.content)}}</small>
        <small v-else>{{toast.time?.content}}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div v-if="toast.body.isHtml" v-html="toast.body.content"
           class="toast-body"
      ></div>
      <div v-else-if="toast.body.i18n?.isI18nKey && toast.body.i18n?.i18nArgs"
           class="toast-body"
      >{{t(toast.body.content,toast.body.i18n?.i18nArgs)}}</div>
      <div v-else-if="toast.body.i18n?.isI18nKey"
           class="toast-body"
      >{{t(toast.body.content)}}</div>
      <div v-else
           class="toast-body"
      >{{toast.body.content}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>