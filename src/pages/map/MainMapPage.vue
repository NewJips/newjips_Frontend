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
        <div v-if="isListLoading">
          <div
            v-for="index in estateList.length"
            :key="index"
            class="loader"
          ></div>
        </div>
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
      <img
        src="@/assets/icons/newjeans-spinner.svg"
        alt="Loading"
        class="rotate-center"
      />
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
  isListLoading,

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
.rotate-center {
  -webkit-animation: rotate-center 2s ease-in-out infinite both;
  animation: rotate-center 2s ease-in-out infinite both;

  width: 300px;
  height: 300px;
}
@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.loader {
  width: 320px;
  height: 150px;
  margin: auto;
  display: block;
  position: relative;
  background: #fff;
  box-sizing: border-box;
}
.loader::after {
  content: '';
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  top: 15px;
  left: 15px;
  position: absolute;
  background-image: linear-gradient(
      100deg,
      transparent,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 80%
    ),
    linear-gradient(#ddd 56px, transparent 0),
    linear-gradient(#ddd 24px, transparent 0),
    linear-gradient(#ddd 18px, transparent 0),
    linear-gradient(#ddd 66px, transparent 0);
  background-repeat: no-repeat;
  background-size: 75px 130px, 55px 56px, 160px 30px, 260px 20px, 290px 56px;
  background-position: 0% 0, 0 0, 70px 5px, 70px 38px, 0px 66px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  0% {
    background-position: 0% 0, 0 0, 70px 5px, 70px 38px, 0px 66px;
  }
  100% {
    background-position: 150% 0, 0 0, 70px 5px, 70px 38px, 0px 66px;
  }
}
</style>
