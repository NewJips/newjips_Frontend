<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/boardApi';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const page = ref({});
const boards = ref([]);

const { t, locale } = useI18n();

const articles = computed(() => page.value.boardList);

const pageRequest = reactive({
  page: parseInt(route.query.page) || 1,
  amount: parseInt(route.query.amount) || 6,
  searchType: '',
  searchValue: '',
  lan:String(locale.value === 'ko' ? 'KR' : (locale.value === 'vn' ? 'VN' : '')),
});

const getLanValue = () => {
  // return locale.value === 'ko' ? 'KR' : (locale.value === 'vn' ? 'VN' : '');
  // return locale.value === 'ko' ? 'KR' : (locale.value === 'vn' ? 'VN' : '');

  return locale.value === 'ko' ? 'KR' : (locale.value === 'vn' ? 'VN' : '');

};

const handlePageChange = async (pageNum) => {
  console.log(pageNum);
  router.push({
    query: {
      page: pageNum,
      amount: pageRequest.amount,
      searchType: pageRequest.searchType,
      searchValue: pageRequest.searchValue,
      lan: pageRequest.lan, // locale에 따라 lan 값 설정
    },
  });
  
};

// pageRequest의 값 변경된 경우 호출
watch([route,locale], async ([newValue, newLocale]) => {
  console.log('WATCH', route.query.page);
  pageRequest.page = parseInt(route.query.page);
  pageRequest.searchType = route.query.searchType;
  pageRequest.searchValue = route.query.searchValue;
  pageRequest.amount = parseInt(route.query.amount);
  pageRequest.lan = String(route.query.lan || getLanValue());
  await load(pageRequest);
});

// // locale 값이 변경될 때마다 pageRequest.lan을 업데이트하고 데이터를 다시 로드
// watch(locale, async (newLocale) => {
//   console.log('Language changed:', newLocale);
//   pageRequest.lan = getLanValue(); // locale에 따른 lan 값 업데이트
//   await load(pageRequest); // 데이터 다시 로드
// });


const load = async (query) => {
  // const data = await api.getList(query);
  // page.value = data.pageInfo;
  // boards.value = data.boardList;
  page.value= await api.getList(query);
};

load(pageRequest);

</script>

<template>
  <div class="fluid-container">
    <div class="type-header">
      <!-- <h2>공지 사항</h2> -->
       <h2>{{t('common.noti.title')}}</h2>
      <!-- <div style="font-size: 17pt; margin-top: 8pt;">새로운 소식과 공지를 확인하세요!</div> -->
      <div style="font-size: 17pt; margin-top: 8pt;">{{t('common.noti.content')}}</div>
    </div>

    <div class="row row-cols-md-2 row-cols-1 px-5 mb-lg-5 mb-4 notice-content">

      <!-- 한국어 부분 -->
      <!-- <div v-if="locale === 'ko'" style="background-color: aliceblue;"> -->
        <article v-if="locale === 'ko'" class="col pb-3" v-for="article in articles.filter(a => a.lan === 'KR')">
          <router-link :to="`/board/detail/${article.nno}`" class="user-link">
          <a class="d-block position-relative mb-3" :href="`/board/${article.id}`">
            <img class="d-block rounded-3 article-image"
              :src="article.imageUrl || 'https://image.ajunews.com/content/image/2022/04/04/20220404181310254680.jpg'"
              alt="공지 이미지">
          </a>
          <!-- 날짜 표시 -->
          <a class="fs-sm text-uppercase text-decoration-none" href="#">{{ new Date(article.createdAt).toLocaleDateString() }}</a>
          <h3 class="h5 mb-2 pt-1">
            <a class="nav-link" :href="`/board/${article.id}`">{{ article.title }}</a>
          </h3>
          <p class="mb-3 text-truncate">{{ article.content }}</p>
        </router-link>
        </article>
      <!-- </div> -->

      <!-- 베트남어 부분 -->
      <!-- <div v-else-if="locale === 'vn'" style="background-color: brown;"> -->
        <article v-else-if="locale === 'vn'" class="col pb-3" v-for="article in articles.filter(a => a.lan === 'VN')">
          <router-link :to="`/board/detail/${article.nno}`" class="user-link">
          <a class="d-block position-relative mb-3" :href="`/board/${article.id}`">
            <img class="d-block rounded-3 article-image"
              :src="article.imageUrl || 'https://image.ajunews.com/content/image/2022/04/04/20220404181310254680.jpg'"
              alt="공지 이미지">
          </a>
          <!-- 날짜 표시 -->
          <a class="fs-sm text-uppercase text-decoration-none" href="#">{{ new Date(article.createdAt).toLocaleDateString() }}</a>
          <h3 class="h5 mb-2 pt-1">
            <a class="nav-link" :href="`/board/${article.id}`">{{ article.title }}</a>
          </h3>
          <p class="mb-3 text-truncate">{{ article.content }}</p>
        </router-link>
        </article>
      <!-- </div> -->
    </div>


    <!-- 페이지네이션 -->
    <div class="my-5 d-flex justify-content-center">
      <vue-awesome-paginate :total-items="page.totalCount" :items-per-page="pageRequest.amount" :max-pages-shown="5"
        :show-ending-buttons="true" v-model="pageRequest.page" @click="handlePageChange">
        <template #first-page-button><i class="fa-solid fa-backward-fast"></i></template>
        <template #prev-button><i class="fa-solid fa-caret-left"></i></template>
        <template #next-button><i class="fa-solid fa-caret-right"></i></template>
        <template #last-page-button><i class="fa-solid fa-forward-fast"></i></template>
      </vue-awesome-paginate>
    </div>
  </div>



</template>

<style scoped>
.type-header {
  background-color: #F5F6F7;
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 6vh;
}

.article-image {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 3px;
}

/* 공지사항과 게시글 사이에 간격 추가 */
.notice-content {
  margin-top: 30px;
  /* 공지사항과 게시글 사이에 30px 간격 */
}

article {
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 768px) {
  .article-image {
    height: 300px;
    /* 큰 화면에서 높이를 조금 더 늘림 */
    object-fit: cover;
  }
}

.text-truncate {
  width: 150px;
  /* 원하는 너비 설정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* ... 처리 */
}
.user-link {
  text-decoration: none;
  /* 링크 밑줄 제거 */
  color: #000;
  /* 기본 글자색 */
  display: block;
  /* 링크 영역을 블록으로 만들어 전체 클릭 가능하게 */
}
.user-link:hover {
  color: #007bff;
  /* background-color: #d0d0d0; */
}
</style>
