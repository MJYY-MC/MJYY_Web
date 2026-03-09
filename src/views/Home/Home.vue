<script setup lang="ts">
import McStatus from "@/components/mcStatus.vue";
import Broadcast from "@/components/broadcast.vue";
import LargeImageView from "@/components/largeImageView.vue";

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
    if (scrollY.value>200) {//在顶部时导航栏全透明，往下滚动后导航栏变为半透明
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

import { marked } from "marked";
const versionText: Ref<HTMLDivElement | null> = ref(null);
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
    try {
      versionText.value!.innerHTML=
        (marked((await import(`./md/serverVersion.${tryLocale[i]}.md?raw`)).default) as string)
          .replace("{serverVersion}",lt('introduce.version.serverVersion'))
          .replace("{javaVersionMin}",lt('introduce.version.javaVersionMin'))
          .replace("{javaVersionMax}",lt('introduce.version.javaVersionMax'))
          .replace("{bedrockVersionMin}",lt("introduce.version.bedrockVersionMin"))
          .replace("{bedrockVersionMax}",lt('introduce.version.bedrockVersionMax'));
      introduceText.value!.innerHTML=
          (marked((await import(`./md/serverIntroductory.${tryLocale[i]}.md?raw`)).default) as string);
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

import loadImage from "@/views/Home/ts/loadImage.ts";
import {imageQuality} from "@/components/navbar/ts/imageQuality.ts";
const {photoObjects,backImgSrc_get,imgSrc_get} = loadImage();

const largeImageView:Ref<InstanceType<typeof LargeImageView>|null> = ref(null);
function toLargeImageView(e:Event){
  if (largeImageView.value && e.target)
    largeImageView.value.largeImageView_show((e.target as HTMLImageElement).src);
}
</script>

<template>
  <section id="home">
    <div id="backimg"
         class="img-box"
         :key="imageQuality"
    ><!--由于loadstart经测试后不生效，所以将:key放置到父元素上，以解决重复加载不同质量的图片时图片加载动画不显示的问题-->
      <div class="loader-animation"></div>
      <img alt="background"
           @load="imgLoaded" @error="imgError"
           :src="backImgSrc_get()"
      >
    </div>
    <broadcast id="broadcast-container"/>
    <div class="d-flex align-items-center justify-content-center full-wh">
      <div id="home_title">
        <span id="home_title_text1" class="unSelectable home_title_text">谧静幽原</span>
        <span id="home_title_text2" class="unSelectable home_title_text">觅见有缘</span>
      </div>
    </div>
    <div id="mc-status" class="unSelectable">
      <McStatus/>
    </div>
  </section>
  <section id="version" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1>游戏版本支持</h1>
        </div>
      </div>
      <div id="version_java-row" class="row version_row">
        <div id="version_java-row_text-div"
             class="col-12 col-md-7 order-1 order-md-2 version_text-div"
        >
          <h2>Java版</h2>
          <p>服务器原生版本：Java版 1.21.11</p>
          <p>支持1.9到1.21.x版本的游戏</p>
          <em>多版本支持，不必担心服务器版本升级后无法进入</em>
        </div>
        <div class="col-12 col-md-5 order-2 order-md-1">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('photos/photo-1')">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="version_bedrock-row" class="row version_row">
        <div id="version_bedrock-row_text-div"
             class="col-12 col-md-7 version_text-div"
        >
          <h2>基岩版</h2>
          <p>支持1.21.111到1.21.130版本的游戏</p>
          <p>可进行账户同步，即实现在基岩版中游玩Java版账户</p>
          <em>即使不在电脑旁，也可随时掏出手机享受谧静幽原</em>
        </div>
        <div class="col-12 col-md-5">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('photos/photo-1')">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="introduce" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div ref="versionText" id="version-text"></div>
        </div>
        <div class="col-3"></div>
        <div class="col-12">
          <div ref="introduceText" id="introduce-text"></div>
        </div>
      </div>
    </div>
  </section>
  <section id="photo" class="pt-6">
    <div class="container">
      <div class="row" :key="imageQuality">
        <div v-for="(pObj,index) in photoObjects" 
             :key="index"
             class="col-12 col-sm-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box">
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="pObj.photo[imageQuality]">
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
        <div class="col-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
          <div ref="addressText"></div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 d-flex align-items-center">
          <div ref="joinUsText"></div>
        </div>
        <div class="col-lg"></div>
      </div>
      <div class="row">
        <div class="col-md"></div>
        <div class="col-6 col-md-5 col-lg-3">
          <div class="card card_img-box joinUs-qrcode-card">
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="qrcode"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('qrcode/qqGroupQRcode')">
                <a href="https://qm.qq.com/q/siqAtkac9i" class="qrcode-link">
                  <span>{{t(`${lp}.joinUs.qgQrcodeHover`)}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-5 col-lg-3">
          <div class="card card_img-box joinUs-qrcode-card">
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="qrcode"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('qrcode/qqDiscodeQRCode')">
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
  <LargeImageView ref="largeImageView"/>
</template>

<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/utils.scss"></style>
<!--<style scoped lang="scss" src="@/assets/scss/font/mzd-font.scss"></style>-->
<style scoped lang="scss" src="./scss/imgLoader.scss"></style>
<style scoped lang="scss" src="@/assets/scss/color/view/Home.scss"></style>

<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>

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