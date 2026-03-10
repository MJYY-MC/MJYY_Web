<script setup lang="ts">

</script>

<template>
  <div id="donate">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div id="main-title" class="text-center">
            <h1>
              <svg id="title-svg-0" class="title-svg"><use xlink:href="#svg-mjyy-logo"></use></svg>
              为所有玩家提供免费的多人游戏平台
              <svg id="title-svg-1" class="title-svg"><use xlink:href="#svg-mjyy-logo"></use></svg>
            </h1>
            <h3>无氪金，无会员，只有对我的世界的热爱。</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <div class="row">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#donate {
  overflow-x: hidden;
  min-height: calc(100vh - var(--navbar-normal_offsetHeight));

  #main-title {
    position: relative;

    h1 {
      text-wrap: nowrap;
    }

    .title-svg {
      width: calc(10rem + 1.5vw);
      position: absolute;
      z-index: -1;
      color: var(--bs-heading-color);
    }

    #title-svg-0 {
      left: 0;
      transform: translateX(-50%) rotate(-45deg) rotateY(180deg);
    }

    #title-svg-1 {
      right: 0;
      transform: translateX(50%) rotate(45deg);
    }
  }
}
</style>