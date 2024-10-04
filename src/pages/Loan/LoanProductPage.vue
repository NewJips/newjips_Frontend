<template>
  <div class="fluid-container pb-5">
    <!-- Header with grey background -->
    <div class="type-header">
        <h2>외국인을 위한 대출</h2>
        <div style="font-size: 17pt; margin-top: 8pt;">여러분을 위한 대출정보를 이용하세요!</div>
    </div>

    <!-- Loan Details (Selected Loan Information) -->
    <section class="mt-4 mb-5 px-5" v-if="selectedLoan">
      <h3>{{ selectedLoan.name }} 전세 자금 대출</h3>
      <p class="loan-subtitle">{{ selectedLoan.subtitle }}</p>

      <!-- Highlighted Description -->
      <div class="highlight-box px-5 py-4">
        임대차 계약을 체결한 외국인 고객 및 소득을 증명할 수 있는 고객 대상. 대출 기간은 3개월에서 2년, 최대 10년까지 연장 가능.
      </div>

      <!-- Two-column layout for key details -->
      <div class="details-grid">
        <div class="detail-item">
          <img src="../../assets/icons/calendar-icon.png" alt="Calendar Icon" />
          <p><strong>기간</strong><br>{{ selectedLoan.duration }}</p>
        </div>
        <div class="detail-item">
          <img src="../../assets/icons/hand-icon.png" alt="Money Icon" />
          <p><strong>최고 금액</strong><br>{{ selectedLoan.maxAmount }}</p>
        </div>
      </div>

      <p><strong>상환 방법</strong><br>{{ selectedLoan.repayment }}</p>
      <p><strong>금리 및 이용</strong><br>{{ selectedLoan.interest }}</p>
      <p><strong>이용 안내</strong><br>{{ selectedLoan.usageInfo }}</p>
      <p><strong>상세 주소</strong><br><a :href="selectedLoan.link" target="_blank">{{ selectedLoan.link }}</a></p>
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
import { ref } from 'vue';
import LoanCard from '@/components/LoanCard.vue';

const loans = [
  {
    id: 1,
    name: 'KB WELCOME PLUS 전세대출',
    subtitle: '임차보증금 80% 이내, 최대 2억까지',
    maxAmount: '최대 2억 원',
    rate: '연 3.74% 이내',
    duration: '3개월에서 2년',
    repayment: '일시 상환, 원리금 균등 상환 또는 혼합 상환 방식 가능',
    interest: 'COFIX 기준 변동 금리, 연 3.74% 이내',
    usageInfo: '모든 조건을 충족해야 하며, 조건에 따라 우대 금리가 적용될 수 있습니다.',
    link: 'https://obank.kbstar.com'
  },
  {
    id: 2,
    name: 'KB 전세자금대출 상품',
    subtitle: '전세보증금반환보증 지원',
    maxAmount: '최대 4억 원 (보증금의 80%)',
    rate: '최저 4.27% ~ 최고 6.29%',
    duration: '10개월 ~ 25개월',
    repayment: '만기일시상환',
    interest: '연 4.27% ~ 6.29%',
    usageInfo: '신용등급, 연소득, 주택가액 등에 따라 대출 한도 및 금리 적용',
    link: 'https://obank.kbstar.com/quics?page=C019479'
  },
  {
    id: 3,
    name: 'KB 전세자금대출',
    subtitle: '임차보증금의 80%까지 보증서 담보로 대출 제공',
    maxAmount: '최대 2억2천2백만원, 채권보전시 4억4천4백만원',
    rate: '최저 4.21% ~ 최고 6.22%',
    duration: '최소 1년, 최대 10년',
    repayment: '일시상환, 혼합상환',
    interest: '최저 4.21%, 최고 6.22%',
    usageInfo: '보증료, 인지세 등',
    link: 'https://obank.kbstar.com/quics?page=C019479'
  },
  {
    id: 4,
    name: '카카오뱅크 전월세 보증금대출',
    subtitle: '전월세 임차보증금의 80%까지 지원',
    maxAmount: '최대 4억원',
    rate: '최저 4.057% ~ 최고 6.172%',
    duration: '10개월 이상 25개월 이내',
    repayment: '일시상환',
    interest: '연 4.057% ~ 6.172%',
    usageInfo: '신용평가, 소득에 따라 대출 한도와 금리 결정',
    link: 'https://www.kakaobank.com/products/leaseLoan'
  },
  {
    id: 5,
    name: '하나은행 대출',
    subtitle: '최대 5천만 원까지 대출 가능',
    maxAmount: '최대 5천만 원',
    rate: '최저 4.057% ~ 최고 6.172%',
    duration: '일시상환: 1년, 분할상환: 5년 이내',
    repayment: '일시상환, 통장대출, 원(리)금균등분할상환',
    interest: '최저 4.057% ~ 최고 6.172%',
    usageInfo: '신용평가, 거래 실적에 따라 대출 한도와 금리 결정, 금리 인하 요구권 행사 가능',
    link: 'https://www.kebhana.com/cont/mall/mall09/mall0903/mall090301/index.jsp'
  }
]
  ;

const selectedLoan = ref(null);

const goToLoanDetail = (loan) => {
  selectedLoan.value = loan;
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
