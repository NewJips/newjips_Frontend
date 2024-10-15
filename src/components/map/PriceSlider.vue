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
  slider: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.minRange !== undefined && value.maxRange !== undefined;
    },
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['deposit', 'monthlyPee', 'roomSize'].includes(value),
  },
});

const filterStore = useFilterStore();
const sliderSnap = ref(null);

const sliderValues = ref({
  from: props.slider.from || props.slider.minRange,
  to: props.slider.to || props.slider.maxRange,
});

const formatValue = (value) => {
  switch (props.type) {
    case 'deposit':
      const billion = Math.floor(value / 10000);
      const million = value % 10000;
      if (billion > 0) {
        return million > 0 ? `${billion}억 ${million}만원` : `${billion}억`;
      }
      return `${million}만원`;
    case 'monthlyPee':
      return `${value}만원`;
    case 'roomSize':
      return `${value}m²`;
    default:
      return value;
  }
};

const formattedFrom = computed(() => formatValue(sliderValues.value.from));
const formattedTo = computed(() => {
  const baseValue = formatValue(sliderValues.value.to);
  return sliderValues.value.to >= props.slider.maxRange
    ? `${baseValue}~`
    : baseValue;
});

watch(
  () => props.slider,
  (newValue) => {
    if (sliderSnap.value && sliderSnap.value.noUiSlider) {
      sliderValues.value.from = newValue.from || newValue.minRange;
      sliderValues.value.to = newValue.to || newValue.maxRange;
      sliderSnap.value.noUiSlider.updateOptions({
        range: {
          min: newValue.minRange,
          max: newValue.maxRange,
        },
      });
      sliderSnap.value.noUiSlider.set([
        sliderValues.value.from,
        sliderValues.value.to,
      ]);
    }
  },
  { deep: true }
);

onMounted(() => {
  if (
    props.slider.minRange === undefined ||
    props.slider.maxRange === undefined
  ) {
    console.error('Slider min or max range is undefined');
    return;
  }

  noUiSlider.create(sliderSnap.value, {
    start: [sliderValues.value.from, sliderValues.value.to],
    connect: true,
    step: props.slider.step || 1,
    range: {
      min: props.slider.minRange,
      max: props.slider.maxRange,
    },
  });

  sliderSnap.value.noUiSlider.on('update', (values) => {
    const from = Math.round(parseFloat(values[0]));
    const to = Math.round(parseFloat(values[1]));
    sliderValues.value.from = from;
    sliderValues.value.to = to;
    filterStore.setSliderValues(props.type, from, to);
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
