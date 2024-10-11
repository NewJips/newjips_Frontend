<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/boardApi';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const page = ref({});
const boards = ref([]);

const { locale } = useI18n();

const articles = computed(() => page.value.boardList);

const pageRequest = reactive({
  page: parseInt(route.query.page) || 1,
  amount: parseInt(route.query.amount) || 6,
  searchType: '',
  searchValue: '',
});

const handlePageChange = async (pageNum) => {
  console.log(pageNum);
  router.push({
    query: {
      page: pageNum,
      amount: pageRequest.amount,
      searchType: pageRequest.searchType,
      searchValue: pageRequest.searchValue,
    },
  });
};

// pageRequest의 값 변경된 경우 호출
watch(route, async (newValue) => {
  console.log('WATCH', route.query.page);
  pageRequest.page = parseInt(route.query.page);
  pageRequest.searchType = route.query.searchType;
  pageRequest.searchValue = route.query.searchValue;
  pageRequest.amount = parseInt(route.query.amount);
  await load(pageRequest);
});


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
      <h2>공지 사항</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">새로운 소식과 공지를 확인하세요!</div>
    </div>

    <div class="row row-cols-md-2 row-cols-1 px-5 mb-lg-5 mb-4 notice-content">

      <!-- 한국어 부분 -->
      <span v-if="locale === 'ko'">
        <article class="col pb-3" v-for="article in articles.filter(a => a.lan === 'KR')" :key="article.id">
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
        </article>
      </span>

      <!-- 베트남어 부분 -->
      <span v-else-if="locale === 'vn'">
        <article class="col pb-3" v-for="article in articles.filter(a => a.lan === 'VN')" :key="article.id">
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
        </article>
      </span>
    </div>


    <!-- <tr v-for="article in articles" :key="article.bno">
          <td>{{ article.bno }}</td>
          <td>{{ page.boardCategory.filter((value)=>{
                    if(value.type == article.type){
                      return article.type
                    }
                 })[0].name }}</td>
          <td>
            <router-link :to="{ name: 'board/detail', params: { no: article.bno }, query: route.query }"> {{
              article.title }} </router-link>
          </td>
          <td>{{ article.memberName }}({{ article.memberId }})</td>
          <td>{{ moment(article.regDate).format('YYYY-MM-DD') }}</td>
          <td>{{ article.readCount }}</td>
        </tr> -->



    <!-- <div v-for="board in boards" class="buddiz-item under-line">
          <router-link :to="`/buddiz/userDetail/${buddiz.uno}`"
            class="user-link">
            <img :src="buddiz.profilePic" alt="buddiz image" class="buddiz-image" />
            <div style="margin-top: 10px;">
              <h3 style="font-size: 25px; font-weight: bold; margin-bottom: 5px;">{{ buddiz.name }}</h3>
              <div style="font-size: 1em; margin: 5px;">
                <p style="margin-bottom: 5px;"><img src="/src/assets/icons/starIcon.png" alt="star"
                    style="height: 18px; width: 18px;"> {{ Number.isInteger(buddiz.avg) ? buddiz.avg : buddiz.avg.toFixed(2) }}</p>
                    <p style="margin-bottom: 5px;">한국 자취 {{ buddiz.liveInKr }}년차</p>
                <p style="margin-bottom: 5px;">{{ buddiz.personality }}</p>
              </div>
            </div>
          </router-link>
        </div> -->




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
</style>
