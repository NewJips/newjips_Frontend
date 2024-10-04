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
      <GuideCard
        v-for="(guide, index) in paginatedGuides"
        :key="index"
        :imageSrc="guide.imageSrc"
        :category="guide.category"
        :title="guide.title"
        :date="guide.date"
        :description="guide.description"
        :link="guide.link"
      />
    </section>

    <!-- Pagination -->
    <div class="pagination px-5">
      <a
        href="#"
        class="pagination-link"
        @click.prevent="prevPage"
        :disabled="currentPage === 1"
        >← Older posts</a
      >
      <a
        href="#"
        class="pagination-link"
        @click.prevent="nextPage"
        :disabled="currentPage === totalPages"
        >Newer posts →</a
      >
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
  },
  {
    imageSrc: '../src/assets/images/guide5.jpeg',
    category: 'Living',
    title: '한국 생활 가이드',
    date: 'September 5, 2023',
    description: 'The complete guide to living comfortably in Korea.',
    link: 'https://spacediver.tistory.com/6',
  },
  {
    imageSrc: '../src/assets/images/guide6.jpeg',
    category: 'Legal',
    title: '부동산 계약 팁',
    date: 'September 6, 2023',
    description:
      'Tips on how to successfully sign a real estate contract in Korea.',
    link: 'https://spacediver.tistory.com/7',
  },
  {
    imageSrc: '../src/assets/images/guide7.jpeg',
    category: 'Finance',
    title: '보증금 돌려받는 법',
    date: 'September 7, 2023',
    description: 'How to get your deposit back after your lease ends.',
    link: 'https://spacediver.tistory.com/8',
  },
  {
    imageSrc: '../src/assets/images/guide8.jpeg',
    category: 'Finance',
    title: '월세 대출 방법',
    date: 'September 8, 2023',
    description: 'Guide to applying for a rent loan in Korea.',
    link: 'https://spacediver.tistory.com/9',
  },
  {
    imageSrc: '../src/assets/images/guide9.jpeg',
    category: 'Legal',
    title: '집주인과의 분쟁 해결 방법',
    date: 'September 9, 2023',
    description: 'How to resolve disputes with your landlord in Korea.',
    link: 'https://spacediver.tistory.com/10',
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
  background-image: url('@/assets/images/banner.png'); /* Set the background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 13vh 0;
  text-align: left; /* Align text to the left */
  position: relative;
  min-height: 30vh; /* Set a minimum height for the banner */
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start; /* Align content to the left */
  align-items: center; /* Vertically center the content */
  height: 100%;
  padding-left: 50px; /* Add left padding to move the card a bit */
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
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
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
