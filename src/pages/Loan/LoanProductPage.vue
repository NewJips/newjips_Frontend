<!-- LoanProductPage.vue -->

<template>
  <div class="fluid-container pb-5">
    <!-- Loan Details Section (Displays loan details when a loan is selected) -->
    <section v-if="selectedLoan" class="mt-4 mb-5 px-5">
      <h3>{{ selectedLoan.title }} 전세 자금 대출</h3>
      <p class="loan-subtitle">{{ selectedLoan.subtitle }}</p>
      <div class="highlight-box px-5 py-4">{{ selectedLoan.content }}</div>
      <div class="details-grid">
        <div class="detail-item">
          <img src="../../assets/icons/calendar-icon.png" alt="Calendar Icon" />
          <p><strong>기간</strong><br>{{ selectedLoan.period }}</p>
        </div>
        <div class="detail-item">
          <img src="../../assets/icons/hand-icon.png" alt="Money Icon" />
          <p><strong>최고 금액</strong><br>{{ selectedLoan.loanLimit }}</p>
        </div>
      </div>
      <p><strong>상환 방법</strong><br>{{ selectedLoan.howToRepay }}</p>
      <p><strong>금리 및 이용</strong><br>{{ selectedLoan.interest }}</p>
      <p><strong>상세 주소</strong><br><a :href="selectedLoan.url" target="_blank">{{ selectedLoan.url }}</a></p>
    </section>

    <!-- Loan Cards Section (This can remain for showing more loans if needed) -->
    <section class="loan-cards px-5">
      <h2>다른 대출 정보</h2>
      <div class="loan-grid">
        <LoanCard v-for="(loan, index) in loans" :key="index" :loan="loan" @click="goToLoanDetail(loan)" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LoanCard from '@/components/LoanCard.vue';
import loanApi from '@/api/loanApi';

const loans = ref([]);
const selectedLoan = ref(null);
const route = useRoute(); // Access the route

// Fetch loan data when the component is mounted
onMounted(() => {
  fetchLoanData();

  // Load the selected loan if loanId is provided in the route
  const loanId = route.params.loanId;
  if (loanId) {
    fetchLoanDetail(loanId);
  }
});

// Fetch loan list
const fetchLoanData = async () => {
  try {
    loans.value = await loanApi.fetchLoanList();
  } catch (error) {
    console.error('Failed to fetch loans:', error);
  }
};

// Fetch loan detail by loan ID
const fetchLoanDetail = async (loanId) => {
  try {
    selectedLoan.value = await loanApi.fetchLoanDetail(loanId); // Load the selected loan details
  } catch (error) {
    console.error('Failed to fetch loan details:', error);
  }
};

// Handle loan card clicks to show loan details on the same page
const goToLoanDetail = (loan) => {
  selectedLoan.value = loan;
};
</script>

<style scoped>
/* Add your styles for layout, cards, and details */
.loan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.highlight-box {
  background-color: #f5f6f7;
  border-radius: 8px;
  margin: 30px 0;
}
</style>
