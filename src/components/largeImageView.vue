<script setup lang="ts">
import {imgError, imgLoaded} from "@/views/Home/ts/imgLoader.ts";
import {ref, type Ref} from "vue";

const isShow:Ref<boolean> = ref(false);
const imgSrc:Ref<string> = ref('');

function largeImageView_show(iSrc:string){
  imgSrc.value=iSrc;
  isShow.value=true;
}
function largeImageView_close(){
  isShow.value = false;
}

defineExpose({
  largeImageView_show,largeImageView_close
});
</script>

<template>
  <Transition name="fadeTran">
    <div id="largeImageView"
         v-show="isShow"
         @click="largeImageView_close()"
    >
      <div class="img-box">
        <div class="loader-animation"></div>
        <img alt="photo"
             @load="imgLoaded" @error="imgError"
             :src="imgSrc">
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
#largeImageView{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-box{
    width: 90%;
  }
}

.fadeTran-enter-active,
.fadeTran-leave-active {
  transition: opacity .2s ease;
}

.fadeTran-enter-from,
.fadeTran-leave-to {
  opacity: 0;
}
</style>
<style scoped lang="scss" src="@/views/Home/scss/imgLoader.scss"></style>