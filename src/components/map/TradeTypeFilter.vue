<template>
  <div class="dropdown" style="margin-left: 1rem">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      {{ t('common.filter.tradeandprice') }}
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <div id="check-container">
        <label class="form-label">{{ t('common.filter.tradetype') }}</label>
        <div id="boxes">
          <div
            v-for="(value, key) in filterStore.filters.tradetype"
            :key="key"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="key"
              :value="key"
              v-model="filterStore.filters.tradetype[key]"
              @change="handleTradeTypeChange(key)"
              class="custom-checkbox"
            />
            <label :for="key" class="custom-label">{{
              getDisplayName(key)
            }}</label>
          </div>
        </div>
      </div>

      <div>
        <label class="form-label">{{ t('common.filter.deposit') }}</label>
        <PriceSlider
          :slider="{
            minRange: 0,
            maxRange: 50000,
            step: 1000,
            from: filterStore.filters.deposit.min,
            to: filterStore.filters.deposit.max,
          }"
          type="deposit"
        />
      </div>

      <div>
        <label class="form-label">{{ t('common.filter.monthly') }}</label>
        <PriceSlider
          :slider="{
            minRange: 0,
            maxRange: 200,
            step: 10,
            from: filterStore.filters.monthlyPee.min,
            to: filterStore.filters.monthlyPee.max,
          }"
          type="monthlyPee"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import PriceSlider from './PriceSlider.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const filterStore = useFilterStore();

const handleTradeTypeChange = (key) => {
  filterStore.setTradeType(key, filterStore.filters.tradetype[key]);
};

const getDisplayName = (key) => {
  const displayNames = {
    charter: t('common.filter.charter'),
    monthly: t('common.filter.monthly'),
  };
  return displayNames[key] || key;
};
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
