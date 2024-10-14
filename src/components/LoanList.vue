<script setup>
import { ref, onMounted, watch } from 'vue';
import loanApi from '@/api/loanApi.js'; // Assuming you have this set up
import LoanCard from '@/components/LoanCard.vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n(); // Multilingual support
const loans = ref([]); // Hold the top 3 loans

// Fetch the top 3 loans based on language
const fetchTopLoans = async () => {
  const currentLanguage = locale.value === 'ko' ? 'KR' : 'VN'; // Determine the current language
  try {
    const response = await loanApi.fetchTopLoans(currentLanguage); // Call API to fetch top 3 loans
    loans.value = response; // Assign the fetched loans to the loans array
  } catch (error) {
    console.error('Error fetching top loans:', error);
  }
};

// Load loans when the component is mounted
onMounted(() => {
  fetchTopLoans();
});

// Watch for language changes and re-fetch loans
watch(locale, () => {
  fetchTopLoans();
});
</script>

<template>
  <div class="loan-grid">
    <!-- Render LoanCard component for each loan, wrap it in an anchor tag for clickable link -->
    <a v-for="loan in loans" :key="loan.lno" :href="loan.url" target="_blank" class="loan-card-link">
      <LoanCard :loan="loan" />
    </a>
  </div>
</template>

<style scoped>
.loan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 20px;
}

.loan-card-link {
  text-decoration: none;
  color: inherit;
}

.loan-card-link > * {
  height: 100%; /* Ensure the card takes up the full height */
}
</style>
