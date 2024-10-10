<template>
  <div class="loan-card" @click="selectLoan">
    <h3>{{ loan.title }}</h3>
    <p>{{ loan.subtitle }}</p>
    <p class="rate">{{ loan.interest }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  loan: Object
});

const emit = defineEmits(['click']);

const selectLoan = () => {
  emit('click', props.loan);
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
</style>