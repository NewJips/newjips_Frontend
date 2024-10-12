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
  background-color: #446688;
  padding: 20px;
  border-radius: 12px;
  color: white;
  text-align: center;
  cursor: pointer;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loan-card:hover {
  transform: translateY(-5px);
}
</style>
