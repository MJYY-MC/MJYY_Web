<script setup lang="ts">

</script>

<template>
  <div class="mt-5">
    <router-link :to="{ hash: '#home' }">home</router-link>
    <router-link :to="{ hash: '#test' }">test</router-link>
  </div>
  <section id="home" style="width:100%;height: 200vh;background-color: black"></section>
  <section id="test" style="width:100%;height: 200vh;background-color: gray"></section>
</template>

<style scoped lang="scss">

</style>