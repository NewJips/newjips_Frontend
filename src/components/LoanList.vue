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
  height: 100%; /* Make sure the card takes up full height */
}

.loan-card {
  background-color: #ff8c00;
  padding: 20px;
  border-radius: 12px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 250px; /* Set a minimum height for uniformity */
  max-height: 250px; /* Fix height to ensure uniformity */
  overflow: hidden;
}

.loan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.loan-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  overflow: hidden; /* Prevent overflowing text */
  word-wrap: break-word; /* Break long words */
}

.loan-card p {
  font-size: 1rem;
  line-height: 1.2rem; /* Control line height for better alignment */
}
</style>
