<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import donateShowOrHidden, {doHidden, doShow} from "@/views/Donate/ts/donateShowOrHidden.ts";
import {nextTick, ref, type Ref} from "vue";
import {useRouter} from "vue-router";

const {lt:t}=autoUseI18n();

const router = useRouter();

function continueBtn_click(){
  doHidden();
}

let restoreBtnClickNum:number=0;
const restoreBtnClickNum_max:number = 20;
const restoreView_isShow:Ref<boolean>=ref(false);
const restoreBtn:Ref<HTMLSpanElement|null> = ref(null);
const restoreBtn_show:Ref<HTMLSpanElement|null> = ref(null);
function restoreBtn_elDo(){
  if (restoreBtn.value && restoreBtn_show.value){
    if (restoreBtnClickNum!=0){
      if (restoreBtnClickNum==restoreBtnClickNum_max){
        restoreBtn_show.value.style.display='none';
        restoreBtn.value.style.fontWeight='';
      }else {
        restoreBtn.value.style.fontWeight =
            (1000 * (restoreBtnClickNum / restoreBtnClickNum_max)).toString();
        restoreBtn_show.value.style.opacity =
            (1 - (restoreBtnClickNum / restoreBtnClickNum_max)).toString();
      }
    }
    else{
      restoreBtn.value.style.fontWeight='';
      restoreBtn_show.value.style.opacity='';
      restoreBtn_show.value.style.display='';
    }
  }
}
function restoreBtn_click(){
  if (restoreBtnClickNum < restoreBtnClickNum_max) {
    restoreBtnClickNum++;
    restoreBtn_elDo();
  }
  else
    restoreView_isShow.value=true;
}

function restore_noBtn_click(){
  restoreBtnClickNum=0;
  restoreBtn_elDo();
  restoreView_isShow.value=false;
}
let restore_now:Ref<boolean> = ref(false);
async function restore_yesBtn_click(){
  restore_now.value=true;
  doShow();
  await router.push({name: 'donate'});
}
</script>

<template>
<div class="h-100 w-100 d-flex justify-content-center align-items-center">
  <div v-if="donateShowOrHidden() && !restore_now" class="text-center unSelectable">
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
  <div v-else class="text-center unSelectable">
    <div v-if="!restoreView_isShow">
      <span class="danger-text-color">{{t('text.3.0')}}<span ref="restoreBtn_show">{{t('text.3.1')}}</span>{{t('text.3.2')}}<span id="restoreBtn" ref="restoreBtn" @click="restoreBtn_click" @contextmenu.prevent="restoreBtn_click">{{t('text.3.3')}}</span></span>
    </div>
    <div v-else>
      <span>{{t('text.4')}}</span>
      <div class="d-flex w-100 justify-content-between mt-4">
        <button type="button" class="btn btn-secondary" @click="restore_noBtn_click" :disabled="restore_now">{{t('btn.restore.no')}}</button>
        <button type="button" class="btn btn-primary" @click="restore_yesBtn_click" :disabled="restore_now">{{t('btn.restore.yes')}}</button>
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
<style scoped lang="css" src="@/assets/css/global/unSelect.css"/>

<i18n>
{
  "zh-CN": {
    "text": {
      "0": "你正在尝试选择永远拒绝对谧静幽原进行赞助",
      "1": "赞助选项与赞助页面将因此在你的设备中永久消失",
      "2": "服主将因你的行为而感到难过",
      "3": {
        "0": "你已选择永远",
        "1": "拒绝",
        "2": "对谧静幽原进行",
        "3": "赞助"
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