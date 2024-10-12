<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import api from '@/api/boardApi';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

const nno = route.params.nno;  // URL에서 공지 ID를 가져옴
const article = ref({});

const load = async () => {
  article.value = await api.get(nno);
  console.log(nno);
};

load();

// 공지사항 찾기

</script>

<template>

    <div class="notice-header">
      <!-- <h2>공지 사항</h2> -->
      <h2>{{t('common.noti.title')}}</h2>
      <!-- <div class="form-label" style="font-size: 17pt; margin-top: 8pt;">새로운 소식과 공지를 확인하세요!</div> -->
      <div style="font-size: 17pt; margin-top: 8pt;">{{t('common.noti.content')}}</div>
    </div>


  <div class="container mt-5 mb-md-4 py-5">
    <!-- 공지 제목과 메타 정보 -->
    <h1 class="h2 mb-4">{{ article.title }}</h1>
    <div class="mb-4 pb-1">
      <ul class="list-unstyled d-flex flex-wrap mb-0 text-nowrap">
        <li class="me-3"><i class="fi-calendar-alt me-2 mt-n1 opacity-60"></i>{{new Date(article.createdAt).toLocaleDateString()}}</li>
      </ul>
    </div>
    <!-- 공지 내용 -->
    <div class="mb-4 pb-md-3"><img class="rounded-3" src="https://image.ajunews.com/content/image/2022/04/04/20220404181310254680.jpg" alt="Post image"></div>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <h6>{{ article.content }}</h6>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notice-header-wrapper {
  background-color: #F5F6F7;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 40px;
}
.notice-header{
  background-color: #F5F6F7;
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 6vh;
}
</style>
