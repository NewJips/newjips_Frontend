<template>
  <div style="background-color: #F5F6F7;">
    <div class="buddiz-banner" style="margin-top: 10px; margin-bottom: 30px;">
      <h1>버디즈</h1>
      <p>나에게 꼭 맞는 버디를 찾아보세요!</p>
    </div>
  </div>

  <section class="content">
    <div class="container">
      <div class="row">
        <!-- 왼쪽 배너: 선택된 버디즈 기본 정보 -->
        <div class="col-lg-3 me-lg-auto">
          <div class="card border-0 shadow mb-6 mb-lg-0">
            <div class="card-header bg-gray-100 py-4 border-0 text-center">
              <a class="d-inline-block" href="#">
                <img :src="buddiz.profilePic" alt="buddiz image" class="d-block avatar avatar-xxl p-2 mb-2"
                  style="width: 100px; height: 100px;">
              </a>
              <h5 class="fw-bold">{{ buddiz.name }}</h5>
              <p class="text-muted text-sm mb-0">{{ buddiz.location }}</p>
            </div>
            <div class="card-body p-4">
              <div class="test">
                <div class="icon-rounded icon-rounded-sm bg-primary-light flex-shrink-0 me-2" style="width: 150px;">
                  <img src="/src/assets/icons/roundstar.png" alt="star" style="width: 35px; height: 35px;">
                  <span style="margin-left: 13px; margin-top: 15px; display: inline; white-space: nowrap;">
                    <span style="margin-right: 5px;">{{ avg }}</span>
                    <span>({{ totalCount }})</span>
                  </span>
                </div>
              </div>

              <div class="test" style="margin-top: 20px;">
                <div class="icon-rounded icon-rounded-sm bg-primary-light flex-shrink-0 me-2" style="width: 250px;">
                  <img src="/src/assets/icons/roundmoney.png" alt="money" style="width: 35px; height: 35px;">
                  <span style="margin-left: 10px; margin-top: 15px;">
                    ₩{{ buddiz.cost }}
                  </span>
                </div>
              </div>
              <hr>
              <div class="card-text text-muted">
                <div class="text-block">
                  {{ buddiz.personality }}
                  <!-- 찜하기 상태에 따라 버튼 표시 -->
                  <form @submit.prevent="wishSubmit">
                    <div>
                    <button type="submit" class="badge2 badge-secondary-light2" style="width: 260px; font-size: 15px; border: none;">
                      <img src="/src/assets/icons/heart.png" alt="star" height="24px"> 버디즈 찜하기
                    </button>
                  </div>
                  </form>

                  <!-- <div v-if="!isLiked" @click="handleLikeBuddiz" class="badge2 badge-secondary-light2"
                    style="font-size: 15px;">
                    <img src="/src/assets/icons/heart.png" alt="star" height="24px"> 버디즈 찜하기
                  </div> -->
                  <!-- <div v-else @click="handleUnlikeBuddiz" class="badge2 badge-secondary-light2"
                    style="font-size: 15px;">
                    <img src="" alt="star"> 찜 해제
                  </div> -->
                  <div class="badge2 badge-secondary-light2" style="font-size: 15px;">
                    <img src="/src/assets/icons/chatIcon.png" alt="chat" height="20px"> 채팅하기
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 오른쪽 배너: 상세 정보와 리뷰 목록 -->
        <div class="col-lg-9 ps-lg-5">
          <!-- 닉네임 및 기타 정보 -->daa
          <h1 class="hero-heading mb-0 ">{{ buddiz.nickname }}</h1>
          <div class="text-block">
            <p>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">한국 자취 {{ buddiz.liveInKr }}년차</span>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">활동 {{ buddiz.hiredTimes }}회</span>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">
                <span v-if="buddiz.lan === 'KR'">한국어</span>
                <span v-else-if="buddiz.lan === 'VM'">Vietnamese</span>
              </span>
            </p>
          </div>
          <div class="text-block">
            <p>{{ buddiz.selfInfo }}</p>
          </div>
          <br>

          <!-- 리뷰 목록 -->
          <!-- <h5 class="mb-4">후기</h5> -->

          <!-- 리뷰 입력란 -->
          <!-- <div class="py-5">
            <button class="btn btn-outline-primary" type="button" @click="toggleReview">리뷰 남기기</button>
            <div v-show="isReviewVisible" class="mt-4">
              <h5 class="mb-4">리뷰 작성</h5>
              <form @submit.prevent="submit" class="form" id="contact-form">
                <div class="mb-4">
                  <label class="form-label" for="rating">평점</label>
                  <select class="form-select focus-shadow-0" v-model="article.rating" id="rating" required>
                    <option value="5">★★★★★ (5/5)</option>
                    <option value="4">★★★★☆ (4/5)</option>
                    <option value="3">★★★☆☆ (3/5)</option>
                    <option value="2">★★☆☆☆ (2/5)</option>
                    <option value="1">★☆☆☆☆ (1/5)</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="article">리뷰 내용</label>
                  <textarea class="form-control" v-model="article.reviewContent" rows="4" id="article"
                    placeholder="리뷰를 입력하세요" required></textarea>
                </div>
                <button class="btn btn-primary" type="submit" :disabled="disableSubmit">리뷰 등록</button>
              </form>
            </div>
          </div> -->

          <!-- 리뷰 목록 -->
          <div class="d-flex align-items-center justify-content-between mb-1">
            <h3 class="subtitle text-sm text-primary">버디즈 후기</h3>
            <button class="btn btn-outline-primary" type="button" @click="toggleReview">리뷰 남기기</button>
          </div>

          <!-- 리뷰 입력란 -->
          <div class="py-1">
            <div v-show="isReviewVisible" class="mt-4">
              <h5 class="mb-4">리뷰 작성</h5>
              <form @submit.prevent="submit" class="form" id="contact-form">
                <div class="mb-4">
                  <label class="form-label" for="rating">평점</label>
                  <select class="form-select focus-shadow-0" v-model="article.rating" id="rating" required>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★</option>
                    <option value="3">★★★</option>
                    <option value="2">★★</option>
                    <option value="1">★</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="article">리뷰 내용</label>
                  <textarea class="form-control" v-model="article.reviewContent" rows="4" id="article"
                    placeholder="리뷰를 입력하세요" required></textarea>
                </div>
                <button class="btn btn-primary" type="submit" :disabled="disableSubmit">리뷰 등록</button>
              </form>
            </div>
          </div>


          <div v-if="reviewList.length > 0">
            <div v-for="review in reviewList.slice(0, 4)" :key="review.id" class="d-flex d-block d-sm-flex review"
              style="padding: 15px 0 15px 0; border-bottom: 1.5px solid #ddd;">
              <div class="flex align-items-center text-md-center flex-shrink-0 me-2 ms-2 ms-xl-4 me-xl-4">
                <div class="text-md-center flex-shrink-0 me-4 me-xl-5">
                  <img :src="review.profilePic" alt="reviewer image" class="d-block avatar avatar-xxl p-2 mb-2"
                    style="width: 100px; height: 100px;">
                  <span class="text-uppercase text-muted text-sm">{{ new
                    Date(review.createdAt).toLocaleDateString()}}</span>
                </div>
              </div>
              <div>
                <h6 class="mt-2 mb-1">{{ review.reviewer }}</h6>
                <div class="mb-2">
                  <i v-for="star in review.rating" :key="star" class="fa fa-xs fa-star text-primary"></i>
                  <i v-for="emptyStar in 5 - review.rating" :key="emptyStar" class="fa fa-xs fa-star text-gray-200"></i>
                </div>
                <p class="text-muted text-sm">{{ review.reviewContent }}</p>
              </div>
            </div>
          </div>




          <!-- <form @submit.prevent="submit">

            <div class="mb-3 mt-3 row">
              <div class="col-8">
                <label for="title" class="form-label"> 제목 </label>
                <input type="text" class="form-control" placeholder="제목" id="title" v-model="article.title" />
              </div>
            </div>

            <div class="mb-3 mt-3">
              <label for="content" class="form-label"> 내용 </label>
              <textarea class="form-control" placeholder="내용" id="content" v-model="article.content" rows="10"></textarea>
            </div>

            <div class="my-5 text-center">
              <button type="submit" class="btn btn-primary me-3" :disabled="disableSubmit">
                <i class="fa-solid fa-check"></i>
                확인
              </button>

            </div>
            
          </form> -->



        </div>
        <!-- 오른쪽 배너 끝 -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/buddizApi';
import { computed, reactive, ref } from 'vue';
import buddizApi from '@/api/buddizApi';
// import { useAuthStore } from '@/stores/auth';

// const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const uno = route.params.uno;
const buddiz = ref({});

const reviewList = ref([]);
const totalCount = ref(0);
const avg=ref(0);

const article = reactive({
  // writer: auth.id,
  rating: '',
  reviewContent: '',
});

const disableSubmit = computed(() => !article.rating || !article.reviewContent);

const submit = async () => {
  if (!confirm('등록할까요?')) return;

  console.log('Route params uno:', route.params.uno);
  console.log(article.reviewContent);
  console.log(article.rating);
  await buddizApi.create(article, uno);
  alert('리뷰가 등록되었습니다!');
  load();
};

const wishSubmit=async()=>{
  console.log(uno);
  await buddizApi.reviewWish(uno);
}


// const load = async () => {
//   try {
//     buddiz.value = await api.get(uno);
//     reviewList.value = await api.getReview(uno);
//     console.log('DETAIL', buddiz.value);
//   } catch (error) {
//     console.error('Failed to load data:', error);
//   }
// };

const load = async () => {
  try {
    buddiz.value = await api.get(uno);
    // reviewList.value = await api.getReview(uno).then(response => response.reviewList || []);
    // totalCount.value = await api.getReview(uno).totalCount;
    const response = await api.getReview(uno);  // API 호출
    reviewList.value = response.reviewList || [];  // 리뷰 리스트 저장
    totalCount.value = response.totalCount;  // totalCount 저장
    avg.value=response.avg;
    console.log('DETAIL', buddiz.value);
    console.log('REVIEWS', reviewList.value);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};

// 리뷰 보이기 상태 관리
const isReviewVisible = ref(false);  // 초기 상태

const toggleReview = () => {
  isReviewVisible.value = !isReviewVisible.value;  // 상태 토글
};

load();

</script>




<style scoped>
.buddiz-banner {
  max-width: 1300px;
  margin: 0 auto;
}

.box {
  display: flex;
  /* 한 줄에 배치 */
  gap: 10px;
  /* 상자 간 간격 */
  justify-content: flex-start;
  /* 좌측 정렬 */
  align-items: center;
  /* 세로 가운데 정렬 */
  flex-wrap: wrap;
  /* 필요할 경우 줄바꿈 허용 */
}

.rounded-box {

  /* align-items: center; 수직 가운데 정렬 */
  /* justify-content: center; 수평 가운데 정렬 */
  /* white-space: nowrap; 텍스트 줄바꿈 방지 */
  /* font-size: 1em; 텍스트 크기 */
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 5px 5px 0px 10px;
  display: flex;
  flex-direction: column;
}

.badge {
  --bs-badge-padding-x: 0.7em;
  --bs-badge-padding-y: 0.5em;
  --bs-badge-font-size: 0.75em;
  --bs-badge-font-weight: 700;
  --bs-badge-color: #fff;
  --bs-badge-border-radius: 0.4rem;
  display: inline-block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: var(--bs-badge-color);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
}

.badge-secondary-light {
  color: #e83e8c;
  background-color: #fce2ee;
}

.badge2 {
  --bs-badge-padding-x: 0.7em;
  --bs-badge-padding-y: 0.5em;
  --bs-badge-font-size: 0.75em;
  --bs-badge-font-weight: 700;
  --bs-badge-color: #fff;
  --bs-badge-border-radius: 0.4rem;
  display: block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: var(--bs-badge-color);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
  margin-bottom: 10px;
}

.badge-secondary-light2 {
  color: #616B79;
  background-color: #F5F6F7;
}

.content {
  margin-bottom: 100px;
}
</style>