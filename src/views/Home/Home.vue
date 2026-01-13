<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});


import {scrollValue} from "@/views/Home/ts/scroll.ts";
import {setBackgroundColor} from "@/components/navbar/ts/style.ts";
const {scrollY,callback}=scrollValue();
callback.onScroll=()=>{
  if (scrollY.value>200)
    setBackgroundColor('rgba(var(--bs-tertiary-bg-rgb), 1)');
  else
    setBackgroundColor('unset');
}
</script>

<template>
<section id="home">
  <div id="backimg"></div>
  <div class="d-flex flex-ai-c flex-jc-c full-wh">
    <h1 id="title">谧静幽原服务器</h1>
  </div>
</section>
  <section id="test" style="height: 2000px">
    <p>{{scrollY}}</p>
  </section>
</template>

<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/utils.scss"></style>
<style scoped lang="scss" src="@/assets/scss/font/mzd-font.scss"></style>