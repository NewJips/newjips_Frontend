<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      보증금
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <PriceSlider
        :slider="{
          minRange: 0,
          maxRange: 100000,
          step: 1000,
          from: filterStore.filters.deposit.min,
          to: filterStore.filters.deposit.max,
        }"
        type="deposit"
      />
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import PriceSlider from './PriceSlider.vue';

const filterStore = useFilterStore();
</script>
