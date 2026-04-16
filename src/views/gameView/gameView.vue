<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute();
const meta = computed(() => ({
  game:{
    //游戏的html文件路径
    htmlPath: route.meta.game_htmlPath as string,
  },
}));
</script>

<template>
  <div id="main">
    <iframe ref="mainIframe" id="mainIframe"
            :src='meta.game.htmlPath'
            allow="fullscreen; pointer-lock;"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
    />
  </div>
</template>

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
</style>