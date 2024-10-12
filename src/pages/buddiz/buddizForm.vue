<!-- buddizForm.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; 
import buddizIntroApi from '@/api/buddizIntroApi'; 
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale } = useI18n(); 

// Form fields
const residence = ref('');
const koreaExperience = ref('');
const accompanyRegion = ref('');
const transactionCount = ref('');
const description = ref('');
const price = ref(0);
const currencyUnit = ref('$');
const selectedCharacteristics = ref([]);
const selectedLanguages = ref([]);

// Example lists for checkboxes
const characteristics = ['Friendly', 'Emotional', 'Calm', 'Energetic', 'Silent', 'Organized', 'Sociable'];
const languages = ['Vietnamese', 'Korean'];
const regions = ['서울', '부산', '대구', '인천', '광주'];

// Fetch and pre-fill data if it exists
onMounted(async () => {
  const authStore = useAuthStore();
  const userUno = authStore.uno;

  if (!userUno) {
    alert('User not logged in. Please log in to view the form.');
    return;
  }

  try {
    const data = await buddizIntroApi.getBuddizIntro(userUno);
    
    // Debugging: Log the raw fetched data
    console.log('Fetched data from API:', data);

    if (data) {
      // Make sure the properties exist in the fetched data
      console.log('Location:', data.location);
      console.log('Live in Korea experience:', data.liveInKr);
      
      // Pre-fill the form with existing data (adding fallback empty strings)
      residence.value = data.location || '';
      koreaExperience.value = data.liveInKr || '';
      accompanyRegion.value = data.accompanyRegion || '';
      transactionCount.value = data.hiredTimes || '';
      description.value = data.selfInfo || '';
      price.value = data.cost || 0;
      currencyUnit.value = data.currency || '$';
      selectedCharacteristics.value = data.personality ? data.personality.split(',') : [];
      selectedLanguages.value = data.useLan ? data.useLan.split(',') : [];
      
      // Log the values that are being set to confirm they are being assigned
      console.log('Pre-filled residence:', residence.value);
      console.log('Pre-filled characteristics:', selectedCharacteristics.value);
    } else {
      console.warn('No data found for the user');
    }
  } catch (error) {
    console.error('Failed to fetch existing Buddiz data:', error);
  }
});


// Form submission
const submitForm = async () => {  
  const authStore = useAuthStore();
  const userUno = authStore.uno;

  if (!userUno) {
    alert('User not logged in. Please log in to submit your form.');
    return;
  }

  const formData = {
    uno: userUno,  
    liveInKr: koreaExperience.value || 0,  
    personality: selectedCharacteristics.value.join(',') || 'Unknown', 
    cost: price.value || 0,  
    hiredTimes: transactionCount.value || 0,  
    rating: 5.0,  
    selfInfo: description.value || 'No description provided',  
    lan: locale.value === 'ko' ? 'KR' : 'VN',  
    location: residence.value || 'Unknown',  
    useLan: selectedLanguages.value.join(',') || 'Unknown',  
  };

  try {
    const response = await buddizIntroApi.saveOrUpdateBuddizIntro(formData);
    console.log('Form submission response:', response);
    alert('Form submitted successfully!');
    router.push('/mypage/mystatus');  // Redirect after successful submission
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
        <div class="checkbox-group">
          <h4>성격</h4>
          <div class="left-align">
            <div v-for="(characteristic, index) in characteristics" :key="index" class="checkbox-item">
              <input type="checkbox" :id="'char-' + index" :value="characteristic" v-model="selectedCharacteristics" />
              <label :for="'char-' + index">{{ characteristic }}</label>
            </div>
          </div>
        </div>

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

      <!-- Price Section -->
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> Price</h2>
        <label for="price">Price (per night) <span class="required-asterisk">*</span></label>
        <div class="price-group-inline">
          <input v-model="price" type="number" placeholder="Min" min="0" id="price" />
          <select v-model="currencyUnit">
            <option value="$">$</option>
            <option value="€">w</option>
            <option value="₫">₫</option>
          </select>
        </div>
      </section>

      <button class="submit-btn" @click="submitForm">저장하기</button>
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

