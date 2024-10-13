import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMarkerStore = defineStore('marker', () => {
  const markers = ref([]);
  const selectedMarker = ref(null);
  const visibleMarkerCount = ref(0);
  const selectedClusterMarkers = ref([]);

  const addMarker = (marker) => {
    markers.value.push(marker);
  };

  const updateSelectedMarker = (marker) => {
    selectedMarker.value = marker;
  };
  const updateSelectedClusterMarkers = (clusterMarkers) => {
    selectedClusterMarkers.value = clusterMarkers; // 클러스터 마커 업데이트
  };
  const resetMarkers = () => {
    markers.value = [];
    selectedClusterMarkers.value = [];
  };

  return {
    markers,
    selectedMarker,
    visibleMarkerCount,
    addMarker,
    updateSelectedMarker,
    resetMarkers,
    selectedClusterMarkers,
    updateSelectedClusterMarkers,
  };
});
