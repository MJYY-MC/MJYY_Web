<script setup lang="ts">
import scrollSpy from '@/ts/global/navbar_sectionLinks/vue/scrollSpy.ts';

const {curStayEleId}=scrollSpy([
    document.getElementById('home')!,
    document.getElementById('test')!,
]);
</script>

<template>
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='home')}"
        :to="{ hash: '#home' }"
        class="nav-link"
    >home</router-link>
  </li>
  <li class="nav-item nav-btn">
    <router-link
        :class="{'active':(curStayEleId=='test')}"
        :to="{ hash: '#test' }"
        class="nav-link"
    >test</router-link>
  </li>
</template>

<style scoped lang="scss">

</style>