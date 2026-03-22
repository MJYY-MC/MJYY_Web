<script setup lang="ts">
import docLoader from "@/views/Document/ts/docLoader.ts";
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const meta = computed(() => ({
  doc:{
    doc_mdFileRelativePath: route.meta.doc_mdFileRelativePath as string|undefined,
  }
}));

const docMd:Ref<HTMLDivElement|null> = ref(null);
const {doLoad} = docLoader(docMd);

onMounted(()=>{
  if (meta.value.doc.doc_mdFileRelativePath)
    doLoad(meta.value.doc.doc_mdFileRelativePath);
});

watch(
    ()=>route.name,
    ()=>{
      if (meta.value.doc.doc_mdFileRelativePath)
        doLoad(meta.value.doc.doc_mdFileRelativePath);
    }
);
</script>

<template>
<div class="container container-full">
  <div class="row row-full">
    <div id="doc-list" class="col-3">
      <ul>
        <li class="parent">
          <span>test</span>
          <ul>
            <li>
              <router-link :to="{name:'doc_test'}">test</router-link>
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