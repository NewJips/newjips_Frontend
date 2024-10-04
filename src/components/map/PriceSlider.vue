<template>
  <div class="mb-4">
    <div class="text-primary" ref="sliderSnap"></div>
    <div class="nouislider-values">
      <div class="min">
        <span>{{ formattedFrom }}</span>
      </div>
      <div class="max">
        <span>{{ formattedTo }}</span>
      </div>
    </div>
    <input type="hidden" :value="sliderValues.from" />
    <input type="hidden" :value="sliderValues.to" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { useFilterStore } from '@/stores/filter';

const props = defineProps({
  sliderIndex: Number,
  slider: Object,
});

const filterStore = useFilterStore();
const sliderSnap = ref(null);

const sliderValues = ref({
  from: props.slider.from,
  to: props.slider.to,
});

// 단위와 포맷팅 함수
const formatValue = (value) => {
  if (props.slider.label === '보증금') {
    const smallUnit = value % 10000;
    const bigUnit = Math.floor(value / 10000);
    if (bigUnit > 0) {
      // smallUnit이 0이면 '만원'을 생략
      return smallUnit > 0 ? `${bigUnit}억 ${smallUnit}만원`.trim() : `${bigUnit}억`.trim();
    }
    return `${smallUnit}만원`.trim();
  }
  if (props.slider.label === '방 크기') {
    return `${value}평`;
  }
  return `${value}만원`; // 월세의 경우
};

const formattedFrom = computed(() => formatValue(sliderValues.value.from));
const formattedTo = computed(() => {
  const baseValue = formatValue(sliderValues.value.to);

  // 보증금 슬라이더일 때만 물결표시 추가
  if (props.slider.label === '보증금' && sliderValues.value.to >= props.slider.maxRange) {
    return `${baseValue}~`; // 최대값 도달 시
  }

  // 월세와 방 크기 슬라이더일 때 최대값 도달 시 최대값과 물결표시 추가
  if ((props.slider.label === '월세' || props.slider.label === '방 크기') && sliderValues.value.to >= props.slider.maxRange) {
    return `${baseValue}~`; // 최대값 도달 시
  }

  return baseValue;
});

// props.slider가 업데이트되면 로컬 상태도 업데이트
watch(
  () => props.slider,
  (newValue) => {
    sliderValues.value.from = newValue.from;
    sliderValues.value.to = newValue.to;

    if (sliderSnap.value) {
      sliderSnap.value.noUiSlider.set([newValue.from, newValue.to]);
    }
  }
);

onMounted(() => {
  noUiSlider.create(sliderSnap.value, {
    start: [sliderValues.value.from, sliderValues.value.to],
    connect: true,
    step: props.slider.step,
    range: {
      min: props.slider.minRange,
      max: props.slider.maxRange,
    },
  });

  // 슬라이더 업데이트 시 로컬 상태 및 필터 스토어 업데이트
  sliderSnap.value.noUiSlider.on('update', (values) => {
    const from = Math.round(values[0]);
    const to = Math.round(values[1]);

    // 로컬 상태 업데이트
    sliderValues.value.from = from;
    sliderValues.value.to = to;

    // 필터 스토어 업데이트
    filterStore.setSliderValues(props.sliderIndex, from, to);
  });
});
</script>

<style scoped>
/*
* ===================================================
*     NoUI Slider theming
* ===================================================
*/
.noUi-target {
  background: #ddd;
  border-radius: 0;
  border: none;
  box-shadow: none;
  height: 3px;
  margin-top: 10px;
}

.noUi-horizontal .noUi-handle {
  width: 1px !important;
  height: 1px !important;
  right: -2px !important;
  top: -5px;
  background: #343a40;
  border: none;
  border-radius: 0;
  cursor: pointer;
  box-shadow: none;
  outline: none;
}

.noUi-horizontal .noUi-handle::before,
.noUi-horizontal .noUi-handle::after {
  display: none;
}

.noUi-connect {
  background: #343a40;
}

.text-primary .noUi-handle,
.text-primary .noUi-connect {
  background: #4e66f8;
}

.text-secondary .noUi-handle,
.text-secondary .noUi-connect {
  background: #e83e8c;
}

.nouislider-values {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  color: #6c757d;
  font-size: 0.875rem;
}

/* 맵 버튼 css */
.filter-buttons {
  margin-right: 0.6rem;
}
.btn_filter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 2px;
  background-color: white;
  color: black;

  /* box-shadow: 2px 0 0 0 #8f9bb3; */
  transition: background-color 0.2s;
}
.btn_filter:not(:last-child) {
  border-bottom: 1px solid rgba(143, 155, 179, 0.5);
}
.btn_filter.active {
  background-color: #4e66f8;
  color: white;
}
</style>
