import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMarkerStore = defineStore('marker', () => {
  const markers = ref([]);
  const selectedMarker = ref(null);
  const visibleMarkerCount = ref(0);

  const addMarker = (marker) => {
    markers.value.push(marker);
  };

  const updateSelectedMarker = (marker) => {
    selectedMarker.value = marker;
  };

  const resetMarkers = () => {
    markers.value = [];
  };

  return {
    markers,
    selectedMarker,
    visibleMarkerCount,
    addMarker,
    updateSelectedMarker,
    resetMarkers,
  };
});
