<script setup>
import { ref, computed } from 'vue';
import SideBar from '@/components/layouts/SideBar.vue';

import buildings1 from '@/assets/images/building1.jpg';
import buildings2 from '@/assets/images/building2.jpg';
import buildings3 from '@/assets/images/building3.jpg';
import buildings4 from '@/assets/images/building4.jpg';
import buildings5 from '@/assets/images/building5.jpg';
import buildings6 from '@/assets/images/building6.jpg';
import faceImage1 from '@/assets/images/face2.jpg';
import faceImage2 from '@/assets/images/face3.jpg';
import faceImage3 from '@/assets/images/face8.jpg';
import faceImage4 from '@/assets/images/face9.jpg';
import faceImage5 from '@/assets/images/face10.jpg';
import faceImage6 from '@/assets/images/face7.jpg';

// 매물 데이터를 슬라이드로 표시하기 위한 상태 관리
const currentSlide = ref(0);
const currentBuddySlide = ref(0);

const blame_buildings = [
  { title: '매물 1', description: '도심에 위치한 넓고 현대적인 방입니다.', imageUrl: buildings1 },
  { title: '매물 2', description: '교통이 편리한 위치에 있는 아파트입니다.', imageUrl: buildings2 },
  { title: '매물 3', description: '바다가 보이는 멋진 스튜디오입니다.', imageUrl: buildings3 },
  { title: '매물 4', description: '조용하고 평화로운 시골 주택입니다.', imageUrl: buildings4 },
  { title: '매물 5', description: '럭셔리 스타일의 고급 주택입니다.', imageUrl: buildings5 },
  { title: '매물 6', description: '현대적인 디자인의 도심형 아파트입니다.', imageUrl: buildings6 },
];
const blame_buddiz = [
  { title: '버디 1', description: '활기찬 성격을 가진 친구입니다.', imageUrl: faceImage1 },
  { title: '버디 2', description: '재미있는 이야기로 항상 즐거운 친구입니다.', imageUrl: faceImage2 },
  { title: '버디 3', description: '모험을 좋아하는 친구입니다.', imageUrl: faceImage3 },
  { title: '버디 4', description: '조용하고 사려 깊은 친구입니다.', imageUrl: faceImage4 },
  { title: '버디 5', description: '유머감각이 뛰어난 친구입니다.', imageUrl: faceImage5 },
  { title: '버디 6', description: '운동을 사랑하는 친구입니다.', imageUrl: faceImage6 },
];

// 슬라이드에 표시될 매물 계산
const displayedGuides = computed(() => {
  // 슬라이드에서 시작 인덱스(currentSlide)에서 4개의 매물을 보여줌
  return blame_buildings.slice(currentSlide.value, currentSlide.value + 4);
});

// 다음 슬라이드로 이동 (총 매물 개수에 맞춰 순환)
const nextSlide = () => {
  if (currentSlide.value + 4 >= blame_buildings.length) {
    currentSlide.value = 0;
  } else {
    currentSlide.value += 1;
  }
};

// 이전 슬라이드로 이동 (총 매물 개수에 맞춰 순환)
const prevSlide = () => {
  if (currentSlide.value === 0) {
    currentSlide.value = blame_buildings.length - 4;
  } else {
    currentSlide.value -= 1;
  }
};

// 슬라이드에 표시될 버디 계산
const displayedBuddiz = computed(() => {
  return blame_buddiz.slice(currentBuddySlide.value, currentBuddySlide.value + 4);
});

// 다음 슬라이드로 이동 (총 버디 개수에 맞춰 순환)
const nextBuddySlide = () => {
  if (currentBuddySlide.value + 4 >= blame_buddiz.length) {
    currentBuddySlide.value = 0;
  } else {
    currentBuddySlide.value += 1;
  }
};

// 이전 슬라이드로 이동 (총 버디 개수에 맞춰 순환)
const prevBuddySlide = () => {
  if (currentBuddySlide.value === 0) {
    currentBuddySlide.value = blame_buddiz.length - 4;
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
        <h2 class="mt-5" style="margin-left: 20px; margin-right: 0; margin-bottom: 20px">신고한 매물</h2>
        <div class="position-relative">
          <div v-if="blame_buildings.length > 0">
            <!-- 왼쪽 화살표 -->
            <button @click="prevSlide" class="arrow-left">
              <img src="@/assets/icons/arrow_left.png" alt="Left Arrow" />
            </button>

            <div class="row">
              <!-- 매물 카드 슬라이드 -->
              <div class="col-lg-3 col-md-4 mb-4" v-for="(buildings, index) in displayedGuides" :key="index">
                <div class="card hover-animate h-100 border-0 shadow card-custom">
                  <div class="card-img-top overflow-hidden img-container">
                    <img :src="buildings.imageUrl" class="img-fluid img-custom" :alt="blame_buildings.title" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ buildings.title }}</h5>
                    <p class="card-text">{{ buildings.description }}</p>
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
              <p>신고한 매물이 없습니다.</p>
            </div>
          </div>
        </div>

        <h2 class="mt-4" style="margin-left: 20px; margin-right: 0; margin-bottom: 20px">신고한 버디즈</h2>
        <div class="position-relative">
          <div v-if="blame_buildings.length > 0">
            <!-- 왼쪽 화살표 -->
            <button @click="prevBuddySlide" class="arrow-left">
              <img src="@/assets/icons/arrow_left.png" alt="Left Arrow" />
            </button>

            <div class="row">
              <!-- 버디즈 카드 슬라이드 -->
              <div class="col-lg-3 col-md-4 mb-4" v-for="(buddy, index) in displayedBuddiz" :key="index">
                <div class="card hover-animate h-100 border-0 shadow card-custom">
                  <div class="card-img-top overflow-hidden img-container">
                    <img :src="buddy.imageUrl" class="img-fluid img-custom" :alt="buddy.title" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ buddy.title }}</h5>
                    <p class="card-text">{{ buddy.description }}</p>
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
              <p>신고한 매물이 없습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.nav-pills .nav-link.active {
  background-color: #ff8f17;
  color: white;
}

.nav-link {
  text-decoration: none;
  color: black;
}

.nav-link:hover {
  text-decoration: none;
  color: #ff8f17;
}

.nav-link.active:hover {
  color: red;
}

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
  -webkit-line-clamp: 1; /* 최대 2줄로 제한 */
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
