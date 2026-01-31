<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import scrollSpy from '@/ts/global/navbar_sectionLinks/vue/scrollSpy.ts';

const {lt:t}=autoUseI18n();

const {curStayEleId}=scrollSpy([
    document.getElementById('home')!,
    document.getElementById('introduce')!,
    document.getElementById('photo')!,
    document.getElementById('rule')!,
    document.getElementById('join-us')!,
]);


import renderMode from "@/ts/env/renderMode.ts";
import {hashCheckAndScroll} from "@/router";
import {watch} from "vue";
import { useRoute } from 'vue-router';
if(renderMode=='ssg') {
  const route = useRoute();
  watch(()=>route.hash, (_newHash: string) => {//监听hash变化
    if (renderMode == 'ssg')//如果是ssg模式则需要手动触发滚动
      hashCheckAndScroll();
  }, {immediate: true})
}
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
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='photo')}"
        :to="{ hash: '#photo' }"
        class="nav-link"
    >{{t('photo')}}</router-link>
  </li>
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='rule')}"
        :to="{ hash: '#rule' }"
        class="nav-link"
    >{{t('rule')}}</router-link>
  </li>
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='join-us')}"
        :to="{ hash: '#join-us' }"
        class="nav-link"
    >{{t('joinUs')}}</router-link>
  </li>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "home": "首页",
    "introduce": "介绍",
    "photo": "相片",
    "rule": "规则",
    "joinUs": "加入我们"
  },
  "en-US": {
    "home": "Title",
    "introduce": "Introduce",
    "photo": "Photo",
    "rule": "Rule",
    "joinUs": "Join Us"
  }
}
</i18n>