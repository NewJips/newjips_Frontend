<script setup>
import { ref, computed, onMounted } from 'vue';
import SideBar from '@/components/layouts/SideBar.vue';
import { useAuthStore } from '@/stores/auth';
import wishApi from '@/api/wishApi';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const auth = useAuthStore();
const uno = computed(() => auth.uno);
console.log(auth.uno);

// 매물 데이터를 슬라이드로 표시하기 위한 상태 관리
const currentSlide = ref(0);
const currentBuddySlide = ref(0);

const wish_buddiz = ref([]);
// 버디즈 데이터 가져오기
async function fetchBlameBuddiz() {
  try {
    const data = await wishApi.getwishbuddiz(uno.value); // API 호출하여 버디즈 데이터 가져오기
    console.log(uno.value);
    wish_buddiz.value = data; // 가져온 데이터 할당
    console.log('가져온 버디즈 데이터: ', wish_buddiz.value);
  } catch (e) {
    console.error('버디즈 데이터를 가져오지 못했습니다.', e);
  }
}

const wish_buildings = ref([]);
// 매물 데이터 가져오기
async function fetchBlameBuildings() {
  try {
    const data = await wishApi.getwishestate(uno.value); // API 호출하여 신고 데이터 가져오기
    wish_buildings.value = data; // 가져온 데이터 할당
    console.log('가져온 매물 데이터: ', wish_buildings.value);
  } catch (e) {
    console.error('매물 데이터를 가져오지 못했습니다.', e);
  }
}

// 컴포넌트 마운트 시 데이터 가져오기
onMounted(() => {
  fetchBlameBuddiz();
  fetchBlameBuildings();
});

// 슬라이드에 표시될 매물 계산
const displayedGuides = computed(() => {
  // 슬라이드에서 시작 인덱스(currentSlide)에서 4개의 매물을 보여줌
  return wish_buildings.value.slice(currentSlide.value, currentSlide.value + 4);
});

// 다음 슬라이드로 이동 (총 매물 개수에 맞춰 순환)
const nextSlide = () => {
  if (currentSlide.value + 4 >= wish_buildings.value.length) {
    currentSlide.value = 0;
  } else {
    currentSlide.value += 1;
  }
};

// 이전 슬라이드로 이동 (총 매물 개수에 맞춰 순환)
const prevSlide = () => {
  if (currentSlide.value === 0) {
    currentSlide.value = wish_buildings.value.length - 4;
  } else {
    currentSlide.value -= 1;
  }
};

// 슬라이드에 표시될 버디 계산
const displayedBuddiz = computed(() => {
  return wish_buddiz.value.slice(currentBuddySlide.value, currentBuddySlide.value + 4);
});

// 다음 슬라이드로 이동 (총 버디 개수에 맞춰 순환)
const nextBuddySlide = () => {
  if (currentBuddySlide.value + 4 >= wish_buddiz.value.length) {
    currentBuddySlide.value = 0;
  } else {
    currentBuddySlide.value += 1;
  }
};

// 이전 슬라이드로 이동 (총 버디 개수에 맞춰 순환)
const prevBuddySlide = () => {
  if (currentBuddySlide.value === 0) {
    currentBuddySlide.value = wish_buddiz.value.length - 4;
  } else {
    currentBuddySlide.value -= 1;
  }
};
</script>
<template>
  <div class="container-fluid">
    <div class="row px-xl-3">
      <!-- 사이드바 -->
      <div class="col-lg-2">
        <SideBar />
      </div>

      <!-- 메인 콘텐츠 -->
      <div class="col-lg-9 col-md-9 col-sm-12">
        <h2 class="mt-5" style="margin-left: 20px; margin-right: 0; margin-bottom: 20px">{{ t('common.wish.wishestate') }}</h2>
        <div class="position-relative">
          <div v-if="wish_buildings.length > 0">
            <!-- 왼쪽 화살표 -->
            <button @click="prevSlide" class="arrow-left">
              <img src="@/assets/icons/arrow_left.png" alt="Left Arrow" />
            </button>

            <div class="row">
              <!-- 매물 카드 슬라이드 -->
              <div class="col-lg-3 col-md-4 mb-4" v-for="(buildings, index) in displayedGuides" :key="index">
                <div class="card hover-animate h-100 border-0 shadow card-custom">
                  <div class="card-img-top overflow-hidden img-container">
                    <img :src="buildings.img" class="img-fluid img-custom" :alt="wish_buildings.title" />
                  </div>
                  <div class="card-body" style="position: relative">
                    <h5 class="card-title">
                      {{ t('common.wish.etitle') }} {{ buildings.wishedId }}
                      <!-- 하트 버튼 -->
                      <i class="heart-icon bi-heart-fill" style="position: absolute; right: 20px; top: 25%; transform: translateY(-50%); color: #ff8f17"></i>
                    </h5>
                    <p class="card-text">{{ buildings.deposit }} / {{ buildings.monthlyPee }}</p>
                    <p v-if="buildings.tradetype == 'monthly'" class="card-text">{{ t('common.wish.monthly') }}</p>
                    <p v-else class="card-text">{{ t('common.wish.charter') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 오른쪽 화살표 -->
            <button @click="nextSlide" class="arrow-right">
              <img src="@/assets/icons/arrow_right.png" alt="Right Arrow" />
            </button>
          </div>
          <div v-else>
            <div class="text-center">
              <img src="@/assets/images/nothing.png" alt="nothing" class="img-fluid" style="max-width: 300px" />
              <p>{{ t('common.wish.notwishestate') }}</p>
            </div>
          </div>
        </div>

        <h2 class="mt-4" style="margin-left: 20px; margin-right: 0; margin-bottom: 20px">{{ t('common.wish.wishbuddiz') }}</h2>
        <div class="position-relative">
          <div v-if="wish_buddiz.length > 0">
            <!-- 왼쪽 화살표 -->
            <button @click="prevBuddySlide" class="arrow-left">
              <img src="@/assets/icons/arrow_left.png" alt="Left Arrow" />
            </button>

            <div class="row">
              <!-- 버디즈 카드 슬라이드 -->
              <div class="col-lg-3 col-md-4 mb-4" v-for="(buddiz, index) in displayedBuddiz" :key="index">
                <div class="card hover-animate h-100 border-0 shadow card-custom">
                  <div class="card-img-top overflow-hidden img-container">
                    <img :src="buddiz.wishProfilePic" class="img-fluid img-custom" :alt="wish_buddiz" />
                  </div>
                  <div class="card-body" style="position: relative">
                    <h5 class="card-title">
                      {{ buddiz.wishNickname }}
                      <!-- 하트 버튼 -->
                      <i class="heart-icon bi-heart-fill" style="position: absolute; right: 20px; top: 25%; transform: translateY(-50%); color: #ff8f17"></i>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <!-- 오른쪽 화살표 -->
            <button @click="nextBuddySlide" class="arrow-right">
              <img src="@/assets/icons/arrow_right.png" alt="Right Arrow" />
            </button>
          </div>
          <div v-else>
            <div class="text-center">
              <img src="@/assets/images/nothing.png" alt="nothing" class="img-fluid" style="max-width: 300px" />
              <p>{{ t('common.wish.notwishbuddiz') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hover-animate:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

.container-fluid {
  padding-right: 20px; /* 전체적인 오른쪽 여백 추가 */
}

/* 메인 콘텐츠를 오른쪽으로 이동시키기 위한 여백 */
.col-md-9.col-sm-12 {
  margin-left: 100px; /* 메인 콘텐츠를 오른쪽으로 이동 */
}

/* 카드 크기 통일 */
.card-custom {
  height: 320px; /* 카드 전체 높이를 고정 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 25px; /* 카드 자체를 오른쪽으로 더 이동 */
  overflow: hidden; /* 넘치는 내용 숨김 */
}

.card-body {
  flex-grow: 1;
  overflow: hidden; /* 카드 내용이 넘치지 않도록 */
}

/* 매물과 버디즈 카드 모두 텍스트 길이를 2줄로 제한 */
.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 최대 1줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.img-container {
  height: 220px; /* 이미지 컨테이너 높이 통일 */
  overflow: hidden;
}

.img-custom {
  height: 100%; /* 이미지 높이를 100%로 */
  object-fit: cover;
  width: 100%;
}

/* 화살표 위치 및 스타일 */
.arrow-left {
  position: absolute;
  top: 50%;
  left: -35px; /* 왼쪽 화살표를 사이드바 근처에 배치 */
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.arrow-right {
  position: absolute;
  top: 50%;
  right: -70px; /* 오른쪽 화살표와 화면 끝 사이 간격 */
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.arrow-left img,
.arrow-right img {
  width: 30px;
  height: 30px;
  margin-right: 10px; /* 화살표와 카드 사이 간격 추가 */
}

/* 이미지와 카드의 크기가 고정되어 푸터가 움직이지 않도록 */
.row {
  min-height: 340px; /* 카드와 푸터 사이 고정 높이 설정 */
}
/* 메인 콘텐츠를 줄여 화면에 맞춤 */
.col-lg-9.col-md-9.col-sm-12 {
  margin-left: 20px; /* 메인 콘텐츠를 오른쪽으로 이동 */
  width: 79%; /* 전체 콘텐츠 너비를 줄임 */
}
</style>
