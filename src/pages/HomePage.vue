<script setup>

import { ref, computed, onMounted } from 'vue';
import popularBuddizApi from '@/api/homeApi.js';  // 인기 버디즈 API 불러오기
import popularEstatesApi from '@/api/homeApi.js'; // 부동산 API 불러오기
import exchangeRateApi from '@/api/changemoneyApi.js'; // 환율 API 호출
import LoanCard from '@/components/LoanCard.vue';
import FloatingAi from '@/components/FloatingAi.vue';
import GuideCard from '@/components/GuideCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 인기 버디즈 데이터를 저장할 배열
const popularBuddiz = ref([]);

// 부동산 데이터를 저장할 배열
const popularEstates = ref([]);

// 한국 돈을 저장할 변수
const koreaMoney = ref(0);  // 초기값 설정 (1000원)

// 베트남 돈을 저장할 변수
const vietnamMoney = ref(0);

// 환율을 저장할 변수 (KRW to VND)
const exchangeRate = ref(18.55);  // 기본 환율

// 한국 돈을 입력할 때 호출되는 함수
const updateKoreaMoney = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, '');  // 숫자만 남김
  koreaMoney.value = parseFloat(value) || 0;  // 숫자로 변환 후 저장
  vietnamMoney.value = koreaMoney.value * exchangeRate.value; // 한국 돈을 베트남 돈으로 변환
};

// 베트남 돈을 입력할 때 호출되는 함수 (숫자만 허용)
const updateVietnamMoney = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, '');  // 숫자만 남김
  vietnamMoney.value = parseFloat(value) || 0;  // 숫자로 변환 후 저장
  koreaMoney.value = vietnamMoney.value / exchangeRate.value; // 베트남 돈을 한국 돈으로 변환
};

// 천 단위 콤마를 추가한 한국 돈 출력
const formattedKoreaMoney = computed(() => {
  return koreaMoney.value.toLocaleString();
});

// 천 단위 콤마를 추가한 베트남 돈 출력
const formattedVietnamMoney = computed(() => {
  return vietnamMoney.value.toLocaleString();
});

// 컴포넌트가 마운트될 때 실행
onMounted(async () => {
  try {
    // 인기 버디즈 데이터를 API에서 받아옴
    popularBuddiz.value = await popularBuddizApi.getPopularBuddiz();

    // 부동산 데이터를 API에서 받아옴
    popularEstates.value = await popularEstatesApi.getPopularEstate();

    // 환율 데이터를 API에서 받아옴
    const exchangeRateData = await exchangeRateApi.getExchangeRate();
    const rates = exchangeRateData.rates;

    // KRW to VND 환율 설정
    exchangeRate.value = rates.VND / rates.KRW;

    // 초기값 설정
    vietnamMoney.value = koreaMoney.value * exchangeRate.value;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// 대출 정보 예시
const loans = [
  {
    id: 1,
    name: 'KB WELCOME PLUS',
    subtitle: '임차보증금 80% 이내, 최대 2억까지',
    maxAmount: '최고 1.5%',
    rate: '연 3.5 ~ 5.5%',
    duration: '3개월에서 2년',
    repayment: '일시 상환, 원리금 균등 상환 또는 혼합 상환 방식 가능',
    interest: '변동 금리, 연 3.74% 이내',
    usageInfo: '모든 조건을 충족해야 하며, 조건에 따라 우대 금리가 적용될 수 있습니다.',
    link: 'https://obank.kbstar.com/quics?page=C103507&cc=b104363%3Ab104516&isNew=N&prcode=LN20000041&QSL=F&QSL=F',
  },
  {
    id: 2,
    name: 'KB 전세실심 대출보증',
    subtitle: '전세보증금 90%까지',
    maxAmount: '최고 1.5%',
    rate: '연 3.5 ~ 5.5%',
    duration: '3개월에서 2년',
    repayment: '일시 상환, 원리금 균등 상환 방식 가능',
    interest: '변동 금리, 연 3.5% 이내',
    usageInfo: '모든 조건을 충족해야 하며, 조건에 따라 이용 가능',
    link: 'https://obank.kbstar.com/quics?page=C103507&cc=b104363:b104516&isNew=N&prcode=LN20000064&QSL=F',
  },
  {
    id: 3,
    name: 'KB 외국인 전용 주택 전세자금 대출',
    subtitle: '외국인을 위한 전세자금 대출',
    maxAmount: '최고 1.5%',
    rate: '연 3.5 ~ 5.5%',
    duration: '3개월에서 2년',
    repayment: '일시 상환, 원리금 균등 상환 방식 가능',
    interest: '연 3.5%',
    usageInfo: '조건에 따라 이용 가능',
    link: 'https://obank.kbstar.com/quics?page=C103526',
  }
];

// 가이드 정보 예시
const guides = ref([
  {
    imageSrc: '../src/assets/images/guide1.jpeg',
    category: 'Living',
    title: '원룸? 1.5룸? 이란',
    date: 'September 1, 2023',
    description:
      'Learn the differences between one-room and 1.5-room apartments.',
    link: 'https://spacediver.tistory.com/2',
  },
  {
    imageSrc: '../src/assets/images/guide2.jpeg',
    category: 'Finance',
    title: '전세 대출 방법',
    date: 'September 2, 2023',
    description: 'Step-by-step guide on how to get a Jeonse loan in Korea.',
    link: 'https://spacediver.tistory.com/3',
  },
  {
    imageSrc: '../src/assets/images/guide3.jpeg',
    category: 'Living',
    title: '집을 구하는 과정',
    date: 'September 3, 2023',
    description: 'A guide to finding and securing your ideal home in Korea.',
    link: 'https://spacediver.tistory.com/4',
  },
  {
    imageSrc: '../src/assets/images/guide4.jpeg',
    category: 'Legal',
    title: '허위 매물 예방 방법',
    date: 'September 4, 2023',
    description: 'How to avoid fraudulent listings when searching for a house.',
    link: 'https://spacediver.tistory.com/5',
  }
]);

// 대출 상세 페이지로 이동하는 함수
const goToLoanDetail = (loan) => {
  // 대출 상세 페이지로 URL 요청 처리
};
</script>


<template>
  <div class="container-fluid px-0">
    <FloatingAi></FloatingAi>
    <!-- 메인 검색탭 -->
    <section class="mb-5">
      <div class="container-fluid banner-container overflow-hidden "
        style="background-color: #354962; min-height: 55vh; ">
        <div class="row align-items-center px-4">
          <!-- 텍스트 및 버튼 -->
          <div class="col-md-5 ps-5" style="margin-left: 17vh;">
            <h1 class="banner-text">{{ t('common.home.banner1') }}<br />{{ t('common.home.banner2') }}</h1>
            <p class="sub-text">
              <span style="color: #FF8F17; font-weight: bold;">{{ t('common.buddiz') }}</span>{{
                t('common.home.banner3') }}<br>
              {{ t('common.home.banner4') }}
            </p>

            <div class="btn-container">
              <router-link to="/buddiz" class="text-muted">
                <button class="banner-btn btn btn-outline-light me-4 px-4 py-2">
                  <i class="fas fa-user-friends me-2"></i>{{ t('common.home.find_buddiz') }}
                </button>
              </router-link>

              <router-link to="/map" class="text-muted">
                <button class="banner-btn btn btn-outline-light px-4 py-2">
                  <i class="fas fa-home me-2"></i>{{ t('common.home.find_room') }}
                </button>
              </router-link>
            </div>
          </div>

          <!-- 이미지 -->
          <div class="col-md-5 ms-4">
            <img src="@/assets/images/banner_people.png" style="height: 45vh; ">
          </div>
        </div>
      </div>
    </section>

    <!-- 인기버디즈, 환율 -->
    <div class="ms-5 me-5 mb-5">
      <div class="row">
        <!-- 인기 버디즈 -->
        <div class="col-md-8 pe-5">
          <h4 class="head-title">{{ t('common.home.popular_buddiz') }}</h4>
          <div class="d-flex mb-4">
            <span class="subtitle ">{{ t('common.home.popular_buddiz_explain') }}</span>
          </div>

          <div class="row ps-2">
            <div class="col d-flex" v-if="popularBuddiz.length >= 1">
              <div class="rounded-circle ranking-num mt-2" style="background-color: #FFEC82;">1</div>
              <div class="ms-4 d-flex flex-column align-items-center">
                <img :src="popularBuddiz[0].imgFile" class="avatar ranking-img mb-3">
                <h5>{{ popularBuddiz[0].nickname }}</h5>
                <div>
                  <i class="fa fa-star" style="color: #FFC973;"></i>
                  <span class="ms-1">{{ popularBuddiz[0].averageRating }}</span>
                </div>
              </div>
            </div>

            <div class="col d-flex" v-if="popularBuddiz.length >= 2">
              <div class="rounded-circle ranking-num" style="background-color: #D5E1F4;">2</div>
              <div class="ms-4 d-flex flex-column align-items-center">
                <img :src="popularBuddiz[1].imgFile" class="avatar ranking-img mb-3">
                <h5>{{ popularBuddiz[1].nickname }}</h5>
                <div>
                  <i class="fa fa-star" style="color: #FFC973;"></i>
                  <span class="ms-1">{{ popularBuddiz[1].averageRating }}</span>
                </div>
              </div>
            </div>

            <div class="col d-flex" v-if="popularBuddiz.length >= 3">
              <div class="rounded-circle ranking-num" style="background-color: #CEB796;">3</div>
              <div class="ms-4 d-flex flex-column align-items-center">
                <img :src="popularBuddiz[2].imgFile" class="avatar ranking-img mb-3">
                <h5>{{ popularBuddiz[2].nickname }}</h5>
                <div>
                  <i class="fa fa-star" style="color: #FFC973;"></i>
                  <span class="ms-1">{{ popularBuddiz[2].averageRating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 환율 -->
        <div class="col-md-4">
          <h4 class="head-title">{{ t('common.home.exchange') }}</h4>
          <div class="d-flex mb-4">
            <span class="subtitle">{{ t('common.home.exchange_explain') }}</span>
          </div>

          <div class="flex ps-3 pt-3 align-items-center">
            <!-- 한국 -->
            <div class="mb-3 d-flex align-items-center">
              <img src="@/assets/images/korea.png" class="avatar border me-3"
                style="width: 8vh; height: 8vh; object-fit: cover;">
              <div class="rounded-3 d-flex justify-content-end align-items-center px-3"
                style="background-color: #EAECEF; height: 6vh;">
                <input :value="formattedKoreaMoney" @input="updateKoreaMoney"
                  style="all: unset; text-align: right; font-size: large; width: 18vh;" class="me-3">
                <p style="all: unset; text-align: right; font-weight: bold;">KRW</p>
              </div>
            </div>

            <i class="fas fa-arrows-alt-v fa-2x mb-3 ms-8 ps-5" style="padding-left: 20vh;"></i>


            <!-- 베트남 (입력 가능) -->
            <div class="mb-3 d-flex align-items-center">
              <img src="@/assets/images/vietnam.png" class="avatar border me-3"
                style="width: 8vh; height: 8vh; object-fit: cover;">
              <div class="rounded-3 d-flex justify-content-end align-items-center px-3"
                style="background-color: #EAECEF; height: 6vh;">
                <input :value="formattedVietnamMoney" @input="updateVietnamMoney"
                  style="all: unset; text-align: right; font-size: large; width: 18vh;" class="me-3">
                <p style="all: unset; text-align: right; font-weight: bold;">VND</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 인기 매물 -->
    <div class="ms-5 me-5 mb-5">
      <h4 class="head-title">{{ t('common.home.popular_estates') }}</h4>
      <div class="d-flex mb-4">
        <span class="subtitle ">{{ t('common.home.popular_estates_explain') }}</span>
        <span class="position-absolute end-0 me-5">
          <router-link class="btn-more text-muted" to="/map">{{ t('common.home.plusbtn') }}</router-link>
        </span>
      </div>

      <div>
        <div class="row gx-4 mx-0 pb-3" v-if="popularEstates.length">
          <!-- 부동산 항목 렌더링 -->
          <div v-for="(estate, index) in popularEstates" :key="index" class="col">
            <div class="card shadow-sm card-hover border-0 h-100">
              <div class="card-img-top card-img-hover">
                <a class="img-overlay" href="real-estate-single-v1.html"></a>
                <div class="position-absolute start-0 top-0 pt-3 ps-3">
                  <span class="d-table badge bg-danger">HOT</span>
                </div>
                <div class="content-overlay end-0 top-0 pt-3 pe-3">
                  <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button"
                    data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Wishlist">
                    <i class="fi-heart"></i>
                  </button>
                </div>
                <img :src="estate.img" alt="Image" />
              </div>
              <div class="card-body position-relative pb-3">
                <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">{{ estate.tradetype }}</h4>
                <h3 class="h6 mb-2 fs-base">
                  <a class="nav-link stretched-link" href="real-estate-single-v1.html">{{ estate.address }} | {{
                    estate.roomSize }}㎡</a>
                </h3>
                <p class="mb-2 fs-sm text-muted">{{ estate.address }}</p>
                <div class="fw-bold">
                  <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>{{ estate.deposit }} / {{
                    estate.monthlyPee }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 가이드 -->
    <div class="mb-5">
      <div class="container-fluid banner-container overflow-hidden ps-5" style="background-color: #EAECEF;">
        <h4 class="head-title">{{ t('common.home.guide_kr') }}</h4>
        <div class="d-flex mb-4">
          <span class="subtitle ">{{ t('common.home.guide_kr_explain') }}</span>
          <span class="position-absolute end-0 me-5">
            <router-link class="btn-more text-muted" to="/guide">{{ t('common.home.plusbtn') }}</router-link>
          </span>
        </div>


        <div class="row me-5 h-100">
          <!-- 첫 번째 col -->
          <div class="flex col-6 h-100 pe-3">
            <a href="https://spacediver.tistory.com/2" class="text-muted" style="text-decoration: none; ">
              <div class="card shadow hover-animate h-100">
                <div class="card-body d-flex flex-column justify-content-between">
                  <div class="icon-box mb-3">
                    <img src="@/assets/icons/bank-note.svg" style="height: 5vh;">
                  </div>
                  <h5 class="guide-card-title">{{ t('common.home.guide_kr_card1') }}</h5>
                  <p>{{ t('common.home.guide_kr_card1_detail') }}</p>
                </div>
              </div>
            </a>
          </div>

          <!-- 두 번째 col -->
          <div class="col-3">
            <div class="row mb-3">
              <a href="https://spacediver.tistory.com/10" class="text-muted" style="text-decoration: none; ">
                <div class="card shadow hover-animate">
                  <div class="card-body">
                    <h6 class="guide-card-title">{{ t('common.home.guide_kr_card2') }}</h6>
                  </div>
                </div>
              </a>
            </div>
            <div class="row">
              <a href="https://spacediver.tistory.com/6" class="text-muted" style="text-decoration: none; ">
                <div class="card shadow hover-animate">
                  <div class="card-body">
                    <h6 class="guide-card-title">{{ t('common.home.guide_kr_card3') }}</h6>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- 세 번째 col -->
          <div class="col-3">
            <div class="row mb-3">
              <a href="https://spacediver.tistory.com/5" class="text-muted" style="text-decoration: none; ">
                <div class="card shadow hover-animate">
                  <div class="card-body">
                    <h6 class="guide-card-title">{{ t('common.home.guide_kr_card4') }}'</h6>
                  </div>
                </div>
              </a>
            </div>

            <div class="row">
              <a href="https://spacediver.tistory.com/3" class="text-muted" style="text-decoration: none; ">
                <div class="card shadow hover-animate">
                  <div class="card-body">
                    <h6 class="guide-card-title">{{ t('common.home.guide_kr_card5') }}</h6>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 핫플 지역 -->
    <div class="ms-5 me-5 mb-5">
      <h4 class="head-title">{{ t('common.home.hotplace') }}</h4>
      <div class="d-flex mb-4">
        <span class="subtitle ">{{ t('common.home.hotplace_explain') }}</span>
      </div>

      <div class="hotPlace-grid pb-3">
        <!-- 홍대 -->
        <div class="col">
          <a class="card shadow-sm border-0" href="">
            <div class="card-img-top card-img-hover" style="height: 27vh;">
              <img src="https://i.pinimg.com/564x/66/a2/ab/66a2ab3dc8ed82cd11376c277c74d47c.jpg" alt="">
            </div>
            <div class="card-body text-center">
              <h3 class="mb-0 fs-base text-nav">{{ t('common.home.hotplace_card1') }}</h3>
            </div>
          </a>
        </div>

        <!-- 성수 -->
        <div class="col">
          <a class="card shadow-sm border-0" href="">
            <div class="card-img-top card-img-hover" style="height: 27vh;">
              <img src="https://mediahub.seoul.go.kr/uploads/mediahub/2023/07/wHQEGwBLgYQBpvjKWCwKdRHPEmBMwLFy.png"
                alt="">
            </div>
            <div class="card-body text-center">
              <h3 class="mb-0 fs-base text-nav">{{ t('common.home.hotplace_card2') }}</h3>
            </div>
          </a>
        </div>

        <!-- 강남 -->
        <div class="col">
          <a class="card shadow-sm border-0" href="">
            <div class="card-img-top card-img-hover" style="height: 27vh;">
              <img src="https://i.pinimg.com/564x/b3/e6/58/b3e658c5d2947f52b0b23bd96e0bf5a6.jpg" alt="">
            </div>
            <div class="card-body text-center">
              <h3 class="mb-0 fs-base text-nav">{{ t('common.home.hotplace_card3') }}</h3>
            </div>
          </a>
        </div>

        <!-- 건대 -->
        <div class="col">
          <a class="card shadow-sm border-0" href="">
            <div class="card-img-top card-img-hover" style="height: 27vh;">
              <img src="https://cdn.news.unn.net/news/photo/202111/518970_321294_1325.jpg" alt="">
            </div>
            <div class="card-body text-center">
              <h3 class="mb-0 fs-base text-nav">{{ t('common.home.hotplace_card4') }}</h3>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- 전세 대출 추천 -->
    <div class="ms-5 me-5 mb-5">
      <h4 class="head-title">{{ t('common.loan.header') }}</h4>
      <div class="d-flex mb-4">
        <span class="subtitle ">{{ t('common.loan.description') }}</span>
        <span class="position-absolute end-0 me-5">
          <router-link class="btn-more text-muted" to="/loanproduct">{{ t('common.home.plusbtn') }}</router-link>
        </span>
      </div>

      <div class="loan-grid pb-3">
        <div v-for="(loan, index) in loans" :key="index" class="card shadow-sm card-hover border-0 h-100 loan-card"
          @click="goToLoanDetail(loan)">
          <div class="card-body">
            <!-- Use the index + 1 to access the corresponding entry in 'homecard' -->
            <h5 class="loan-name">{{ t(`common.homecard.${index + 1}.name`) }}</h5>
            <p class="loan-subtitle">{{ t(`common.homecard.${index + 1}.subtitle`) }}</p>
            <a :href="loan.link" target="_blank" class="loan-link">{{t('common.homecard.indetail')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ms-8 {
  margin-left: 8rem !important
}

.ranking-num {
  font-size: 18px;
  width: 5vh;
  height: 5vh;
  text-align: center;
  align-content: center;
  font-weight: bold;
}

.ranking-img {
  width: 18vh;
  height: 18vh;
  object-fit: cover;
}

.banner-container {
  color: white;
  padding: 40px 0;
}

.banner-text {
  font-size: 35px;
  margin-bottom: 20px;
  line-height: 1.5;
  letter-spacing: 2.5px;
}

.sub-text {
  font-size: 18px;
  margin-bottom: 40px;
  line-height: 1.8;
  letter-spacing: 1.8px;
  font-weight: 300;
}

.banner-btn {
  background-color: white;
  text-decoration: none;
  color: #354962;
}

.banner-btn:hover {
  text-decoration: none;
  color: #FF8F17;
}

.ps-sm-3 {
  padding-left: 1rem !important;
}

.fs-xs {
  font-size: 0.85rem !important;
}

.fw-normal {
  font-weight: 400 !important;
}

.text-primary {
  color: #fd5631 !important;
}

.text-uppercase {
  text-transform: uppercase !important;
}

.fw-bold {
  font-weight: 700 !important;
}

.text-nowrap {
  white-space: nowrap !important;
}

.card:hover>.card-img-hover .img-overlay {
  opacity: 0.33 !important;
}

.card-img-hover .position-absolute {
  z-index: 5;
}

.h-100 {
  height: 100% !important;
}

.border-0 {
  border: 0 !important;
}

.card-img-hover {
  position: relative;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.card-img-hover .img-overlay {
  opacity: 0 !important;
}

.card-hover {
  transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out !important;
}

.card-hover:hover,
.card-hover.show {
  box-shadow: 0 0.125rem 0.125rem -0.125rem rgba(31, 27, 45, 0.08), 0 0.25rem 0.75rem rgba(31, 27, 45, 0.08);
}

.card-img-hover .content-overlay {
  position: absolute;
  transition: opacity 0.25s ease-in-out;
  opacity: 0;
}

.fs-base {
  font-size: 1rem !important;
}

.text-nav {
  color: #454056 !important;
}

.border-end-sm {
  border-right: 1px solid #efecf3 !important;
}

.w-sm-50 {
  width: 50% !important;
}

.col-md-10 {
  flex: 0 0 auto;
  width: 83.33333333%;
}

.d-sm-flex {
  display: flex !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.d-sm-none {
  display: none !important;
}

.pb-md-3 {
  padding-bottom: 1rem !important;
}

.px-md-3 {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}

h1 {
  line-height: 1.2;
  font-size: 1rem;
}

h3 {
  line-height: 1.3;
}


@media (min-width: 1200px) {
  .display-5 {
    font-size: 3rem;
  }
}

.display-5 {
  font-size: calc(1.425rem + 2.1vw);
  font-weight: 700;
  line-height: 1.2;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.375rem 1rem;
  clear: both;
  font-weight: 400;
  color: #454056;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: #fd5631;
  background-color: transparent;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fd5631;
  text-decoration: none;
  background-color: transparent;
}

.dropdown-item.disabled,
.dropdown-item:disabled {
  color: #9691a4;
  pointer-events: none;
  background-color: transparent;
}

.dropdown-menu li:hover>.dropdown-item {
  color: #fd5631;
}

.dropdown-menu .active>.dropdown-item {
  color: #fd5631;
}

.dropdown-menu .active>.dropdown-item,
.dropdown-menu .dropdown-item.active {
  pointer-events: none;
}

.dropdown-menu.dropdown-menu-dark li:hover>.dropdown-item {
  color: #fff;
}

.dropdown-menu.dropdown-menu-dark .active>.dropdown-item {
  color: #fff;
}

.dropdown-menu.w-100 {
  min-width: 100%;
}

.dropdown-item {
  transition: color 0.2s ease-in-out;
}

.dropdown-item>i {
  margin-top: -0.125rem;
  transition: opacity 0.25s ease-in-out;
}

.dropdown-item:hover>i,
.dropdown-item.active>i {
  opacity: 1 !important;
}

.d-block {
  display: block !important;
}

.text-center {
  text-align: center !important;
}

.content-overlay {
  position: relative;
  z-index: 5;
}

.jarallax {
  position: relative;
  z-index: 0;
}

.loan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.hotPlace-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.head-title,
.btn-more,
.guide-card-title {
  color: #111111;
  text-decoration: none;
}

.subtitle {
  font-size: large;
  color: #3E444E;
  font-weight: 500;
}

.card-img-top img,
.img-overlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-img-top img {
  border-top-left-radius: calc(0.75rem - 1px);
  border-top-right-radius: calc(0.75rem - 1px);
}


.icon-box {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  text-align: center;
  line-height: 4rem;
  background-color: #F8E3ED;
}

.img-overlay {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.25s ease-in-out;
  background-color: #1f1b2d;
  opacity: 0.5;
  z-index: 1;
}

.opacity-50 {
  opacity: 0.5 !important;
}

.dropdown-toggle.btn-link {
  box-shadow: none;
}

.btn-link {
  border: 0;
  background-color: transparent !important;
  color: #666276;
  font-weight: bold;
  text-decoration: none;
}

.btn-link:hover {
  color: #fd5631;
}

.btn-link.btn-light {
  color: rgba(255, 255, 255, 0.7);
}

.btn-link.btn-light:hover {
  color: #fff;
}

.dropdown-toggle.btn-link {
  color: #9691a4;
}

.dropdown-toggle.btn-link:hover,
.form-group .dropdown-toggle.btn-link.show {
  color: #454056;
}

.form-group-light .dropdown-toggle.btn-link {
  color: rgba(255, 255, 255, 0.5);
}

.form-group-light .dropdown-toggle.btn-link:hover,
.form-group-light .dropdown-toggle.btn-link.show {
  color: #fff;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #efecf3;
  border-radius: 0.75rem;
  text-decoration: none;
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem 1.25rem;
}

.card-img-top {
  width: 100%;
}

.card-img-top {
  border-top-left-radius: calc(0.75rem - 1px);
  border-top-right-radius: calc(0.75rem - 1px);
}

.dropdown-toggle {
  display: block;
  position: end;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 1rem;
  margin-top: -0.3rem;
}

.dropdown-menu {
  margin-bottom: 0.75rem;
  padding-top: 0;
  padding-bottom: 0;
  border: 0;
  border-left: 2px solid transparent;
  border-radius: 0;
  background-color: transparent;
  box-shadow: none;
}

.form-group {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #efecf3;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.125rem -0.125rem rgba(31, 27, 45, 0.08), 0 0.25rem 0.75rem rgba(31, 27, 45, 0.08);
}

.dropdown .dropdown-toggle::before,
.dropup .dropdown-toggle::before,
.dropend .dropdown-toggle::before {
  display: none;
}

/* Loan cards container */
.loan-cards {
  margin-top: 40px;
}

.loan-cards h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Loan cards grid */
.loan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Individual loan card styling */
.loan-card {
  background-color: #446688;
  padding: 20px;
  border-radius: 12px;
  color: white !important;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.loan-card * {
  color: white !important;
}

.loan-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.loan-card p {
  font-size: 1rem;
}
</style>