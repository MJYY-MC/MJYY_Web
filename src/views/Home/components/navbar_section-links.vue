<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import scrollSpy from '@/ts/global/navbar_sectionLinks/vue/scrollSpy.ts';

const {lt:t}=autoUseI18n();

const {curStayEleId}=scrollSpy([
    document.getElementById('home')!,
    document.getElementById('introduce')!,
]);
</script>

<template>
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='home')}"
        :to="{ hash: '#home' }"
        class="nav-link"
    >{{t('home')}}</router-link>
  </li>
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='introduce')}"
        :to="{ hash: '#introduce' }"
        class="nav-link"
    >{{t('introduce')}}</router-link>
  </li>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "home": "首页",
    "introduce": "介绍"
  },
  "en-US": {
    "home": "Title",
    "introduce": "Introduce"
  }
}
</i18n>