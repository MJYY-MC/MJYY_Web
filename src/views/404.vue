<script setup lang="ts">
import {useTitle} from "@vueuse/core";

useTitle('404');
</script>

<template>
<div id="main"
     class="position-relative w-100 h-100 d-flex align-items-center justify-content-center"
>
  <svg id="logo" class="unSelectable"><use xlink:href="#svg-logo-mjyy-logo"></use></svg>
</div>
</template>

<style scoped lang="scss">
@keyframes logo-anim {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
#logo{
  fill: var(--bs-body-color);
  width: 50vw;
  height: 50vh;
  animation: logo-anim 1s infinite linear;
}
</style>