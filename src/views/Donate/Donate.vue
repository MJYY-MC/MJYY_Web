<script setup lang="ts">
import donateShowOrHidden from "@/views/Donate/ts/donateShowOrHidden.ts";
import {useRouter} from "vue-router";

const router = useRouter();

if (!donateShowOrHidden()){
  router.push({ name: 'donate_hateMjyy'});
}

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

function hateMjyyBtn_click(){
  router.push({ name: 'donate_hateMjyy'});
}
</script>

<template>
  <div id="donate" v-if="donateShowOrHidden()">
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
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 col-md-6 mb-1">
          <h5 class="text-center">{{t(`${lp}.content.0.h5`)}}</h5>
          <span>{{t(`${lp}.content.0.span.0`)}}</span>
          <br/>
          <span>{{t(`${lp}.content.0.span.1`)}}</span>
        </div>
        <div class="col-12 col-md-6 mb-1">
          <h5 class="text-center">{{t(`${lp}.content.1.h5`)}}</h5>
          <span>{{t(`${lp}.content.1.span`)}}</span>
        </div>
        <!--<div class="col-12 col-md-6">
          <h5>资金用处</h5>
          <span>服务器的硬件与电力损耗；</span>
          <br/>
          <span>维护兼开发人员的薪酬。</span>
        </div>-->
      </div>
      <div class="row mt-2">
        <div class="col-12 text-center">
          <h4>{{t(`${lp}.content.2.h4`)}}</h4>
          <span>{{t(`${lp}.content.2.span`)}}</span>
        </div>
      </div>
    </div>
    <div id="patron" class="container mt-5">
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

        <div class="patron-obj col-12 col-sm-6 col-lg-4 col-xxl-3 text-center"
             v-for="(patronData,pdIndex) in patronsData"
             :key="pdIndex"
        >
          <svg class="rank-head rank-icon unSelectable"
               :class="`ri-n${pdIndex+1}`"
               v-if="pdIndex<=2"
          ><use :xlink:href="`#svg-bsi-${pdIndex+1}-circle-fill`"></use></svg>
          <span class="rank-head rank-text unSelectable"
                v-if="pdIndex>2"
          >{{pdIndex+1}}</span>
          <span :title="patronData.value.toString()">{{patronData.name}}</span>
        </div>
      </div>
    </div>
    <div id="hateMjyyBtn_div">
      <button type="button" class="btn btn-outline-danger"
              @click="hateMjyyBtn_click"
      >{{t(`${lp}.hateMjyyBtn`)}}</button>
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

  #patron{
    .patron-obj{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: .8rem;

      .rank-head{
        margin-right: .25rem;
        &.rank-icon{
          width: 1rem;
          height: 1rem;
          &.ri-n1{
            color: var(--rank-icon-n1-color);
          }
          &.ri-n2{
            color: var(--rank-icon-n2-color);
          }
          &.ri-n3{
            color: var(--rank-icon-n3-color);
          }
        }
        &.rank-text{
          color: var(--rank-text-color);
          font-weight: lighter;
          font-size: .8rem;
        }
      }
    }
  }

  #hateMjyyBtn_div {
    margin-top: 80vh;
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
}
</style>
<style scoped lang="scss" src="@/assets/scss/color/view/Donate.scss"></style>
<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>