<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {onMounted, onUnmounted} from "vue";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});


import {scrollValue} from "@/ts/global/vue/scroll.ts";
import {setBackgroundColor} from "@/components/navbar/ts/style.ts";
const {scrollY,callback}=scrollValue();
callback.onScroll=()=>{
  if (scrollY.value>200)
    setBackgroundColor('rgba(var(--bs-tertiary-bg-rgb), 1)');
  else
    setBackgroundColor('unset');
}

import {sectionEvent} from "@/ts/global/navbar_sectionLinks/sectionEvent.ts";
function handleSectionStayChange(data:{secId:string}) {
  //用于临时测试，当停留位置更改至另一部分将触发该事件并执行输出
  console.debug(`[Home.vue][event] section: ${data.secId}`);
}
onMounted(()=>{
  sectionEvent.on('sectionStayChange',handleSectionStayChange);
});
onUnmounted(()=>{
  sectionEvent.off('sectionStayChange',handleSectionStayChange);
});
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