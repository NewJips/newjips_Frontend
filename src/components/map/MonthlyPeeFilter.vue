<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      층수
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <div id="check-container">
        <label class="form-label">층수 선택</label>
        <div id="boxes">
          <div
            v-for="(value, key) in filterStore.filters.floor"
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
            <label :for="key" class="custom-label">{{
              getDisplayName(key)
            }}</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

const handleFloorChange = (key) => {
  filterStore.setFloor(key, filterStore.filters.floor[key]);
};

const getDisplayName = (key) => {
  const displayNames = {
    '1층': '1층',
    '2층 이상': '2층 이상',
    반지하: '반지하',
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
