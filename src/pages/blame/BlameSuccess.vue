<template>
    <div class="container-fluid px-0" style="height: 85vh; background-color: #F5F6F7;">
      <div>
        <div class="row align-items-center">
          <div class="col-6 ps-5 text-start" style="font-size: xx-large;">
            <h2 class="ms-2">{{ t('common.blame.successT') }}</h2>
            <p v-html="t('common.blame.successD')" class="mt-4 ms-2 pb-4" style="letter-spacing: 2px; line-height: 1.8; font-size: 18pt;"></p>
            <div class="container-fluid d-flex mb-5 mt-4" style="gap: 15px;">
                <button class="button-box me-3" style="background-color: #344356; color: #FFFFFF;" @click="goBlameList()">{{ t('common.blame.goBlameList') }}</button>
                <button class="button-box" style="background-color: white;" @click="goBack()">{{ t('common.blame.goBack') }}</button>
            </div>
        
        </div>
          <div class="col-6 text-center pt-4">
            <img src="@/assets/images/Completed-bro.png" style="height: 80vh" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const router = useRouter();

const goBlameList = () => {
    router.push('/mypage/blame');
};

const goBack = () => {
    router.go(-2);
};

</script>

<style scoped>
.button-box {
    border-radius: 5pt;
    padding-top: 10pt;
    padding-bottom: 10pt;
    padding-left: 40pt;
    padding-right: 40pt;
    border: 0;
    font-size: 14pt;
}
</style>