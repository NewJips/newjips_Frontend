<template>
  <div class="guide-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-card">
          <h2>{{ t('common.guide.title') }}</h2>
          <h1>{{ t('common.guide.subtitle') }}</h1>
          <p>
            {{ t('common.guide.description') }}<br />
            {{ t('common.guide.description2') }}
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
        :category="t(guide.category)"
        :title="t(guide.title)"
        :date="guide.date"
        :description="t(guide.description)"
        :link="guide.link"
      />
    </section>

    <!-- Pagination -->
    <div class="pagination px-5">
      <a href="#" class="pagination-link" @click.prevent="prevPage" :disabled="currentPage === 1">
        {{ t('common.pagination.older') }}
      </a>
      <a href="#" class="pagination-link" @click.prevent="nextPage" :disabled="currentPage === totalPages">
        {{ t('common.pagination.newer') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GuideCard from '@/components/GuideCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Guide data with category, title, description keys referencing translations in common.json
// Guide data with t() for translations in common.json
const guides = ref([
  {
    imageSrc: '../src/assets/images/guide1.jpeg',
    category: t('common.guide.categories.living'), // Category: Living
    title: t('common.guide.guide1'), 
    date: 'September 1, 2023',
    description: t('common.guide.guide1_detail'), 
    link: 'https://spacediver.tistory.com/2'
  },
  {
    imageSrc: '../src/assets/images/guide2.jpeg',
    category: t('common.guide.categories.finance'), // Category: Finance
    title: t('common.guide.guide2'), 
    date: 'September 2, 2023',
    description: t('common.guide.guide2_detail'), 
    link: 'https://spacediver.tistory.com/3'
  },
  {
    imageSrc: '../src/assets/images/guide3.jpeg',
    category: t('common.guide.categories.living'), // Category: Living
    title: t('common.guide.guide3'), 
    date: 'September 3, 2023',
    description: t('common.guide.guide3_detail'), 
    link: 'https://spacediver.tistory.com/4'
  },
  {
    imageSrc: '../src/assets/images/guide4.jpeg',
    category: t('common.guide.categories.legal'), // Category: Legal
    title: t('common.guide.guide4'), 
    date: 'September 4, 2023',
    description: t('common.guide.guide4_detail'), 
    link: 'https://spacediver.tistory.com/5'
  },
  {
    imageSrc: '../src/assets/images/guide5.jpeg',
    category: t('common.guide.categories.living'), // Category: Living
    title: t('common.guide.guide5'), 
    date: 'September 5, 2023',
    description: t('common.guide.guide5_detail'), 
    link: 'https://spacediver.tistory.com/6'
  },
  {
    imageSrc: '../src/assets/images/guide6.jpeg',
    category: t('common.guide.categories.legal'), // Category: Legal
    title: t('common.guide.guide6'), 
    date: 'September 6, 2023',
    description: t('common.guide.guide6_detail'), 
    link: 'https://spacediver.tistory.com/7'
  },
  {
    imageSrc: '../src/assets/images/guide7.jpeg',
    category: t('common.guide.categories.finance'), // Category: Finance
    title: t('common.guide.guide7'), 
    date: 'September 7, 2023',
    description: t('common.guide.guide7_detail'), 
    link: 'https://spacediver.tistory.com/8'
  },
  {
    imageSrc: '../src/assets/images/guide8.jpeg',
    category: t('common.guide.categories.finance'), // Category: Finance
    title: t('common.guide.guide8'), 
    date: 'September 8, 2023',
    description: t('common.guide.guide8_detail'), 
    link: 'https://spacediver.tistory.com/9'
  },
  {
    imageSrc: '../src/assets/images/guide9.jpeg',
    category: t('common.guide.categories.legal'), // Category: Legal
    title: t('common.guide.guide9'), 
    date: 'September 9, 2023',
    description: t('common.guide.guide9_detail'), 
    link: 'https://spacediver.tistory.com/10'
  }
]);

// Pagination logic
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 13vh 0;
  text-align: left;
  position: relative;
  min-height: 30vh;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-left: 50px;
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
  gap: 30px;
  margin-top: 40px;
}

/* Pagination Controls */
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

.pagination-link:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
