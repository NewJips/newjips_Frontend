<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      구조
      <span class="custom-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
    <form class="dropdown-menu p-4">
      <div id="check-container">
        <label class="form-label">구조 선택</label>
        <div id="boxes">
          <div
            v-for="(value, key) in structures"
            :key="key"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="key"
              :value="key"
              v-model="filterStore.filters.housetype[key]"
              @change="handleStructureChange(key)"
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
import { reactive } from 'vue';

const filterStore = useFilterStore();

const structures = reactive({
  oneRoom: '원룸',
  twoRoom: '투룸',
  threeRoomPlus: '쓰리룸 이상',
  officeTel: '오피스텔',
});

const handleStructureChange = (key) => {
  filterStore.setHouseType(key, filterStore.filters.housetype[key]);
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
