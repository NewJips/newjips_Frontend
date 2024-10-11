<template>
  <div class="fluid-container">
    <FloatingAi/>
    <div class="type-header">
      <h2>{{ t('common.budi.title') }}</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">{{ t('common.budi.content') }}</div>
    </div>

    <div class="buddiz-search">
      <!-- 필터와 목록을 가로로 정렬 -->
      <div class="content">
        <div class="filter-section">
          <p>{{ t('common.budi.searchNm') }}</p>
          <div class="search-bar">
            <input v-model="pageRequest.searchValue" v-on:keyup.enter="load(pageRequest)" type="text"
              class="search-input" :placeholder="t('common.budi.searchPH')">
            <button @click="load(pageRequest)" class="search-button"><i class="fa fa-search"></i></button>
            <!-- 검색 버튼 -->
          </div>
          <hr style="width:240px; border-bottom: 1.5px solid #ddd;">

          <div class="filter-options">
            <p>{{ t('common.budi.searchFilter') }}</p>
            <div class="filter-buttons">
              <button :class="{ 'active': pageRequest.searchType === 'F' }" @click="toggleSearchType('F')"
                class="filter-select">
                {{ t('common.budi.sortf') }}
              </button>
              <button :class="{ 'active': pageRequest.searchType === 'M' }" @click="toggleSearchType('M')"
                class="filter-select">
                {{ t('common.budi.sortm') }}
              </button>
            </div>
          </div>

          <hr style="width:240px; border-bottom: 1.5px solid #ddd;">


          <div class="sort-options">
            <p>{{ t('common.budi.searchSort') }}</p>
            <button :class="{ 'active': pageRequest.sort === 'rating' }" @click="changeSort('별점순')"
              class="filter-select">{{ t('common.budi.sortStar') }}</button>
            <button :class="{ 'active': pageRequest.sort === 'cost' }" @click="changeSort('가격순')"
              class="filter-select">{{ t('common.budi.sortPrice') }}</button>
          </div>
          <div class="filter-buttons">
            <button :class="{ 'active': pageRequest.sort === 'reviewcnt' }" @click="changeSort('리뷰 많은 순')"
              class="filter-select" style="width: 235px;">{{ t('common.budi.sortReview') }}</button>
          </div>
        </div>

     

      <!-- 버디즈 목록 -->
      <div class="buddiz-list">
        <div v-for="buddiz in Buddizs" :key="buddiz.uno" class="buddiz-item under-line">
          <router-link :to="`/buddiz/userDetail/${buddiz.uno}`"
            class="user-link">
            <img :src="buddiz.profilePic" alt="buddiz image" class="buddiz-image" />
            <div style="margin-top: 10px;">
              <h3 style="font-size: 25px; font-weight: bold; margin-bottom: 5px;">{{ buddiz.name }}</h3>
              <div style="font-size: 1em; margin: 5px;">
                <p style="margin-bottom: 5px;"><img src="/src/assets/icons/starIcon.png" alt="star"
                    style="height: 18px; width: 18px;"> {{ Number.isInteger(buddiz.avg) ? buddiz.avg : buddiz.avg.toFixed(2) }}</p>
                    <p style="margin-bottom: 5px;">{{ t('common.budi.lived') }} {{ buddiz.liveInKr }}{{ t('common.budi.years') }}</p>
                <p style="margin-bottom: 5px;">{{ buddiz.personality }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

    </div>


        <!-- 페이지네이션 -->
        <div class="my-5 d-flex justify-content-center">
          <!-- 페이지 네이션 -->
          <vue-awesome-paginate :total-items="page.totalCount" :items-per-page="pageRequest.amount" :max-pages-shown="5"
            :show-ending-buttons="true" v-model="pageRequest.page" @click="handlePageChange">
            <template #first-page-button><i class="fa-solid fa-backward-fast"></i></template>
            <template #prev-button><i class="fa-solid fa-caret-left"></i></template>
            <template #next-button><i class="fa-solid fa-caret-right"></i></template>
            <template #last-page-button><i class="fa-solid fa-forward-fast"></i></template>
          </vue-awesome-paginate>
        </div>
      </div>
    </div>

</template>

<script setup>
import api from '@/api/buddizApi';
import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import FloatingAi from '@/components/FloatingAi.vue';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const Buddizs = ref([]);

const page = ref({});
// const types = ref([]);

const articles = computed(() => page.value.buddizList);

const pageRequest = reactive({
  page: parseInt(route.query.page) || 1,
  amount: parseInt(route.query.amount) || 10,
  searchType: '',
  searchValue: '',
  sort: 'rating',  // 기본 정렬을 별점 내림차순으로 설정
});

const changeSort = (sortOption) => {
  switch (sortOption) {
    case '별점순':
      pageRequest.sort = 'rating';
      break;
    case '가격순':
      pageRequest.sort = 'cost';
      break;
    case '리뷰 많은 순':
      pageRequest.sort = 'reviewcnt';
      break;
  }
  handlePageChange(1); // 정렬 변경 후 1페이지로 이동
};

// console.log('QUERY', cr.query);
// console.log('PAGE REQUEST', pageRequest);

// 페이지네이션 페이지 변경
const handlePageChange = async (pageNum) => {
  console.log('CLICK,,,,');
  // url 변경 --> query 파트만 변경되므로 컴포넌트가 다시 마운트되지 않음
  // watch를 통해 cr이 변경됨을 감지하여 페이지 로드해야 함
  router.push({
    query: {
      page: pageNum,
      amount: pageRequest.amount,
      searchType: pageRequest.searchType,
      sort: pageRequest.sort,  // 쿼리에 정렬 상태 반영
      searchValue: pageRequest.searchValue,
    },
  });
};

// pageRequest의 값 변경된 경우 호출
watch(route, async (newValue) => {
  console.log('WATCH', route.query.page);
  pageRequest.page = parseInt(route.query.page) || 1;
  pageRequest.searchType = route.query.searchType || '';
  pageRequest.searchValue = route.query.searchValue || '';
  pageRequest.amount = parseInt(route.query.amount) || 10;
  await load(pageRequest);
});
const load = async (query) => {
  try {
    const data = await api.getList(query);
    page.value = data.pageInfo;
    Buddizs.value = data.buddizList;
 
    console.log("vue-buddiz", Buddizs.value);
    if (Buddizs.value.length === 0) {
      console.warn("No results found for query:", query);
    }
  } catch (error) {
    console.error("Error loading Buddizs:", error);
  }
};

load(pageRequest);


const typeChange = (evant) => {
  alert(evant.target.checked)
}

// 성별 필터 토글 함수
const toggleSearchType = (type) => {
  // 선택된 값과 클릭된 버튼의 값이 같으면, 이미 선택된 상태이므로 해제
  if (pageRequest.searchType === type) {
    pageRequest.searchType = '';
  } else {
    // 선택되지 않은 값을 클릭하면 해당 값을 설정
    pageRequest.searchType = type;
  }

  // 필터 변경 후 페이지 다시 로드, 항상 1페이지부터 시작
  handlePageChange(1);
};


</script>



<style scoped>
.type-header {
  background-color: #F5F6F7;
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 6vh;
}

.buddiz-search {
  padding: 20px;
}

/* 필터와 목록을 가로로 배치 */
.content {
  display: flex;
}

.filter-section {
  width: 300px;
  margin-right: 5px;
}

.filter-select {
  margin: 5px;
  border-radius: 10px;
  background-color: #F5F6F7;

}

.buddiz-list {
  flex-grow: 1;
}

.buddiz-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  /* 여백 추가 */
  border-bottom: 1.5px solid #ddd;
  /* 각 항목 아래 밑줄 추가 */
}

.underline {
  width: 50%;
  /* 밑줄의 길이 조정 */
  border-bottom: 1px solid #ddd;
  /* 밑줄 추가 */
} 

.buddiz-image {
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
}

.buddiz-search {
  /* padding: 20px; */
  max-width: 1024px;
  /* 원하는 최대 너비 설정 */
  margin: 0 auto;
  /* 페이지를 가운데 정렬하고 양옆에 간격을 줌 */
}


.search-bar {
  display: flex;
  /* 가로로 정렬 */
  max-width: 240px;
}

.search-input {
  flex-grow: 1;
  /* 입력란이 가능한 공간을 차지하도록 */
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  /* 버튼과 연결되는 부분의 모서리 라운드 처리 */
  background-color: #F5F6F7;
  max-width: 180px;
  border-radius: 10px 0 0 10px;
}

.search-button {
  background-color: #F5F6F7;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 0 5px 5px 0;
  /* 버튼과 연결되는 부분의 모서리 라운드 처리 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 60px;
  border-radius: 0 10px 10px 0;
}

.search-button:hover {
  background-color: #d0d0d0;
}

.filter-bottons {
  width: 240px;
}

button {
  width: 112.5px;
  background-color: #e0e0e0;
  color: black;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.active {
  background-color: #2c3e50;
  color: white;
}

button:hover {
  background-color: #d0d0d0;
}

.pagination {
  margin-top: 20px;
}

.user-link {
  text-decoration: none;
  /* 링크 밑줄 제거 */
  color: #000;
  /* 기본 글자색 */
  display: block;
  /* 링크 영역을 블록으로 만들어 전체 클릭 가능하게 */
  transition: color 0.3s;
  /* 색상 전환 효과 */
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.user-link:hover {
  color: #007bff;
  /* 호버 시 링크 색상 변경 */
}

.active-link {
  font-weight: bold;
  /* 현재 활성 링크 강조 */
}

.filter-buttons {
  color: #F5F6F7;
}
</style>