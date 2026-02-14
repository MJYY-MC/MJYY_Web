<script setup lang="ts">
import AuthSubPage from "@/components/pages/AuthSubPage.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const route = useRoute();
const meta = computed(() => ({
  authSubPage:{
    //目标请求地址
    targetUrlPath: route.meta.authSubPage_targetUrlPath as string,
  },
  //语言文件前缀
  localePrefix: route.meta.localePrefix as string,
}));

const {gt}=autoUseI18n();
const lp:string=meta.value.localePrefix;
autoLoadLocale(lp,()=>{
  useTitle(gt(`${lp}.title`));
});
</script>

<template>
  <AuthSubPage :targetUrlPath="meta.authSubPage.targetUrlPath" :title="gt(`${lp}.subTitle`)"/>
</template>

<style scoped lang="scss">
</style>