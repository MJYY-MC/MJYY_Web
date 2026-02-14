<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";
//import {apiKey, baseUrl as beBaseUrl} from "@/ts/env/backend.ts";
//import {isClient} from "@/ts/env/ssr.ts";

loadGlobalLocale();

/*(async ()=>{
  console.log(beBaseUrl);
  if (beBaseUrl && isClient) {
    const res = await fetch(`${beBaseUrl}/api/check`,{
      headers: {'X-API-Key':apiKey!}
    });
    if (res.ok) {
      console.log(res.json());
    }
  }
})();*/
const route = useRoute();
const meta = computed(() => ({
  app:{
    view:{
      //为view添加顶部内边距，防止导航栏遮挡。默认false
      usePaddingTop: (
          route.meta.app_view_usePaddingTop != undefined
              ? route.meta.app_view_usePaddingTop
              : false
      ) as boolean,
      //将view大小固定为全屏。默认false
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

function routeName_onChange(){
  if (view.value && navbarRef.value) {
    if (meta.value.app.view.usePaddingTop) {
      view.value.style.paddingTop = `${navbarRef.value.offsetHeight_get() || 0}px`;
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
  />
  <div id="view" ref="view">
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
</style>
