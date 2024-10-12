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
  min-height: 200px; /* Make the height flexible based on the content */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.loan-card h3 {
  font-size: clamp(1rem, 2vw, 1.3rem); /* Responsive font size */
  margin-bottom: 0.5rem;
  word-wrap: break-word; /* Allow long words to break */
  white-space: normal; /* Ensure long words wrap */
}

.loan-card p {
  font-size: clamp(0.8rem, 1.5vw, 1rem); /* Responsive font size */
  word-wrap: break-word;
  white-space: normal;
}

.loan-card * {
  color: white !important; /* Ensure text remains visible on colored background */
}
</style>