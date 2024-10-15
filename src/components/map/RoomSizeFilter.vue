<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      {{ t('common.filter.room_size') }}
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <PriceSlider
        :slider="{
          minRange: 10,
          maxRange: 100,
          step: 5,
          from: filterStore.filters.roomSize.min,
          to: filterStore.filters.roomSize.max,
        }"
        type="roomSize"
      />
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import PriceSlider from './PriceSlider.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const filterStore = useFilterStore();
</script>

<style scoped>
.dropdown-menu {
  width: 400px;
}
.custom-checkbox {
  accent-color: #3f54e3;

  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
}

.custom-label {
  font-size: 1rem;
}
</style>
