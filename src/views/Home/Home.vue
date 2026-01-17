<script setup lang="ts">
import {autoUseI18n, getCurrentLocale, getFallbackLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {onMounted, onUnmounted, type Ref, ref} from "vue";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});

import {hashCheckAndScroll} from "@/router";
let loadProgress:number=0;
function loadDoneAdd(){
  loadProgress++;
  if (loadProgress>=2){//所有对象加载完毕后执行的逻辑
    hashCheckAndScroll();
  }
}

import {scrollValue} from "@/ts/global/vue/scroll.ts";
import {toggleClass as navbar_toggleClass} from "@/components/navbar/ts/style.ts";
const {scrollY,callback}=scrollValue();
onMounted(()=>{
  let navbarBgIsTran:boolean|null=null;
  let tbcCloseTimeoutLock:boolean=false;
  function toggleNavbarBackground():void{
    if (scrollY.value>200) {
      if (navbarBgIsTran!=false){
        navbar_toggleClass('background-color-transparent', false);
        if (!tbcCloseTimeoutLock) {
          tbcCloseTimeoutLock = true;
          setTimeout(() => {
            navbar_toggleClass('transition-background-color', false);
            tbcCloseTimeoutLock = false;
          }, 1000);
        }
        navbarBgIsTran=false;
      }
    }
    else {
      if (navbarBgIsTran!=true){
        navbar_toggleClass('transition-background-color', true);
        navbar_toggleClass('background-color-transparent', true);
        navbarBgIsTran=true;
      }
    }
  }
  callback.onScroll=toggleNavbarBackground;
  toggleNavbarBackground();

  loadDoneAdd();
});
onUnmounted(()=>{
  callback.onScroll=null;
})

/*import {sectionEvent} from "@/ts/global/navbar_sectionLinks/sectionEvent.ts";
function handleSectionStayChange(data:{secId:string}) {
  //用于临时测试，当停留位置更改至另一部分将触发该事件并执行输出
  console.debug(`[Home.vue][event] section: ${data.secId}`);
}
onMounted(()=>{
  sectionEvent.on('sectionStayChange',handleSectionStayChange);
});
onUnmounted(()=>{
  sectionEvent.off('sectionStayChange',handleSectionStayChange);
});*/

import {marked} from "marked";
async function doMd(){
  const tryLocale:string[]=[
    ...[getCurrentLocale()],//当前语言
    ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
  ]
  for (let i=0;i<tryLocale.length;i++){
    try{
      introduceText.value!.innerHTML=marked((await import(`./md/serverIntroductory.${tryLocale[i]}.md?raw`)).default) as string;
      break;
    }catch {}
  }
}
const introduceText:Ref<HTMLDivElement|null> = ref(null);
onMounted(async ()=>{
  await doMd();
  localeEvents.on('afterLocaleChange',doMd);

  loadDoneAdd();
});
onUnmounted(async ()=>{
  localeEvents.off('afterLocaleChange',doMd);
})
</script>

<template>
  <section id="home">
    <div id="backimg"></div>
    <div class="d-flex flex-ai-c flex-jc-c full-wh">
      <h1 id="title">谧静幽原服务器</h1>
    </div>
  </section>
  <section id="introduce">
    <div class="container">
      <div class="row">
        <div class="col-12 mt-6">
          <div ref="introduceText" id="introduce-text"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/utils.scss"></style>
<style scoped lang="scss" src="@/assets/scss/font/mzd-font.scss"></style>