<script setup lang="ts">
import navbar from "@/components/navbar/navbar.vue";
import {loadGlobalLocale} from "@/utils/i18nUtils.ts";

loadGlobalLocale();

//region 开发阶段的代码，开发完毕后将移除
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {isDev} from "@/ts/global/packMode.ts";
const {lt:t}=autoUseI18n();
//endregion
</script>

<template>
  <navbar/>
  <div id="view">
    <router-view/>
  </div>

  <!--region 开发阶段的代码，开发完毕后将移除-->
  <div id="inDevelopmentWaring" class="alert alert-warning" role="alert"
       :style="isDev?{display: 'none'}:{}"
       v-html="t('inDevWarn',{
         link: '<a href=\'https://old.mjyy.top\'>https://old.mjyy.top</a>'
       })"
  ></div>
  <!--endregion-->
</template>

<style scoped lang="scss">
//region 开发阶段的代码，开发完毕后将移除
#inDevelopmentWaring{
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
//endregion
</style>

<!--region 开发阶段的代码，开发完毕后将移除-->
<i18n>
{
  "zh-CN": {
    "inDevWarn": "新官网正在开发中，请访问旧官网：{link}"
  },
  "en-US": {
    "inDevWarn": "The new official website is under development. Please visit the old website: {link}"
  }
}
</i18n>
<!--endregion-->
