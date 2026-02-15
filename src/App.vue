<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";

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
    },
  },
}));

const view:Ref<HTMLDivElement|null> = ref(null);
const navbarRef:Ref<InstanceType<typeof navbar>|null>=ref(null);

let normal_offsetHeight_onInit=(_normal_offsetHeight:number)=>{};
function routeName_onChange(){
  if (view.value && navbarRef.value) {
    if (meta.value.app.view.usePaddingTop) {
      function setPaddingTop(){
        view.value!.style.paddingTop = `${
            navbarRef.value!.normal_offsetHeight_get()
            || navbarRef.value!.offsetHeight_get()
            || 0
        }px`;
      }
      if (navbarRef.value.normal_offsetHeight_get()==undefined) {
        //如果访问时navbarRef.value.normal_offsetHeight还未被赋值，则使用回调函数等待其赋值后再进行设置
        normal_offsetHeight_onInit = (normal_offsetHeight: number) => {
          view.value!.style.paddingTop = normal_offsetHeight + 'px';
          normal_offsetHeight_onInit = (_normal_offsetHeight:number)=>{};
        }
        if (navbarRef.value.normal_offsetHeight_get()!=undefined)//加一道保险，得确保顶部内间距被设置
          setPaddingTop();
      }else {
        setPaddingTop();
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
});
</script>

<template>
  <navbar ref="navbarRef"
          @normal_offsetHeight_onInit="normal_offsetHeight_onInit"
  />
  <div id="view" ref="view">
    <router-view :key="meta.route.reloadKey"/>
  </div>
</template>

<style scoped lang="scss">
</style>
