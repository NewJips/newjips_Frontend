<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      월세
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <PriceSlider
        :slider="{
          minRange: 0,
          maxRange: 1000,
          step: 10,
          from: filterStore.filters.monthlyPee.min,
          to: filterStore.filters.monthlyPee.max,
        }"
        type="monthlyPee"
      />
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import PriceSlider from './PriceSlider.vue';

const filterStore = useFilterStore();
</script>
