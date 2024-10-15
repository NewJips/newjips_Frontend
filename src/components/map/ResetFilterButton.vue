<template>
  <button @click="resetFilters" class="btn">
    {{ t('common.filter.reset') }}
  </button>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const filterStore = useFilterStore();

const resetFilters = () => {
  filterStore.resetFilters();
};
</script>
<style scoped>
.btn {
  background-color: #ff8f17;
  color: white;
  margin-right: 1rem;
}
</style>
