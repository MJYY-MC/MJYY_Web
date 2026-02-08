<script setup lang="ts">
import {type JavaStatusResponse, statusJava} from "node-mcstatus";
import {onMounted, ref, type Ref} from "vue";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {isProd} from "@/ts/env/packMode.ts";

const {lt:t}=autoUseI18n();

const icon:Ref<HTMLImageElement|null> = ref(null);
const motd:Ref<HTMLDivElement|null> = ref(null);
const version:Ref<HTMLDivElement|null> = ref(null);
const playerOnline:Ref<HTMLSpanElement|null> = ref(null);
const playerList:Ref<HTMLDivElement|null> = ref(null);

onMounted(async ()=>{
  if(isProd) {
    if (
        motd.value
        && version.value
        && playerOnline.value
        && playerList.value
        && icon.value
    ) {
      try {
        const jsr: JavaStatusResponse = await statusJava("mc.mjyy.top");
        if (jsr.online) {
          if (jsr.motd)
            motd.value.innerHTML = jsr.motd.html.replace(/<span>[^>]*\n[^<]*<\/span>/, "<br>");
          else
            motd.value.innerText = t('error');
          if (jsr.version)
            version.value.innerHTML = jsr.version.name_html;
          else
            version.value.innerText = t('error');
          if (jsr.players) {
            playerOnline.value.innerText =
                t('mcStatus-playerOnline.main', {
                  online: jsr.players.online,
                  max: jsr.players.max
                });
            jsr.players.list.forEach(pl => {
              playerList.value!.innerHTML += '<br>' + pl.name_html;
            })
          }
          if (jsr.icon)
            icon.value.src = jsr.icon;
        } else {
          motd.value.innerText = t('offline');
          version.value.innerText = t('offline');
        }
      } catch {
        motd.value.innerText = t('error');
        version.value.innerText = t('error');
      }
    }
  }else{
    motd.value!.innerText = t('dev');
    version.value!.innerText = t('dev');
  }
});
</script>

<template>
<div id="mcStatus-root">
  <img id="mcStatus-icon" ref="icon" src="@/assets/logo/svg/mjyy-logo.svg" alt="server icon"/>
  <div id="mcStatus-motd" ref="motd">{{t('loading')}}</div>
  <div id="mcStatus-version" ref="version">{{t('loading')}}</div>
  <div id="mcStatus-player">
    <span ref="playerOnline">{{t('mcStatus-playerOnline.main',{online: '-',max: '-'})}}</span>
    <div id="mcStatus-player-list" ref="playerList">
      <strong>{{t('mcStatus-playerOnline.list.title')}}</strong>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
#mcStatus-root{
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(3, auto);//repeat(3, 1fr);
  grid-column-gap: .3rem;
  grid-row-gap: 0;
  grid-template-areas:
    "g0 g1"
    "g0 g2"
    "g0 g3";
  max-height: 6rem;
}
#mcStatus-icon{
  grid-area: g0;
  height: 6rem;
  image-rendering: pixelated;
}
#mcStatus-motd{
  grid-area: g2;
}
#mcStatus-version{
  grid-area: g1;
}
#mcStatus-player{
  grid-area: g3;
  #mcStatus-player-list{
    display: none;
    position: absolute;
    background-color: var(--mcstatus-player-list-bg);
    padding: .5rem;
    border-radius: 10px;
    bottom: 2rem;
    max-height: 20rem;
    overflow-y: scroll;
  }
}
#mcStatus-player:hover #mcStatus-player-list{
  display: inherit;
}
</style>
<style scoped lang="scss" src="@/assets/scss/color/component/mcStatus.scss"></style>

<i18n>
{
  "zh-CN": {
    "mcStatus-playerOnline": {
      "main": "在线人数：{online}/{max}",
      "list": {
        "title": "玩家列表："
      }
    },
    "loading": "检测中……",
    "error": "检测失败",
    "offline": "服务离线",
    "dev": "开发模式不进行检测"
  },
  "en-US": {
    "mcStatus-playerOnline": {
      "main": "online: {online}/{max}",
      "list": {
        "title": "Player List："
      }
    },
    "loading": "checking...",
    "error": "failed",
    "offline": "server offline",
    "dev": "dev mode"
  }
}
</i18n>