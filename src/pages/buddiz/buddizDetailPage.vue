<template>
  <div class="fluid-container">
    <div class="type-header mb-4">
      <h2>{{ t('common.budi.title') }}</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">{{ t('common.budi.content') }}</div>
    </div>

    <section class="content">
      <div class="container">
        <div class="row">
          <!-- 왼쪽 배너: 선택된 버디즈 기본 정보 -->
          <div class="col-lg-3 me-lg-auto">
            <div class="card border-0 shadow mb-6 mb-lg-0">
              <div class="card-header bg-gray-100 py-4 border-0 text-center">
                <a class="d-inline-block" href="#">
                  <img :src="buddiz.profilePic" alt="buddiz image" class="d-block avatar avatar-xxl p-1 mb-2"
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
                      <span style="margin-right: 5px;">{{ avg === 0 ? 0 : avg.toFixed(2) }}</span>
                      <span>({{ totalCount }})</span>
                    </span>
                  </div>
                </div>

                <div class="test" style="margin-top: 20px;">
                  <div class="icon-rounded icon-rounded-sm bg-primary-light flex-shrink-0 me-2" style="width: 250px;">
                    <img src="/src/assets/icons/roundmoney.png" alt="money" style="width: 35px; height: 35px;">
                    <span style="margin-left: 10px; margin-top: 15px;">
                      ₩ {{ buddiz.cost.toLocaleString() }}
                    </span>
                  </div>
                </div>
                <hr>
                <div class="card-text text-muted">
                  <div class="text-block">
                    {{ buddiz.personality }}
                    <!-- 찜하기 상태에 따라 버튼 표시 -->
                    <form @submit.prevent="wishSubmit" class="mt-3">
                      <div>
                        <button 
                          type="submit" 
                          class="badge2" 
                          :class="{ 'badge-secondary-light2': !isLiked, 'active': isLiked }" 
                          style="width: 260px; font-size: 15px; border: none;">
                          <img :src="isLiked ? '/src/assets/icons/heart.png' : '/src/assets/icons/heart.png'" alt="heart" height="24px" class="me-2"> 
                          {{ isLiked ? t('common.budi.pick') : t('common.budi.pick') }}
                        </button>
                      </div>
                    </form>

                    <form @submit.prevent="makeChating">
                      <div>
                        <button type="submit" class="badge2 badge-secondary-light2" style="width: 260px; font-size: 15px; border: none;">
                          <img src="/src/assets/icons/chatIcon.png" alt="star" height="20px" class="me-2"> 
                          {{ t('common.makeChat') }}
                        </button>
                      </div>
                    </form>
                    
                    <!-- 신고하기 -->
                    <form @submit.prevent="goBlame" class="pt-2">
                      <button type="submit" style="color: #616B79; text-align: center; width: 260px; font-size: 15px; background: none; border: none; cursor: pointer;">
                          {{ t('common.blame.blame') }}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 오른쪽 배너: 상세 정보와 리뷰 목록 -->
          <div class="col-lg-9 ps-lg-5 mt-2">
            <!-- 닉네임 및 기타 정보 -->
            <h1 class="hero-heading mb-0 ">{{ buddiz.nickname }}</h1>
            <div class="text-block">
              <p>
                <span style="margin-right: 7px;" class="badge badge-secondary-light">{{ t('common.budi.lived') }} {{ buddiz.liveInKr }}{{ t('common.budi.years') }}</span>
                <span style="margin-right: 7px;" class="badge badge-secondary-light">{{ t('common.budi.active') }} {{ buddiz.hiredTimes }}{{ t('common.budi.count') }}</span>
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
            <div class="d-flex align-items-center justify-content-between mb-1">
              <h3 class="subtitle text-sm text-primary">{{ t('common.budi.review') }}</h3>
              <button class="btn btn-outline-primary" type="button" @click="toggleReview">{{ t('common.budi.writeReview') }}</button>
            </div>

            <!-- 리뷰 입력란 -->
            <div class="py-1">
              <div v-show="isReviewVisible" class="mt-4">
                <h5 class="mb-4">{{ t('common.budi.writeReview') }}</h5>
                <form @submit.prevent="submit" class="form" id="contact-form">
                  <div class="mb-4">
                    <label class="form-label" for="rating">{{ t('common.budi.star') }}</label>
                    <select class="form-select focus-shadow-0" v-model="article.rating" id="rating" required>
                      <option value="5">★★★★★</option>
                      <option value="4">★★★★</option>
                      <option value="3">★★★</option>
                      <option value="2">★★</option>
                      <option value="1">★</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="article">{{ t('common.budi.reviewContent') }}</label>
                    <textarea class="form-control" v-model="article.reviewContent" rows="4" id="article"
                      :placeholder="t('common.budi.reviewPH')" required></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit" :disabled="disableSubmit">{{ t('common.budi.confirm') }}</button>
                </form>
              </div>
            </div>

            <div v-if="reviewList.length > 0">
              <div v-for="review in reviewList.slice(0, 10)" :key="review.id" class="d-flex d-block d-sm-flex review"
                style="padding: 15px 0 15px 0; border-bottom: 1.5px solid #ddd;">
                <div class="flex align-items-center text-md-center flex-shrink-0 me-2 ms-2 ms-xl-4 me-xl-4">
                  <div class="text-md-center flex-shrink-0 me-4 me-xl-5">
                    <img :src="review.profilePic" alt="reviewer image" class="d-block avatar avatar-xxl p-1 mb-2"
                      style="width: 100px; height: 100px;">
                    <span class="text-uppercase text-muted text-sm">
                      {{ new Date(review.createdAt).toLocaleDateString()}}</span>
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
            <!-- 오른쪽 배너 끝 -->
          </div>
        </div>
      </div>
    </section>  
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/buddizApi';
import chatApi from '@/api/chatApi';
import { computed, reactive, ref } from 'vue';
import buddizApi from '@/api/buddizApi';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { useBlameStore } from '@/stores/blame';

const { t, locale } = useI18n();
const auth = useAuthStore();
const blameStore = useBlameStore();

const route = useRoute();
const router = useRouter();

const uno = route.params.uno;
const buddiz = ref({});
const isLiked = ref(false);  // Manage like state

const reviewList = ref([]);
const totalCount = ref(0);
const avg=ref(0);

const article = reactive({
  rating: '',
  reviewContent: '',
});

const disableSubmit = computed(() => !article.rating || !article.reviewContent);

const submit = async () => {
  if (!confirm('등록할까요?')) return;

  await buddizApi.create(article, uno);
  alert('리뷰가 등록되었습니다!');
  load();
};

const wishSubmit = async () => {
  try {
    await buddizApi.reviewWish(uno);
    isLiked.value = !isLiked.value;  // Toggle the like state
  } catch (error) {
    console.error('Error submitting wish:', error);
  }
};

const makeChating = async () => {
  try {
    const result = await chatApi.createRoom(auth.uno, uno);
    if (result != null) {
      router.replace('/chat');
    }
  } catch(e) {
    console.error('Failed to load data:', e);
  }
};

const goBlame = () => {
  blameStore.blamedId = uno;
  blameStore.buddizProfile = buddiz.value.profilePic;
  blameStore.buddizNM = buddiz.value.nickname;
  blameStore.buddizid = buddiz.value.name;
  router.replace('/blame/buddiz');
};

const load = async () => {
  try {
    buddiz.value = await api.get(uno);
    const response = await api.getReview(uno);  // API 호출
    reviewList.value = response.reviewList || [];  // 리뷰 리스트 저장
    totalCount.value = response.totalCount;  // totalCount 저장
    avg.value = response.avg;
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};

// 리뷰 보이기 상태 관리
const isReviewVisible = ref(false);

const toggleReview = () => {
  isReviewVisible.value = !isReviewVisible.value;  // 상태 토글
};

load();

</script>

<style scoped>
.type-header {
  background-color: #F5F6F7;
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 6vh;
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

.badge2.active {
  background-color: #ff8f17;
  color: white;
}

.content {
  margin-bottom: 100px;
}
</style>
