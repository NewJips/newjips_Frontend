  <!-- LoanCard.vue -->
  <script setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const props = defineProps({
    loan: Object
  });

  const emit = defineEmits(['click']);
  const selectLoan = () => {
    emit('click', props.loan);  // Emit selected loan object when clicked
  };
</script>

  <template>
    <div class="loan-card" @click="selectLoan">
      <h3>{{ loan.title }}</h3>
      <p>{{ loan.subtitle }}</p>
      <p>{{ t('common.loan.limit') }}: {{ loan.loanLimit }}</p>
    </div>
  </template>

<style scoped>
.loan-card {
  background-color: #ff8c00;
  padding: 20px;
  border-radius: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 250px; /* Set a fixed height to ensure all cards are the same size */
  min-height: 250px;
  max-height: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  /* Prevent overflow of text */
}

.loan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.loan-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Ensure the title stays on one line */
}

.loan-subtitle {
  font-size: 0.95rem;
  line-height: 1.2rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Ensure the subtitle stays on one line */
}

.loan-limit {
  font-size: 1rem;
  font-weight: normal;
}
</style>
