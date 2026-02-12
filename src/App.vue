<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";
import {apiKey, baseUrl as beBaseUrl} from "@/ts/env/backend.ts";
import {isClient} from "@/ts/env/ssr.ts";

loadGlobalLocale();

(async ()=>{
  console.log(beBaseUrl);
  if (beBaseUrl && isClient) {
    const res = await fetch(`${beBaseUrl}/api/check`,{
      headers: {'X-API-Key':apiKey!}
    });
    if (res.ok) {
      console.log(res.json());
    }
  }
})();
</script>

<template>
  <navbar/>
  <div id="view">
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
</style>
