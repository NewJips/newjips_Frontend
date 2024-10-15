import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  const filters = ref({
    tradetype: {
      charter: false,
      monthly: false,
    },
    deposit: {
      min: 0,
      max: 100000,
    },
    monthlyPee: {
      min: 0,
      max: 1000,
    },
    roomSize: {
      min: 0,
      max: 200,
    },
    floor: {
      '1층': false,
      '2층 이상': false,
      반지하: false,
    },
    housetype: {
      oneRoom: false,
      twoRoom: false,
      threeRoomPlus: false,
      officeTel: false,
    },
  });
  const setSliderValues = (type, min, max) => {
    if (filters.value[type]) {
      filters.value[type].min = min;
      filters.value[type].max = max;
    } else {
      console.error(`Invalid filter type: ${type}`);
    }
  };
  const setTradeType = (type, value) => {
    filters.value.tradetype[type] = value;
  };

  const setDepositRange = (min, max) => {
    filters.value.deposit.min = min;
    filters.value.deposit.max = max;
  };

  const setMonthlyPeeRange = (min, max) => {
    filters.value.monthlyPee.min = min;
    filters.value.monthlyPee.max = max;
  };

  const setRoomSizeRange = (min, max) => {
    filters.value.roomSize.min = min;
    filters.value.roomSize.max = max;
  };

  const setFloor = (floorType, value) => {
    filters.value.floor[floorType] = value;
  };

  const setHouseType = (type, value) => {
    filters.value.housetype[type] = value;
  };

  const resetFilters = () => {
    Object.keys(filters.value).forEach((key) => {
      if (typeof filters.value[key] === 'object') {
        Object.keys(filters.value[key]).forEach((subKey) => {
          if (typeof filters.value[key][subKey] === 'boolean') {
            filters.value[key][subKey] = false;
          } else {
            filters.value[key][subKey] =
              subKey === 'min' ? 0 : filters.value[key].max;
          }
        });
      }
    });
  };
  const isFiltered = computed(() => {
    return Object.values(filters.value).some((filter) => {
      if (typeof filter === 'object') {
        return Object.values(filter).some((value) => {
          if (typeof value === 'boolean') return value;
          if (typeof value === 'number') return value !== 0;
          return false;
        });
      }
      return false;
    });
  });

  return {
    filters,
    setTradeType,
    setDepositRange,
    setMonthlyPeeRange,
    setRoomSizeRange,
    setFloor,
    setHouseType,
    resetFilters,
    isFiltered,
    setSliderValues,
  };
});
