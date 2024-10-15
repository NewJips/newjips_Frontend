<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      방 크기
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <PriceSlider
        :slider="{
          minRange: 0,
          maxRange: 200,
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

const filterStore = useFilterStore();
</script>
