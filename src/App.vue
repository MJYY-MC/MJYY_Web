<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import toast from "@/components/toast/toast.vue";
import {autoSetHtmlLang, loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";
import { useHead } from '@unhead/vue';
import {isServer} from "@/ts/env/ssr.ts";
import toastInit from "@/ts/App/toastInit.ts";

if (isServer) {
  useHead({
    htmlAttrs: {
      lang: 'zh',//html的lang静态值设置为zh。lang属性值将根据网站当前使用的语言动态更改
    }
  });
}

loadGlobalLocale();

const route = useRoute();
const meta = computed(() => ({
  route:{
    reloadKey: (
        //此值变化后可使router-view重新加载
        route.meta.route_reloadKey != undefined
            ? route.meta.route_reloadKey
            : "def"
    ) as string,
  },
  app:{
    view:{
      //是否为view添加顶部内边距，防止导航栏遮挡。默认false
      usePaddingTop: (
          route.meta.app_view_usePaddingTop != undefined
              ? route.meta.app_view_usePaddingTop
              : false
      ) as boolean,
      //是否将view大小固定为全屏。默认false
      useFullScreen: (
          route.meta.app_view_useFullScreen != undefined
              ? route.meta.app_view_useFullScreen
              : false
      ) as boolean,
      //是否将view的overflow-x设置为hidden
      useOverflowXHidden:(
          route.meta.app_view_useOverflowXHidden != undefined
              ? route.meta.app_view_useOverflowXHidden
              : false
      ) as boolean,
    },
  },
}));

const view:Ref<HTMLDivElement|null> = ref(null);
const navbarRef:Ref<InstanceType<typeof navbar>|null>=ref(null);

function normal_offsetHeight_onInit(normal_offsetHeight:number){
  if (meta.value.app.view.usePaddingTop){
    view.value!.style.paddingTop = normal_offsetHeight + 'px';
  }
}
function routeName_onChange(){
  if (view.value && navbarRef.value) {
    if (meta.value.app.view.usePaddingTop) {
      if (navbarRef.value.normal_offsetHeight_get()!=undefined) {
        const val=
            navbarRef.value!.normal_offsetHeight_get()
            || navbarRef.value!.offsetHeight_get()
            || undefined;
        if (val!=undefined)
          view.value!.style.paddingTop = `${val}px`;
      }
    }
    else{
      view.value.style.paddingTop = '0';
    }

    if (meta.value.app.view.useFullScreen){
      view.value.style.height='100vh';
      view.value.style.width='100%';
    }
    else{
      view.value.style.height='';
      view.value.style.width='';
    }

    if (meta.value.app.view.useOverflowXHidden){
      view.value.style.overflowX = 'hidden';
    }
    else{
      view.value.style.overflowX = '';
    }
  }
}
watch(
    ()=>route.name,
    ()=>{
      routeName_onChange();
    }
)

onMounted(()=>{
  routeName_onChange();

  autoSetHtmlLang();//加载完毕后自动设置一下html标签的lang属性
});

//region toast
const toastRef:Ref<InstanceType<typeof toast>|null>=ref(null);
toastInit(toastRef);
//endregion
</script>

<template>
  <navbar ref="navbarRef"
          @normal_offsetHeight_init="normal_offsetHeight_onInit"
  />
  <div id="view" ref="view">
    <router-view :key="meta.route.reloadKey"/>
  </div>
  <toast ref="toastRef"/>
</template>

<style scoped lang="scss">
</style>
