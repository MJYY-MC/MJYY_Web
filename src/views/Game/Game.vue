<script setup lang="ts">
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_Game";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});
</script>

<template>
<div class="container">
  <div class="row mt-4">
    <div class="col-12 text-center">
      <h2>{{t(`${lp}.body.title`)}}</h2>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-6">
      <router-link class="card card-a" :to="{ name: 'game_defender'}">
        <div class="card-body text-center">
          {{t(`${lp}.game.defender`)}}
        </div>
      </router-link>
    </div>
    <div class="col-6">
      <router-link class="card card-a" :to="{ name: 'game_fiar'}">
        <div class="card-body text-center">
          {{t(`${lp}.game.fiar`)}}
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.card-a{
  text-decoration: none;
}
</style>