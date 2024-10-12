<!-- buddizForm.vue -->
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Adjust the path as needed
import buddizIntroApi from '@/api/buddizIntroApi';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n(); // Destructure the locale properly
console.log(locale.value); // You should see the current locale
const nickname = ref('');
const residence = ref('');
const koreaExperience = ref('');
const accompanyRegion = ref('');
const transactionCount = ref('');
const description = ref('');
const price = ref(0);
const currencyUnit = ref('$'); // Default currency unit
const selectedCharacteristics = ref([]);
const selectedLanguages = ref([]);

// Example lists for checkboxes
const characteristics = ['Friendly', 'Emotional', 'Calm', 'Energetic', 'Silent', 'Organized', 'Sociable'];
const languages = ['Vietnamese', 'Korean'];

// Regions dropdown options
const regions = ['서울', '부산', '대구', '인천', '광주'];

const submitForm = async () => {
  const authStore = useAuthStore(); // Initialize the store
  const userUno = authStore.uno;    // Fetch the logged-in user's `uno`

  if (!userUno) {
    alert('User not logged in. Please log in to submit your form.');
    return;
  }

  const formData = {
  uno: userUno,  
  liveInKr: koreaExperience.value || 0,  // Ensure numeric value
  personality: selectedCharacteristics.value.join(',') || 'Unknown',  // Default if empty
  cost: price.value || 0,  // Ensure numeric value
  hiredTimes: transactionCount.value || 0,  // Ensure numeric value
  rating: 5.0,  // Placeholder for rating
  selfInfo: description.value || 'No description provided',  // Default if empty
  lan: locale.value === 'ko' ? 'KR' : 'VN',  // Default to 'KR' or 'VN'
  location: residence.value || 'Unknown',  // Default if empty
  useLan: selectedLanguages.value.join(',') || 'Unknown',  // Default if empty
};

console.log('Submitting form data:', formData);  // For debugging

  try {
    const response = await buddizIntroApi.saveOrUpdateBuddizIntro(formData);
    console.log('Form submission response:', response);
    alert('Form submitted successfully!');
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit the form.');
  }
};
</script>

<template>
  <div class="fluid-container">
    <div class="type-header">
      <h2>버디즈 이력 등록</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">버디즈로 활동하기 위한 나만의 소개를 입력해주세요!</div>
    </div>

    <!-- Basic Info Section -->
    <div class="fluid-container px-5 pt-5 pb-5" style="background-color: #fbfbfc;">
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> Basic Info</h2>
        <div class="input-group">
          <label for="nickname">닉네임</label>
          <input v-model="nickname" type="text" id="nickname" placeholder="닉네임을 입력해주세요" maxlength="48" />
          <span class="character-limit">{{ 48 - nickname.length }} characters left</span>
        </div>

        <div class="input-group">
          <label for="residence">거주 지역</label>
          <select v-model="residence" id="residence">
            <option value="" disabled>지역 선택</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>

        <div class="input-group">
          <label for="koreaExperience">한국 자취 경력 (년)</label>
          <input v-model="koreaExperience" type="number" id="koreaExperience" placeholder="숫자로 입력해주세요." />
        </div>
      </section>

      <!-- Description Section -->
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> Description</h2>
        <textarea v-model="description" placeholder="Describe your accommodation" maxlength="8000"></textarea>
        <span class="character-limit">{{ 8000 - description.length }} characters left</span>
      </section>

      <!-- Accompany Region and Transaction Count -->
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> 추가 정보</h2>
        <div class="input-group">
          <label for="accompanyRegion">동행 가능 지역</label>
          <select v-model="accompanyRegion" id="accompanyRegion">
            <option value="" disabled>지역 선택</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>

        <div class="input-group">
          <label for="transactionCount">거래 횟수</label>
          <input v-model="transactionCount" type="number" id="transactionCount" placeholder="거래 횟수를 입력해주세요." />
        </div>
      </section>

      <!-- Characteristics and Languages -->
      <section class="section-card">
        <!-- Characteristics organized in grid -->
        <div class="checkbox-group">
          <h4>성격</h4>
          <div class="left-align">
            <div v-for="(characteristic, index) in characteristics" :key="index" class="checkbox-item">
              <input type="checkbox" :id="'char-' + index" :value="characteristic" v-model="selectedCharacteristics" />
              <label :for="'char-' + index">{{ characteristic }}</label>
            </div>
          </div>
        </div>

        <!-- Languages aligned in a single column -->
        <div class="checkbox-group">
          <h4>소통 가능한 언어</h4>
          <div class="left-align">
            <div v-for="(language, index) in languages" :key="index" class="checkbox-item">
              <input type="checkbox" :id="'lang-' + index" :value="language" v-model="selectedLanguages" />
              <label :for="'lang-' + index">{{ language }}</label>
            </div>
          </div>
        </div>
      </section>

      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> Price</h2>

        <!-- Label above inputs -->
        <label for="price">Price (per night) <span class="required-asterisk">*</span></label>

        <!-- Price input and dropdown in a horizontal row -->
        <div class="price-group-inline">
          <input v-model="price" type="number" placeholder="Min" min="0" id="price" />
          <select v-model="currencyUnit">
            <option value="$">$</option>
            <option value="€">w</option>
            <option value="₫">₫</option>
          </select>
        </div>
      </section>

      <!-- Submit Button -->
      <button class="submit-btn" @click="submitForm">Save and continue</button>
    </div>
  </div>
</template>

<style scoped>
.type-header {
  background-color: #F5F6F7;
  padding-top: 4vh;
  padding-bottom: 4vh;
  padding-left: 6vh;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.form-subtitle {
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 1.5rem;
}

.section-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #222;
}

.input-group,
.checkbox-group {
  margin-bottom: 1.5rem;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f8f8f8;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #ff8c00;
  box-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.checkbox-item input {
  margin-right: 0.5rem;
}

.left-align {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Left align all checkboxes */
}

.character-limit {
  font-size: 0.9rem;
  color: #888;
}

textarea {
  height: 120px;
  resize: vertical;
}

.price-group-inline {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.price-group-inline input {
  width: 150px;
}

.price-group-inline select {
  width: 80px;
}

.small-input {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

input::placeholder {
  color: #888;
  font-weight: normal;
}

.submit-btn {
  width: 300px;
  padding: 1rem;
  background-color: #ff8c00;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;
  display: block;
}

.submit-btn:hover {
  background-color: #ff8c00;
}
</style>
