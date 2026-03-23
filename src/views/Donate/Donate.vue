<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";
import {type Ref, ref} from "vue";
import staticDataAddress from "@/ts/env/staticDataAddress.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Donate";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});

const patronsData:Ref<string[]> = ref([]);
const patronsData_isLoaded:Ref<boolean> = ref(false);
(async ()=>{
  const res=await fetch(`${staticDataAddress}/donate/patron/data.json`);
  if (res.ok){
    const resJson = await res.json();


    type SimplJson={
      patrons:{
        name:string,
        allValue:number,
      }[]
    }
    //简化的json
    let simplJson:SimplJson={patrons:[]};
    //排序的json
    let sortJson:SimplJson={patrons:[]};

    resJson.patron.forEach((item:any)=>{//为simplJson赋值
      simplJson.patrons.push({
        name: item.name,
        allValue: (()=>{
          let outputValue:number=0;
          item.donateData.forEach((ite:any)=>{
            outputValue+=Number(ite.value as string);
          });
          return outputValue;
        })(),
      })
    });

    {//为sortJson赋值
      let pushedIndex:number[]=[];
      while (simplJson.patrons.length != pushedIndex.length) {
        let maxValIndex: number = -1;
        {
          let lastMax = 0;
          for (let i = 0; i < simplJson.patrons.length; i++) {
            {
              let isCon=false;
              for (let j=0;j<pushedIndex.length; j++){
                if (pushedIndex[j]==i) {
                  isCon = true;
                  break;
                }
              }
              if (isCon)
                continue;
            }
            if (simplJson.patrons[i]!.allValue > lastMax) {
              lastMax = simplJson.patrons[i]!.allValue;
              maxValIndex = i;
            }
          }
        }
        sortJson.patrons.push(simplJson.patrons[maxValIndex]!);
        pushedIndex.push(maxValIndex);
      }
    }

    {//将最终值赋值至patronsData
      let output:string[]=[];
      sortJson.patrons.forEach((item) => {
        output.push(item.name);
      });
      patronsData.value=output;
    }

    patronsData_isLoaded.value=true;
  }else{
    patronsData_isLoaded.value=true;
    patronsData.value=[t(`${lp}.error`)];
  }
})();
</script>

<template>
  <div id="donate">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div id="main-title" class="text-center">
            <h1>
              <svg id="title-svg-0" class="title-svg"><use xlink:href="#svg-logo-mjyy-logo"></use></svg>
              {{t(`${lp}.mainTitle.h1`)}}
              <svg id="title-svg-1" class="title-svg"><use xlink:href="#svg-logo-mjyy-logo"></use></svg>
            </h1>
            <h3>{{t(`${lp}.mainTitle.h3`)}}</h3>
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