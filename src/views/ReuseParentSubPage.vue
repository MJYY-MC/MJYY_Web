<script setup lang="ts">
import AuthSubPage from "@/components/pages/AuthSubPage.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import type {SavePasswordProp} from "@/components/passwordInput.vue";

const route = useRoute();
const meta = computed(() => ({
  authSubPage:{
    //目标请求地址
    targetUrlPath: route.meta.authSubPage_targetUrlPath as string,
    //保存密码功能参数
    savePassword: route.meta.authSubPage_savePassword as SavePasswordProp,

    //是否执行serverMap页面所需的问题修复代码
    doServerMapFix: (
        route.meta.authSubPage_doServerMapFix != undefined
            ? route.meta.authSubPage_doServerMapFix
            : false
    )as boolean,
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
  <AuthSubPage :targetUrlPath="meta.authSubPage.targetUrlPath"
               :title="gt(`${lp}.subTitle`)"
               :other="{
                 doServerMapFix: meta.authSubPage.doServerMapFix,
               }"
               :savePassword="meta.authSubPage.savePassword"
  />
</template>

<style scoped lang="scss">
</style>