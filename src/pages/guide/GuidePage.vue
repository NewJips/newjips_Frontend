<!-- GuidePage.vue -->
<template>
  <div class="guide-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-card">
          <h2>가이드</h2>
          <h1>NewJips가 알려주는 부동산 가이드</h1>
          <p>
            어려운 부동산 계약이 처음이든, 뉴집스가 준비한 한국에서 집구하기 A
            to Z.<br />
            안전한 한국 생활을 돕기 위해 다양한 가이드가 준비되어 있습니다.
          </p>
        </div>
      </div>
    </section>

    <!-- Guide Cards Section -->
    <section class="guide-cards px-5">
      <GuideCard v-for="(guide, index) in paginatedGuides" :key="index" :imageSrc="guide.imageSrc"
        :category="guide.category" :title="guide.title" :date="guide.date" :description="guide.description"
        :link="guide.link" />
    </section>

    <!-- Pagination -->
    <div class="pagination px-5">
      <a href="#" class="pagination-link" @click.prevent="prevPage" :disabled="currentPage === 1">← Older posts</a>
      <a href="#" class="pagination-link" @click.prevent="nextPage" :disabled="currentPage === totalPages">Newer posts
        →</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GuideCard from '@/components/GuideCard.vue';

// Update the image paths to reference images from the public folder
const guides = ref([
  {
    imageSrc: '../src/assets/images/guide1.jpeg',
    category: 'Living',
    title: '허위매물 예방 5계명',
    date: 'September 1, 2023',
    description: '이 가이드는 집을 찾을 때 허위매물에 속지 않기 위한 다섯 가지 필수 규칙을 설명합니다.',
    link: 'https://spacediver.tistory.com/2'
  },
  {
      imageSrc: '../src/assets/images/guide2.jpeg',
      category: 'Finance',
      title: '주택임대차계약서 작성 시 알아두면 좋은 법률',
      date: 'September 2, 2023',
      description: '이 가이드는 한국에서 전세 계약서를 작성할 때 알아두면 유용한 법률 사항을 설명합니다.',
      link: 'https://spacediver.tistory.com/3'
    },
    {
      imageSrc: '../src/assets/images/guide3.jpeg',
      category: 'Living',
      title: '주요 역사 내 무인민원발급기 위치',
      date: 'September 3, 2023',
      description: '이 가이드는 주요 역사 내에서 무인민원발급기의 위치를 찾는 방법을 안내합니다.',
      link: 'https://spacediver.tistory.com/4'
    },
    {
      imageSrc: '../src/assets/images/guide4.jpeg',
      category: 'Legal',
      title: '참고해야 할 매물 체크리스트',
      date: 'September 4, 2023',
      description: '이 가이드는 부동산을 검색할 때 참고해야 할 중요한 체크리스트를 제시합니다.',
      link: 'https://spacediver.tistory.com/5'
    },
    {
      imageSrc: '../src/assets/images/guide5.jpeg',
      category: 'Living',
      title: '계약하고 싶은 집 찾을 때 ‘이것’ 꼭 확인해요!',
      date: 'September 5, 2023',
      description: '이 가이드는 계약을 진행하고 싶은 집을 찾을 때 확인해야 할 필수 사항을 다룹니다.',
      link: 'https://spacediver.tistory.com/6'
    },
    {
      imageSrc: '../src/assets/images/guide6.jpeg',
      category: 'Legal',
      title: '이사 준비하는 사람 필독!',
      date: 'September 6, 2023',
      description: '이 가이드는 이사를 준비할 때 필수적으로 알아야 할 정보를 제공합니다.',
      link: 'https://spacediver.tistory.com/7'
    },
    {
      imageSrc: '../src/assets/images/guide7.jpeg',
      category: 'Finance',
      title: '전세와 월세? 그게 뭘까',
      date: 'September 7, 2023',
      description: '이 가이드는 전세와 월세의 차이점을 설명하고, 한국에서 전세나 월세를 선택할 때 고려해야 할 사항을 제시합니다.',
      link: 'https://spacediver.tistory.com/8'
    },
    {
      imageSrc: '../src/assets/images/guide8.jpeg',
      category: 'Finance',
      title: '이사 떡 돌리는 이유!',
      date: 'September 8, 2023',
      description: '이 가이드는 이사 시 떡을 돌리는 전통과 그 의미를 설명합니다.',
      link: 'https://spacediver.tistory.com/9'
    },
    {
      imageSrc: '../src/assets/images/guide9.jpeg',
      category: 'Legal',
      title: '집 계약 후 필수 신고 및 등기 신청 종류',
      date: 'September 9, 2023',
      description: '이 가이드는 집 계약 후 필수적으로 해야 할 신고 및 등기 신청 절차를 안내합니다.',
      link: 'https://spacediver.tistory.com/10'
    },
]);

const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(guides.value.length / itemsPerPage);
});

const paginatedGuides = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return guides.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
.guide-page {
  width: 100%;
}

/* Hero Section Styles */
.hero {
  background-image: url('@/assets/images/banner.png');
  /* Set the background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 13vh 0;
  text-align: left;
  /* Align text to the left */
  position: relative;
  min-height: 30vh;
  /* Set a minimum height for the banner */
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  /* Align content to the left */
  align-items: center;
  /* Vertically center the content */
  height: 100%;
  padding-left: 50px;
  /* Add left padding to move the card a bit */
}

.hero-card {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  display: inline-block;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.hero h2 {
  color: #28a745;
  font-size: 1.8rem;
  font-weight: bold;
}

.hero h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1rem;
  line-height: 1.5;
}

/* Guide Cards Layout - 3 Columns */
.guide-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 3 columns */
  gap: 30px;
  margin-top: 40px;
}

/* Pagination Controls - Styled like "Read More" buttons with arrows */
.pagination {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.pagination-link {
  font-size: 1rem;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.pagination-link:hover {
  text-decoration: none;
  font-weight: bold;
}

/* Disable link style when at the beginning/end of pages */
.pagination-link:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
