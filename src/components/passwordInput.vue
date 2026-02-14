<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {type Ref, ref} from "vue";

const {lt:t} = autoUseI18n();

const emit = defineEmits<{
  (e: 'passwdEnter',password:string):void;
}>();

const pswIptPanel:Ref<HTMLDivElement|null> = ref(null);
const passwordInput:Ref<HTMLInputElement|null>=ref(null);
const passwordInput_isInvalid:Ref<boolean> = ref(false);
const enterButton:Ref<HTMLButtonElement|null>=ref(null);
const feedback:Ref<HTMLElement|null> = ref(null);
type alertClass =('alert-secondary'|'alert-success'|'alert-warning'|'alert-danger');
const feedbackClass:Ref<alertClass> =ref('alert-secondary');

function showFeedback(styleClass:alertClass,textId:number){
  if (feedback.value){
    feedback.value.innerText=t(`feedback.${textId}`);
    feedbackClass.value=styleClass;
    passwordInput_isInvalid.value = styleClass == 'alert-danger';
    feedback.value.style.display = '';
  }
}

function passwordEnter(){
  if (passwordInput.value){
    if (passwordInput.value.value!="") {
      emit('passwdEnter', passwordInput.value.value);
    }
    else
      showFeedback('alert-danger',0);
  }
}

/**
 * 锁定输入元素
 * @return 返回true则代表锁定成功，否则代表锁定失败
 */
function lockInput():boolean{
  if (passwordInput.value && enterButton.value){
    passwordInput.value.disabled = true;
    enterButton.value.disabled = true;
    return true;
  } else return false;
}
/**
 * 解锁输入元素
 * @return 返回true则代表锁定成功，否则代表锁定失败
 */
function unlockInput():boolean{
  if (passwordInput.value && enterButton.value){
    passwordInput.value.disabled = false;
    enterButton.value.disabled = false;
    return true;
  } else return false;
}

/**
 * 隐藏面板
 * @return 返回true则代表锁定成功，否则代表锁定失败
 */
function hidePanel():boolean{
  if (pswIptPanel.value){
    pswIptPanel.value.style.display = 'none';
    return true;
  } else return false;
}
/**
 * 显示面板
 * @return 返回true则代表锁定成功，否则代表锁定失败
 */
function unhidePanel():boolean{
  if (pswIptPanel.value){
    pswIptPanel.value.style.display = '';
    return true;
  } else return false;
}

defineExpose({
  showFeedback,
  lockInput, unlockInput,
  hidePanel, unhidePanel,
});
</script>

<template>
  <div ref="pswIptPanel" class="card">
    <div class="card-header d-flex justify-content-center">
      <strong>{{t(`title`)}}</strong>
    </div>
    <div class="card-body">
      <div class="input-group">
        <span class="input-group-text">{{t('label')}}</span>
        <input ref="passwordInput"
               type="password" class="form-control"
               :placeholder="t('inputText')"
               :class="{ 'is-invalid': passwordInput_isInvalid }"
               @keyup.enter="passwordEnter"
        >
        <button class="btn btn-outline-secondary" type="button"
                ref="enterButton"
                @click="passwordEnter"
        >{{t('enterBtn')}}</button>
      </div>
      <div ref="feedback"
           class="alert mt-3 mb-0"
           role="alert"
           :class="[feedbackClass]"
           style="display: none;"
      >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

<i18n>
{
  "zh-CN": {
    "label": "访问密码",
    "enterBtn": "进入",
    "inputText": "密码",
    "feedback": {
      "0": "密码不可为空",
      "1": "密码错误",
      "2": "无法连接至服务",
      "3": "验证成功，等待加载",
      "4": "正在验证"
    },
    "title": "访问限制内容"
  },
  "en-US": {
    "label": "Access Password",
    "enterBtn": "Enter",
    "inputText": "Password",
    "feedback": {
      "0": "Password cannot be empty",
      "1": "Incorrect password",
      "2": "Unable to connect to the service",
      "3": "Verification successful, waiting to load",
      "4": "Verifying"
    },
    "title": "Restricted Content"
  }
}
</i18n>