<script setup>
const props = defineProps({
  loan: Object
});

const emit = defineEmits(['click']);

const selectLoan = () => {
  console.log('Loan selected:', props.loan);  // Debug: Check if loan prop is passed correctly
  emit('click', props.loan);  // Emit the selected loan object
};
</script>

<template>
  <div class="loan-card" @click="selectLoan">
    <h3>{{ loan.title }}</h3>
    <p>{{ loan.subtitle }}</p>
    <p class="loan-limit">{{ loan.loanLimit }}</p>
  </div>
</template>

<style scoped>
.loan-card {
  background-color: #446688;
  padding: 20px;
  border-radius: 12px;
  color: white;
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
</style>
