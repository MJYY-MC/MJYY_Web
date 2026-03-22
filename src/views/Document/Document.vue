<script setup lang="ts">
import docLoader from "@/views/Document/ts/docLoader.ts";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";
import {autoUseI18n} from "@/utils/i18nUtils.ts";
import {autoLoadLocale} from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_Document";
const {isReady:localeIsReady} = autoLoadLocale(lp,()=>{
  if (route.name!='document')
    useTitle(t(`${lp}.${route.name as string}.titleHead`)+t(`${lp}.title`));
  else
    useTitle(t(`${lp}.title`));
});

const route = useRoute();
const meta = computed(() => ({
  doc:{
    doc_mdFileRelativePath: route.meta.doc_mdFileRelativePath as string|undefined,
  }
}));

const docMd:Ref<HTMLDivElement|null> = ref(null);
const {doLoad} = docLoader(docMd);

const curRouteName:Ref<string|undefined>=ref(undefined);
function routeName_onChange(){
  if (meta.value.doc.doc_mdFileRelativePath)
    doLoad(meta.value.doc.doc_mdFileRelativePath);

  curRouteName.value=route.name as string|undefined;
}

onMounted(()=>{
  routeName_onChange();
});

watch(
    ()=>route.name,
    ()=>{routeName_onChange();}
);
</script>

<template>
<div id="document" class="container container-full">
  <div class="row row-full">
    <div id="doc-list" class="col-3">
      <ul class="unSelectable">
        <li class="parent">
          <span>test</span>
          <ul>
            <li>
              <router-link :to="{name:'docs_test'}"
                           :class="{'active':(curRouteName=='docs_test')}"
              >test</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="doc-content" class="col-9">
      <div ref="docMd" id="docMd"></div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/Document.scss"></style>
<style scoped lang="scss" src="@/assets/scss/color/view/Document.scss"></style>
<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>