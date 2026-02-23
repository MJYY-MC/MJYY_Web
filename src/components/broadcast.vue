<script setup lang="ts">
import backendGet from "@/ts/backend/get.ts";
import {onMounted, ref, type Ref} from "vue";
import { render as mcRender } from "minecraft-text";

const broadcast: Ref<HTMLDivElement | null> = ref(null);
const broadcastContent: Ref<HTMLSpanElement | null> = ref(null);
onMounted(async () => {
  const targetUrl:string|null|undefined=await (async ()=>{
    const res = await backendGet('/gateway/get/minecraft_broadcast');
    if (res.result != undefined) {
      if (res.result.ok)
        return `${res.result.json.url}&passkey=${res.result.json.paras.passkey}`;
      else
        return null;
    }
  })();
  if (targetUrl){
    const res = await fetch(targetUrl, {
      method: 'GET',
    });
    if (res.ok){
      broadcastContent.value!.innerHTML=mcRender(await res.text(),"§");
      {//为动态插入的html附上父元素的data-v-，以确保其能使用局部css
        const scopeId = broadcastContent.value!.getAttributeNames().find(name => name.startsWith('data-v-'));
        broadcastContent.value!.querySelectorAll('*').forEach(el => el.setAttribute(scopeId!, ''));
      }
      broadcast.value!.style.display='';
    }
  }
});
</script>

<template>
  <div>
    <div ref="broadcast" id="broadcast" style="display:none;">
      <svg class="bi"><use xlink:href="#svg-bsi-megaphone-fill"></use></svg>
      <span ref="broadcastContent" id="broadcast-content"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
#broadcast{
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    height: 16px;
    width: 16px;
  }
  #broadcast-content{
    margin-left: 0.5rem;
    line-height: 1rem;
  }
}
</style>
<style scoped lang="css" src="~/minecraft-text/style.css"></style>