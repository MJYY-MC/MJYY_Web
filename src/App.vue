<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {ref, type Ref} from "vue";
import type {RouteRecordNameGeneric} from "vue-router";
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
const view:Ref<HTMLDivElement|null> = ref(null);

const navbarRef:Ref<InstanceType<typeof navbar>|null>=ref(null);
function routeOnChange(routeName: RouteRecordNameGeneric){
  if (view.value && navbarRef.value) {
    if (routeName!="home") {//排除home页面
      //更改view的顶部内边距，避免导航栏遮挡
      view.value.style.paddingTop = `${navbarRef.value.offsetHeight_get() || 0}px`;

      view.value.style.height='100vh';
      view.value.style.width='100vw'
    }
    else{
      view.value.style.paddingTop = '0';
    }
  }
}
</script>

<template>
  <navbar ref="navbarRef"
          @route_onChange="routeOnChange"
  />
  <div id="view" ref="view">
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
</style>
