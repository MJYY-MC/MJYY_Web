<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, ref, type Ref} from "vue";
import {useFullscreen} from "@vueuse/core";
import {isDev} from "@/ts/env/packMode.ts";

const route = useRoute();
const meta = computed(() => ({
  game:{
    //游戏的html文件路径
    htmlPath: route.meta.game_htmlPath as string[],
  },
}));

const mainIframe:Ref<HTMLIFrameElement|null> = ref(null);
const mainIframe_src:Ref<string> = ref('');

function fullscreenBtn_click(){
  useFullscreen(mainIframe.value).enter();
}

onMounted(()=>{
  if (meta.value.game.htmlPath.length>1) {
    meta.value.game.htmlPath.forEach(hp => {//多个地址则选择速度最快的地址
      (async (path: string) => {
        const res = await fetch(path,{
          method: 'GET',
        });
        if (res.ok && mainIframe_src.value == '') {
          mainIframe_src.value = path;//直接应用最先响应成功的地址
          if (isDev)
            console.debug('[gameView.vue] 已找到最佳地址并应用：',path);
        }
      })(hp);
    });
  }
  else mainIframe_src.value = meta.value.game.htmlPath[0]!;
});
</script>

<template>
  <div id="main">
    <iframe ref="mainIframe" id="mainIframe"
            :src='mainIframe_src'
            allow="fullscreen; pointer-lock;"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
    />
    <button id="fullscreenBtn" type="button"
            class="btn btn-link nav-link d-flex align-items-center justify-content-center"
            @click="fullscreenBtn_click"
    >
      <svg><use xlink:href="#svg-bsi-arrows-fullscreen"></use></svg>
    </button>
  </div>
</template>

<style scoped lang="scss" src="@/assets/scss/color/view/gameView.scss"></style>
<style scoped lang="scss">
#main{
  position: relative;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
#mainIframe{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  border:none;
}
#fullscreenBtn{
  position: absolute;
  top: 0;
  right: 0;
  margin: .5rem;
  padding: .3rem;
  background: var(--fullscreen-btn-bg);
  fill: var(--bs-body-color);
  svg{
    width: 24px;
    height: 24px;
  }
}
</style>