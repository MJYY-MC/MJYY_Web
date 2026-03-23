<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import donateShowOrHidden, {doHidden, doShow} from "@/views/Donate/ts/donateShowOrHidden.ts";
import {nextTick, ref, type Ref} from "vue";
import {useRouter} from "vue-router";

const {lt:t}=autoUseI18n();

const router = useRouter();

const hateMjyy:Ref<HTMLDivElement|null> = ref(null);

function continueBtn_click(){
  doHidden();
}

let restoreBtnClickNum=0;
const restoreView_isShow:Ref<boolean>=ref(false);
function restoreBtn_click(){
  if (restoreBtnClickNum < 10-1)
    restoreBtnClickNum++;
  else
    restoreView_isShow.value=true;
}

function restore_noBtn_click(){
  restoreBtnClickNum=0;
  restoreView_isShow.value=false;
}
async function restore_yesBtn_click(){
  if (hateMjyy.value) {
    hateMjyy.value.style.display="none";//隐藏其，避免切换后还显示一瞬间
    await nextTick();
    doShow();
    await router.push({name: 'donate'});
  }
}
</script>

<template>
<div ref="hateMjyy"
     class="h-100 w-100 d-flex justify-content-center align-items-center"
>
  <div v-if="donateShowOrHidden()" class="text-center">
    <strong class="warning-text-color">{{t('text.0')}}</strong>
    <br>
    <span>{{t('text.1')}}</span>
    <br>
    <em class="danger-text-color">{{t('text.2')}}</em>
    <div class="d-flex w-100 justify-content-between mt-4">
      <router-link :to="{name:'donate'}">
        <button type="button" class="btn btn-primary" id="cancel-btn">{{t('btn.cancel')}}</button>
      </router-link>
      <button type="button" class="btn btn-danger" @click="continueBtn_click">{{t('btn.continue')}}</button>
    </div>
  </div>
  <div v-else class="text-center">
    <div v-if="!restoreView_isShow">
      <span class="danger-text-color">{{t('text.3.0')}}<span id="restoreBtn" @click="restoreBtn_click">{{t('text.3.1')}}</span></span>
    </div>
    <div v-else>
      <span>{{t('text.4')}}</span>
      <div class="d-flex w-100 justify-content-between mt-4">
        <button type="button" class="btn btn-secondary" @click="restore_noBtn_click">{{t('btn.restore.no')}}</button>
        <button type="button" class="btn btn-primary" @click="restore_yesBtn_click">{{t('btn.restore.yes')}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.danger-text-color {
  color: var(--bs-danger-text-emphasis);
}
.warning-text-color{
  color: var(--bs-warning-text-emphasis);
}
#cancel-btn{
  a{
    color: inherit;
    text-decoration: inherit;
  }
}
#restoreBtn{
  cursor: pointer;
}
</style>

<i18n>
{
  "zh-CN": {
    "text": {
      "0": "你正在尝试选择永远拒绝对谧静幽原进行赞助",
      "1": "赞助选项与赞助页面将因此在你的设备中永久消失",
      "2": "服主将因你的行为而感到难过",
      "3": {
        "0": "你已选择永远拒绝对谧静幽原进行",
        "1": "赞助"
      },
      "4": "是否恢复赞助页面？"
    },
    "btn": {
      "cancel": "取消",
      "continue": "仍然继续",
      "restore": {
        "yes": "是",
        "no": "否"
      }
    }
  }
}
</i18n>