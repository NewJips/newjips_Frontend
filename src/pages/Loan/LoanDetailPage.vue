<template>
  <div v-if="selectedLoan" class="loan-detail">
    <h3>{{ selectedLoan.title }}</h3>
    <p>{{ selectedLoan.subtitle }}</p>
    <p class="rate">{{ t('common.loan.interest') }}: {{ selectedLoan.interest }}</p>

    <div class="details-grid">
      <div class="detail-item">
        <img src="../../assets/icons/calendar-icon.png" alt="Calendar Icon" />
        <p><strong>{{ t('common.loan.period') }}</strong><br />{{ selectedLoan.period }}</p>
      </div>
      <div class="detail-item">
        <img src="../../assets/icons/hand-icon.png" alt="Money Icon" />
        <p><strong>{{ t('common.loan.limit') }}</strong><br />{{ selectedLoan.loanLimit }}</p>
      </div>
    </div>

    <p><strong>{{ t('common.loan.repaymentMethod') }}</strong><br />{{ selectedLoan.howToRepay }}</p>
    <p><strong>{{ t('common.loan.loanGuide') }}</strong><br />{{ selectedLoan.loanGuide }}</p>
    <p><strong>{{ t('common.loan.url') }}</strong><br /><a :href="selectedLoan.url" target="_blank">{{ selectedLoan.url }}</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';  // Import i18n for multilingual support

const { locale, t } = useI18n();  // Get the current language and t() function

const props = defineProps({
  loanId: Number  // Expect the loan ID to be passed as a prop
});

const selectedLoan = ref(null);

// Fetch loan details based on the passed loan ID and language
const fetchLoanDetail = () => {
  axios.get(`http://localhost:8080/api/loan/detail/${props.loanId}`, {
    params: {
      lan: locale.value  // Pass the language code as a parameter to the API
    }
  })
  .then(response => {
    selectedLoan.value = response.data;  // Store the selected loan details
  })
  .catch(error => {
    console.error('Failed to fetch loan details:', error);
  });
};

onMounted(fetchLoanDetail);  // Fetch loan details when the component is mounted
</script>

<style scoped>
.loan-detail {
  padding: 20px;
}

.loan-detail a {
  color: blue;
  text-decoration: underline;
}

.loan-detail a:hover {
  color: darkblue;
}

/* Details Grid Styling */
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

.detail-item p {
  margin: 0;
}
</style>
