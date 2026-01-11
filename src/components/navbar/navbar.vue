<script setup lang="ts">
import {autoUseI18n, getCurrentLocale, switchLocale} from "@/utils/i18nUtils.ts";
import {ref, type Ref} from "vue";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";

const {lt:t,gt}=autoUseI18n();
const lp:string="comp_navbar";
autoLoadLocale(lp);

const curLoc:Ref<string>= ref(getCurrentLocale());
async function doLangSel(lang:string){
  await switchLocale(lang);
  curLoc.value=getCurrentLocale();
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home'}">
        <img src="@/assets/logo/svg/mjyy-logo.svg" alt="logo" width="48" height="48">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" :to="{ name: 'home'}">{{gt(`${lp}.home`)}}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex nav-2">
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item dropdown d-flex flex-ai-c">
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-translate"></use></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t('langs.lang-sel')}}</h6>
              </li>
              <li>
                <button @click="doLangSel('zh-CN')" :class="{ 'active': (curLoc=='zh-CN') }" class="dropdown-item">
                  {{t('langs.zh-CN')}}
                  <svg :style="(curLoc!='zh-CN')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('en-US')" :class="{ 'active': (curLoc=='en-US') }" class="dropdown-item">
                  {{t('langs.en-US')}}
                  <svg :style="(curLoc!='en-US')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "langs": {
      "lang-sel": "语言选择",
      "zh-CN": "简体中文",
      "en-US": "English(英语)"
    }
  },
  "en-US": {
    "langs": {
      "lang-sel": "Language Selection",
      "zh-CN": "简体中文(Simplified Chinese)",
      "en-US": "English"
    }
  }
}
</i18n>