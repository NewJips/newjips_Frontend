<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      {{ title }}
      <span class="custom-arrow">
        <i class="fas fa-chevron-down"></i>
      </span>
    </button>
    <form class="dropdown-menu p-4">
      <!-- 체크박스 -->
      <div v-if="checkboxes && checkboxes.length" id="check-container">
        <label class="form-label"
          >{{ checkboxLabel }}
          <div id="boxes">
            <div
              v-for="(checkbox, index) in checkboxes"
              :key="index"
              class="checkbox-item"
              @change="handleCheckboxChange(checkbox, $event.target.checked)"
            >
              <input
                type="checkbox"
                class="form-check-input-outlined"
                :id="`dropdownCheck${index}`"
                :value="checkbox"
              />
              {{ checkbox }}
            </div>
          </div>
        </label>
      </div>

      <!-- 슬라이더 -->
      <div v-if="sliders && sliders.length" class="mb-3">
        <label class="form-label-bold">{{ priceLabel }}</label>
        <div v-for="(slider, index) in sliders" :key="index">
          <label :for="`costLabel${index}`" class="form-label">
            {{ slider.label }}
          </label>
          <!-- 각 슬라이더에 슬라이더 데이터 전달 -->
          <PriceSlider :slider="slider" :sliderIndex="index" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter';
import PriceSlider from '@/components/map/PriceSlider.vue';
import { Dropdown } from 'bootstrap';

const props = defineProps({
  title: String,
  checkboxLabel: String,
  checkboxes: Array,
  priceLabel: String,
  sliders: Array,
});

const filterStore = useFilterStore();

const handleCheckboxChange = (checkbox, checked) => {
  const category = props.checkboxLabel;
  filterStore.setCheckboxValue(category, checkbox, checked);
  console.log('penguin checked');
};
</script>

<style scoped>
.form-label-bold {
  font-weight: bold;
}
.dropdown-menu {
  width: 300%;
}
.form-check-input-outlined {
  outline-color: #4e66f8;
}
.btn-check:checked + .btn,
:not(.btn-check) + .btn:active,
.btn:first-child:active,
.btn.active,
.btn.show {
  color: var(--bs-btn-active-color);
  background-color: #4e66f8;
  border-color: var(--bs-btn-active-border-color);
}
.dropdown-toggle::after {
  display: none; /* 기본 화살표 아이콘 숨기기 */
}
.dropdown-toggle {
  color: black;
  margin-left: 1rem;
}
.check-container {
  display: flex;
}

.fas::after {
  color: white;
  margin-left: 0.5rem;
}

#boxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.checkbox-item {
  flex: 0 0 calc(50% - 8px);
  box-sizing: border-box;
}
</style>
