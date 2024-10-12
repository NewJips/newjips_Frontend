<!-- LoanDetailPage.vue -->
<template>
  <div class="loan-card" @click="selectLoan">
    <h3>{{ loan.title }}</h3>
    <p>{{ loan.subtitle }}</p>
    <p class="rate">{{ loan.interest }}</p>

    <div class="details-grid">
      <div class="detail-item">
        <img src="../../assets/icons/calendar-icon.png" alt="Calendar Icon" />
        <p>
          <strong>{{ t('loan.period') }}</strong><br />
          {{ loan.period }}
        </p>
      </div>
      <div class="detail-item">
        <img src="../../assets/icons/hand-icon.png" alt="Money Icon" />
        <p>
          <strong>{{ t('common.loan.limit') }}</strong><br />
          {{ loan.loanLimit }}
        </p>
      </div>
    </div>

    <p><strong>{{ t('common.loan.repaymentMethod') }}</strong><br />{{ loan.howToRepay }}</p>
    <p><strong>{{ t('common.loan.interest') }}</strong><br />{{ loan.interest }}</p>
    <p><strong>{{ t('common.loan.loanGuide') }}</strong><br />{{ loan.loanGuide }}</p>
    <p>
      <strong>{{ t('common.loan.url') }}</strong><br />
      <a :href="loan.url" target="_blank">{{ loan.url }}</a>
    </p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n(); // Use i18n for translations

const props = defineProps({
  loan: Object
});

const emit = defineEmits(['click']);

const selectLoan = () => {
  emit('click', props.loan); // Emit the selected loan
};
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
