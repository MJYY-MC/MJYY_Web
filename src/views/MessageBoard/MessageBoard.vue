<script setup lang="ts">
import backendPost from '@/ts/backend/post.ts';
import {ref, type Ref} from "vue";
import PasswordInput from "@/components/passwordInput.vue";

const mainIframe:Ref<HTMLIFrameElement|null> = ref(null);
let mainIframe_haveSrc:boolean = false;
const passwordInput:Ref<InstanceType<typeof PasswordInput>|null>=ref(null);

async function onPasswdEnter(password:string){
  if (passwordInput.value) {
    passwordInput.value.showFeedback('alert-secondary', 4);
    passwordInput.value.lockInput();
    const res = await backendPost("/gateway/minecraft_messagepage", {Password: password});
    if (res.result != undefined) {
      if (res.result.ok) {
        passwordInput.value.showFeedback('alert-success', 3);
        mainIframe_haveSrc = true;
        mainIframe.value!.src = `${res.result.json.url}?passkey=${res.result.json.paras.passkey}`;
      }else{
        if(res.result.statusCode==401) {
          passwordInput.value.showFeedback('alert-danger', 1);
          passwordInput.value.unlockInput();
        }
        else {
          passwordInput.value.showFeedback('alert-warning', 2);
          passwordInput.value.unlockInput();
        }
      }
    }
    else {
      passwordInput.value.showFeedback('alert-warning', 2);
      passwordInput.value.unlockInput();
    }
  }
}

function mainIframe_onLoad(){
  if (mainIframe.value) {
    if(mainIframe_haveSrc){
      mainIframe.value.style.display = '';
      passwordInput.value?.hidePanel();
    }
  }
}
</script>

<template>
  <div id="main">
    <iframe ref="mainIframe" id="mainIframe"
            src=''
            :onload="mainIframe_onLoad"
            style="display:none;"
            sandbox='allow-scripts allow-same-origin allow-forms'
    ></iframe>
    <div id="fullContainer">
      <PasswordInput ref="passwordInput"
                     @passwdEnter="onPasswdEnter"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
#main{
  position: relative;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
#mainIframe{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  border:none;
  z-index: 1;
}
#fullContainer{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
</style>