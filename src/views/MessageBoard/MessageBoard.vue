<script setup lang="ts">
import {apiKey, baseUrl as beBaseUrl} from "@/ts/env/backend.ts";
import {isClient} from "@/ts/env/ssr.ts";

(async ()=>{
  console.log(beBaseUrl);
  if (beBaseUrl && isClient) {
    const res = await fetch(`${beBaseUrl}/gateway/mjyytest`,{
      method: 'POST',
      headers: {
        'X-API-Key':apiKey!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Password:"testpw"}),
    });
    if (res.ok) {
      console.log(res.json());
    }
    else if (res.status == 401){

    }
  }
})();
</script>

<template>
  <!--<iframe src=''
          style='width:100%;height:100vh;border:none'
          sandbox='allow-scripts allow-same-origin allow-forms'
  ></iframe>-->
</template>

<style scoped lang="scss">

</style>