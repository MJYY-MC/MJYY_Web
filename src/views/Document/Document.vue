<script setup lang="ts">
import docLoader from "@/views/Document/ts/docLoader.ts";
import {computed, onMounted, onUnmounted, ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";
import {autoUseI18n, localeEvents} from "@/utils/i18nUtils.ts";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";
import {useTitle} from "@vueuse/core";

const {gt:t}=autoUseI18n();
const lp:string="view_Document";
function titleSet(){
  if (route.name!='document')
    useTitle(t(`${lp}.${route.name as string}`)+t(`${lp}.title`));
  else
    useTitle(t(`${lp}.title`));
}
const {isReady:localeIsReady} = autoLoadLocale(lp,()=>{
  titleSet();
});
function handle_afterLocaleChange(){
  if (meta.value.doc.doc_mdFileRelativePath)
    doLoad(meta.value.doc.doc_mdFileRelativePath);
}

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

  if (localeIsReady)
    titleSet();
}

onMounted(()=>{
  routeName_onChange();

  localeEvents.on('afterLocaleChange',handle_afterLocaleChange);
});
onUnmounted(()=>{
  localeEvents.off('afterLocaleChange',handle_afterLocaleChange);
});

watch(
    ()=>route.name,
    ()=>{routeName_onChange();}
);
</script>

<template>
<div id="document" class="container container-full">
  <div class="row row-full">
    <div id="doc-list" class="col-3 col-xl-2">
      <ul class="unSelectable">
        <!--<li class="parent">
          <span>{{t(`${lp}.listParent.test`)}}</span>
          <ul>
            <li>
              <router-link :to="{name:'docs_test'}"
                           :class="{'active':(curRouteName=='docs_test')}"
              >{{t(`${lp}.docs_test`)}}</router-link>
            </li>
          </ul>
        </li>-->
        <li class="parent"
            v-for="(data,index) in [
                                     {
                                       key: 'faq',
                                       sub:[
                                         {
                                           name: 'docs_faq',
                                         }  ,
                                       ],
                                     },
                                     {
                                       key:'join',
                                       sub:[
                                         {
                                           name: 'docs_game',
                                         },
                                         {
                                           name: 'docs_access',
                                         },
                                       ],
                                     },
                                     {
                                       key: 'ingame',
                                       sub:[
                                           {
                                             name: 'docs_menu',
                                           },
                                       ],
                                     },
                                     {
                                       key:'world',
                                       sub:[
                                           {
                                             name: 'docs_world',
                                           },
                                           {
                                             name: 'docs_overworld',
                                           },
                                           {
                                             name: 'docs_freeWorld',
                                           },
                                           {
                                             name: 'docs_landOfChaos',
                                           },
                                           {
                                             name: 'docs_backroom',
                                           },
                                           {
                                             name: 'docs_funWorld',
                                           },
                                       ],
                                     },
                                   ]"
            :key="index"
        >
          <span>{{t(`${lp}.listParent.${data.key}`)}}</span>
          <ul>
            <li v-for="(subdata,subindex) in data.sub"
                :key="subindex"
            >
              <router-link :to="{name:subdata.name}"
                           :class="{'active':(curRouteName==subdata.name)}"
              >{{t(`${lp}.${subdata.name}`)}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="doc-content" class="col-9 col-xl-10">
      <div ref="docMd" id="docMd"></div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss" src="./scss/Document.scss"></style>
<style scoped lang="scss" src="@/assets/scss/color/view/Document.scss"></style>
<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>