<!-- LoanProductPage.vue -->
<template>
  <div class="fluid-container pb-5">
    <div class="type-header">
      <h2>{{ t('common.loan.header') }}</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">{{ t('common.loan.description') }}</div>
    </div>

    <!-- Loan Details (Selected Loan Information) -->
    <section class="mt-4 mb-5 px-5" v-if="selectedLoan">
      <h3>{{ selectedLoan.title }} {{ t('common.loan.loanProduct') }}</h3>
      <p class="loan-subtitle">{{ selectedLoan.subtitle }}</p>

      <div class="highlight-box px-5 py-4">
        {{ selectedLoan.content }}
      </div>

      <div class="details-grid">
        <div class="detail-item">
          <img src="../../assets/icons/calendar-icon.png" alt="Calendar Icon" />
          <p><strong>{{ t('common.loan.period') }}</strong><br>{{ selectedLoan.period }}</p>
        </div>
        <div class="detail-item">
          <img src="../../assets/icons/hand-icon.png" alt="Money Icon" />
          <p><strong>{{ t('common.loan.limit') }}</strong><br>{{ selectedLoan.loanLimit }}</p>
        </div>
      </div>

      <p><strong>{{ t('common.loan.repaymentMethod') }}</strong><br>{{ selectedLoan.howToRepay }}</p>
      <p><strong>{{ t('common.loan.interest') }}</strong><br>{{ selectedLoan.interest }}</p>
      <p><strong>{{ t('common.loan.loanGuide') }}</strong><br>{{ selectedLoan.loanGuide }}</p>
      <p><strong>{{ t('common.loan.url') }}</strong><br><a :href="selectedLoan.url" target="_blank">{{ selectedLoan.url }}</a></p>
    </section>

    <!-- Loan Cards Section -->
    <section class="loan-cards px-5">
      <h2>{{ t('common.loan.otherLoans') }}</h2>
      <div class="loan-grid">
        <LoanCard v-for="(loan, index) in loans" :key="index" :loan="loan" @click="goToLoanDetail(loan)" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import LoanCard from '@/components/LoanCard.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n(); // Get t() function and locale

const loans = ref([]);
const selectedLoan = ref(null);

// Fetch loans based on language
const fetchLoans = () => {
  const currentLanguage = locale.value === 'ko' ? 'KR' : 'VN';  // Dynamically determine the current language

  axios.get('http://localhost:8080/api/loan/list', { params: { lan: currentLanguage } })
    .then(response => {
      loans.value = response.data;
    })
    .catch(error => {
      console.error('Failed to fetch loan data:', error);
    });
};

// Load loans on initial load
onMounted(() => {
  fetchLoans();
});

// Watch for language changes
watch(locale, () => {
  fetchLoans();  // Re-fetch loans when the language changes
});

// Fetch loan details
const goToLoanDetail = (loan) => {
  const currentLanguage = locale.value === 'ko' ? 'KR' : 'VN';  // Dynamically determine the current language

  axios.get(`http://localhost:8080/api/loan/detail/${loan.lno}`, { params: { lan: currentLanguage } })
    .then(response => {
      selectedLoan.value = response.data;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top after fetching details
    })
    .catch(error => {
      console.error('Failed to fetch loan details:', error);
    });
};
</script>

<style scoped>
.type-header {
    background-color: #F5F6F7;
    padding-top: 4vh;
    padding-bottom: 4vh;
    padding-left: 6vh;
}

.header.grey-background {
  background-color: #f5f5f5;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.header-content p {
  font-size: 1.2rem;
  color: #666;
}

.loan-details {
  margin-top: 20px;
  padding: 20px;
}

.loan-details h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.loan-details .loan-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 10px;
}

.highlight-box {
  background-color: #F5F6F7;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #333;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item img {
  width: 40px;
  margin-right: 10px;
}

.loan-cards {
  margin-top: 40px;
}

.loan-cards h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.loan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

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

.loan-card .rate {
  font-size: 1rem;
}
</style>
