<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import serverMap_fix from "@/components/pages/serverMap/ts/serverMap_fix.ts";

const {lt:t}=autoUseI18n();

async function fixBtn_click(){
  await serverMap_fix();
}
</script>

<template>
  <li class="nav-item nav-btn">
    <a class="nav-link" role="button"
       @click="fixBtn_click"
       :title="t('fixBtn_title')"
    >{{t('fixBtn')}}</a>
  </li>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "fixBtn": "光标与触控修复",
    "fixBtn_title": "点击修复鼠标拖动与触控滑动导致地图黑屏的问题"
  },
  "en-US": {
    "fixBtn": "Cursor and Touch Repair",
    "fixBtn_title": "Click to fix the issue where dragging the mouse or swiping on the touch screen causes the map to go black"
  }
}
</i18n>