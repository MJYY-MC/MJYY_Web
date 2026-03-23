<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import patronsData_load from "@/views/Donate/ts/patronsData_load.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Donate";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});

const {patronsData,patronsData_isLoaded,patronsData_isFailed} = patronsData_load();
</script>

<template>
  <div id="donate">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div id="main-title" class="text-center">
            <svg id="title-svg-0" class="title-svg"><use xlink:href="#svg-logo-mjyy-logo"></use></svg>
            <h1>{{t(`${lp}.mainTitle.h1`)}}</h1>
            <h4>{{t(`${lp}.mainTitle.h4`)}}</h4>
            <svg id="title-svg-1" class="title-svg"><use xlink:href="#svg-logo-mjyy-logo"></use></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-2">
      <div style="height: 30vh"></div><!--暂时占位，后续在此添加赞助渠道-->
    </div>
    <div class="container mt-2">
      <div class="row">
        <div class="col-12 text-center">
          <h3>{{t(`${lp}.patron.title.h3`)}}</h3>
          <em>{{t(`${lp}.patron.title.em`)}}</em>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12"
             :style="(patronsData_isLoaded==true)?{display:'none'}:{}"
        >
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        </div>
        <div class="col-12 text-center"
             :style="(patronsData_isFailed==true)?{}:{display:'none'}"
        >
          <strong>{{t(`${lp}.failed`)}}</strong>
        </div>

        <div class="col-6 col-sm-4 col-md-3 col-xl-2 mx-auto text-center"
             v-for="(patronData,pdIndex) in patronsData"
             :key="pdIndex"
        >
          <p>{{patronData}}</p>
        </div>
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
      //text-wrap: nowrap;
    }

    .title-svg {
      width: calc(10rem + 1.5vw);
      position: absolute;
      z-index: -1;
      fill: var(--main-logo-color);
      top: 0;
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
<style scoped lang="scss" src="@/assets/scss/color/view/Donate.scss"></style>