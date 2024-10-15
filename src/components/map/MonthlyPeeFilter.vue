<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      {{ t('common.filter.floor') }}
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <div id="check-container">
        <label class="form-label">{{ t('common.filter.select_floor') }}</label>
        <div id="boxes">
          <div
            v-for="(value, key) in floorLabels"
            :key="key"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="key"
              :value="key"
              v-model="filterStore.filters.floor[key]"
              @change="handleFloorChange(key)"
              class="custom-checkbox"
            />
            <label :for="key" class="custom-label">{{ value }}</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const filterStore = useFilterStore();

const floors = {
  '1층': 'common.filter.floor_one',
  '2층 이상': 'common.filter.floor_two',
  반지하: 'common.filter.under',
};

const floorLabels = computed(() => {
  return Object.entries(floors).reduce((acc, [key, value]) => {
    acc[key] = t(value);
    return acc;
  }, {});
});

const handleFloorChange = (key) => {
  filterStore.setFloor(key, filterStore.filters.floor[key]);
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
