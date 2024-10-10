<template>
  <div class="fluid-container pb-5">
    <!-- Header with grey background -->
    <div class="type-header">
      <h2>외국인을 위한 대출</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">여러분을 위한 대출정보를 이용하세요!</div>
    </div>

    <!-- Loan Details (Selected Loan Information) -->
    <section class="mt-4 mb-5 px-5" v-if="selectedLoan">
      <h3>{{ selectedLoan.title }} 전세 자금 대출</h3>
      <p class="loan-subtitle">{{ selectedLoan.subtitle }}</p>

      <div class="highlight-box px-5 py-4">
        {{ selectedLoan.content }}
      </div>

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
      <p><strong>이용 안내</strong><br>{{ selectedLoan.loanGuide }}</p>
      <p><strong>상세 주소</strong><br><a :href="selectedLoan.url" target="_blank">{{ selectedLoan.url }}</a></p>
    </section>

    <!-- Loan Cards Section -->
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
import loanApi from '@/api/loanApi';  // Import loan API module
import LoanCard from '@/components/LoanCard.vue';  // Import LoanCard component

// Store loans and selected loan
const loans = ref([]);
const selectedLoan = ref(null);
const route = useRoute(); // Get the loanId from the route params

// Fetch loan list and details when the component is mounted
onMounted(() => {
  const loanId = route.params.loanId;  // Get loanId from the route

  // Fetch loan details using loanId
  loanApi.fetchLoanDetail(loanId)
    .then(response => {
      selectedLoan.value = response;
    })
    .catch(error => {
      console.error('Failed to fetch loan details:', error);
    });

  // Fetch all loans (for the loan cards section)
  loanApi.fetchLoanList()
    .then(response => {
      loans.value = response;
    })
    .catch(error => {
      console.error('Failed to fetch loan list:', error);
    });
});

// Function to fetch loan details when a loan card is clicked
const goToLoanDetail = (loan) => {
  loanApi.fetchLoanDetail(loan.lno)
    .then(response => {
      selectedLoan.value = response;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top when a new loan is selected
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

/* Grey background for the header section */
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

/* Loan Details Section */
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

/* Highlighted Description Box */
.highlight-box {
  background-color: #F5F6F7;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 1.1rem;
  color: #333;
}

/* Two-column layout for duration and amount */
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

/* Loan Cards Section */
.loan-cards {
  margin-top: 40px;
}

.loan-cards h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Loan grid with smaller cards */
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