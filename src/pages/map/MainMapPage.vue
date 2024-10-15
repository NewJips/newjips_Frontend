<template>
  <div class="filter-container">
    <div style="display: flex; flex-direction: row; gap: 1rem">
      <TradeTypeFilter />
      <DepositFilter />
      <MonthlyPeeFilter />
      <RoomSizeFilter />
    </div>
    <div>
      <ResetFilterButton />
    </div>
  </div>
  <div class="container">
    <div class="detail-container scrollbar">
      <BriefDetailEstate
        v-if="selectedMarker"
        :estateId="selectedMarker.eno"
        :estateData="selectedMarker"
      />
      <div v-else>
        <BriefDetailEstate
          v-for="estate in estateList"
          :key="estate.eno"
          :estateId="estate.eno"
          :estateData="estate"
        />
      </div>
    </div>
    <div id="map" ref="mapElement" class="map-container"></div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="lds-heart"><div></div></div>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import TradeTypeFilter from '@/components/map/TradeTypeFilter.vue';
import DepositFilter from '@/components/map/DepositFilter.vue';
import MonthlyPeeFilter from '@/components/map/MonthlyPeeFilter.vue';
import RoomSizeFilter from '@/components/map/RoomSizeFilter.vue';
import ResetFilterButton from '@/components/map/ResetFilterButton.vue';
import BriefDetailEstate from '@/components/map/BriefDetailEstate.vue';
import { useMap } from './useMap';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const filterStore = useFilterStore();
const estateList = ref([]);
const mapElement = ref(null);

let map = null;

const {
  initializeMap,
  markers,
  selectedMarker,
  selectedCluster,
  getEstatesByLocation,
  getConvenientFacilities,
  isLoading,

  updateMarkersVisibility,
} = useMap();

const updateEstateList = async () => {
  if (!selectedMarker.value && !selectedCluster.value.length && map) {
    const center = map.getCenter();
    const latitude = center.lat();
    const longitude = center.lng();
    const estates = await getEstatesByLocation(latitude, longitude);
    estateList.value = estates;
  }
};

onMounted(() => {
  map = initializeMap(mapElement.value);

  naver.maps.Event.addListener(map, 'idle', () => {
    updateEstateList();
  });

  updateEstateList();
});

watch(selectedMarker, (newValue) => {
  if (newValue) {
    estateList.value = [newValue];
  } else {
    updateEstateList();
  }
});

// watch(selectedCluster, (newValue) => {
//   if (newValue.length > 0) {
//     estateList.value = newValue;
//   } else {
//     updateEstateList();
//   }
// });
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  min-width: 100%;
  padding: 0;
}

.detail-container {
  flex: 0.5;
  background: white;
  overflow-y: scroll;
}

.map-container {
  flex: 1;
}
.filter-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
  border-bottom: 1px solid #8f9bb3;
  height: 8vh;
  align-items: center;
}
.scrollbar::-webkit-scrollbar {
  width: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #9f9f9f;
  border-radius: 10px;
}

.scrollbar::-webkit-scrollbar-track {
  background: white;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lds-heart,
.lds-heart div,
.lds-heart div:after,
.lds-heart div:before {
  box-sizing: border-box;
}
.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}
.lds-heart div {
  top: 28px;
  left: 28px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #ff8f17;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: ' ';
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: #ff8f17;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
