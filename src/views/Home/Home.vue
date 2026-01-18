<script setup lang="ts">
import {autoUseI18n, getCurrentLocale, getFallbackLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import {imgLoaded,imgError} from "@/views/Home/ts/imgLoader.ts";

const {gt:t,lt}=autoUseI18n();
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
const introduceText:Ref<HTMLDivElement|null> = ref(null);
const ruleText:Ref<HTMLDivElement|null> = ref(null);
const addressText:Ref<HTMLDivElement|null> = ref(null);
const joinUsText:Ref<HTMLDivElement|null> = ref(null);
async function doMd(){
  const tryLocale:string[]=[
    ...[getCurrentLocale()],//当前语言
    ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
  ]
  for (let i=0;i<tryLocale.length;i++){
    try{
      introduceText.value!.innerHTML=
          (marked((await import(`./md/serverIntroductory.${tryLocale[i]}.md?raw`)).default) as string)
              .replace("{serverVersion}",lt('introduce.version.serverVersion'))
              .replace("{javaVersionMin}",lt('introduce.version.javaVersionMin'))
              .replace("{javaVersionMax}",lt('introduce.version.javaVersionMax'))
              .replace("{bedrockVersionMin}",lt("introduce.version.bedrockVersionMin"))
              .replace("{bedrockVersionMax}",lt('introduce.version.bedrockVersionMax'));
      ruleText.value!.innerHTML=
          (marked((await import(`./md/serverRule.${tryLocale[i]}.md?raw`)).default) as string);
      addressText.value!.innerHTML=
          (marked((await import(`./md/serverAddress.${tryLocale[i]}.md?raw`)).default) as string);
      joinUsText.value!.innerHTML=
          (marked((await import(`./md/joinUsText.${tryLocale[i]}.md?raw`)).default) as string);
      break;
    }catch {}
  }
}
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
  <section id="introduce" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div ref="introduceText" id="introduce-text"></div>
        </div>
      </div>
    </div>
  </section>
  <section id="photo" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/03/18/photo-21-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-2-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-18-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-15-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-17-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/03/18/photo-22-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-6-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-5-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/03/18/photo-23-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/03/18/photo-24-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/03/18/photo-25-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-7-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-8-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-9-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-10-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-11-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-12-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-19-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-20-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-13-low.jpg">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     src="https://cdnjson.com/images/2025/01/15/photo-14-low.jpg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="rule" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div ref="ruleText"></div>
        </div>
      </div>
    </div>
  </section>
  <section id="join-us" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-lg"></div>
        <div class="col-12 col-md-6 col-lg-4 d-flex flex-ai-c flex-jc-c">
          <div ref="addressText"></div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 d-flex flex-ai-c">
          <div ref="joinUsText"></div>
        </div>
        <div class="col-lg"></div>
      </div>
      <div class="row">
        <div class="col-md"></div>
        <div class="col-6 col-md-5 col-lg-3">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="qrcode"
                     @load="imgLoaded" @error="imgError"
                     src="@/assets/img/copy/qqGroupQRcode-low.png">
                <a href="https://qm.qq.com/q/siqAtkac9i" class="qrcode-link">
                  <span>{{t(`${lp}.joinUs.qgQrcodeHover`)}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-5 col-lg-3">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="qrcode"
                     @load="imgLoaded" @error="imgError"
                     src="@/assets/img/copy/qqDiscodeQRCode-low.png">
                <a href="https://pd.qq.com/s/cci7lavxo" class="qrcode-link">
                  <span>{{t(`${lp}.joinUs.qdQrcodeHover`)}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md"></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/utils.scss"></style>
<style scoped lang="scss" src="@/assets/scss/font/mzd-font.scss"></style>
<style scoped lang="scss" src="./scss/imgLoader.scss"></style>

<i18n>
{
  "en-US": {
    "introduce": {
      "version": {
        "serverVersion": "1.21.11",
        "javaVersionMin": "1.9",
        "javaVersionMax": "1.21.x",
        "bedrockVersionMin": "1.21.111",
        "bedrockVersionMax": "1.21.130"
      }
    }
  }
}
</i18n>