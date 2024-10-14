<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'; 
import buddizIntroApi from '@/api/buddizIntroApi'; 
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale, t } = useI18n(); // Using locale and t for translation

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
    alert(t('alerts.not_logged_in')); // Use t() for translated alert
    return;
  }

  try {
    const data = await buddizIntroApi.getBuddizIntro(userUno);
    console.log('Fetched data from API:', data);

    if (data) {
      residence.value = data.location || '';
      koreaExperience.value = data.liveInKr || '';
      accompanyRegion.value = data.accompanyRegion || '';
      transactionCount.value = data.hiredTimes || '';
      description.value = data.selfInfo || '';
      price.value = data.cost || 0;
      currencyUnit.value = data.currency || '$';
      selectedCharacteristics.value = data.personality ? data.personality.split(',') : [];
      selectedLanguages.value = data.useLan ? data.useLan.split(',') : [];
    } else {
      console.warn('No data found for the user');
    }
  } catch (error) {
    console.error(t('common.errors.fetch_failed'), error);
  }
});

// Form submission
const submitForm = async () => {  
  const authStore = useAuthStore();
  const userUno = authStore.uno;

  if (!userUno) {
    alert(t('common.alerts.not_logged_in'));
    return;
  }

  const formData = {
    uno: userUno,  
    liveInKr: koreaExperience.value || 0,  
    personality: selectedCharacteristics.value.join(',') || t('common.buddizForm.unknown'), 
    cost: price.value || 0,  
    hiredTimes: transactionCount.value || 0,  
    rating: 5.0,  
    selfInfo: description.value || t('common.buddizForm.no_description'),  
    lan: locale.value === 'ko' ? 'KR' : 'VN',  
    location: residence.value || t('common.buddizForm.unknown'),  
    useLan: selectedLanguages.value.join(',') || t('common.buddizForm.unknown'),  
  };

  try {
    const response = await buddizIntroApi.saveOrUpdateBuddizIntro(formData);
    console.log('Form submission response:', response);
    alert(t('common.alerts.form_submitted'));
    router.push('/mypage/mystatus');
  } catch (error) {
    console.error(t('common.errors.submit_failed'), error);
    alert(t('common.errors.submit_failed'));
  } 
};
</script>

<template>
  <div class="fluid-container">
    <div class="type-header">
      <h2>{{ t('common.buddizForm.header') }}</h2>
      <div style="font-size: 17pt; margin-top: 8pt;">{{ t('common.buddizForm.subtitle') }}</div>
    </div>

    <!-- Basic Info Section -->
    <div class="fluid-container px-5 pt-5 pb-5" style="background-color: #fbfbfc;">
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> {{ t('common.buddizForm.basic_info') }}</h2>

        <div class="input-group">
          <label for="residence">{{ t('common.buddizForm.residence') }}</label>
          <select v-model="residence" id="residence">
            <option value="" disabled>{{ t('common.buddizForm.select_region') }}</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>

        <div class="input-group">
          <label for="koreaExperience">{{ t('common.buddizForm.korea_experience') }}</label>
          <input v-model="koreaExperience" type="number" id="koreaExperience" :placeholder="t('common.buddizForm.enter_years')" />
        </div>
      </section>

      <!-- Description Section -->
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> {{ t('common.buddizForm.description') }}</h2>
        <textarea v-model="description" :placeholder="t('common.buddizForm.enter_description')" maxlength="8000"></textarea>
        <span class="character-limit">{{ 8000 - description.length }} {{ t('common.buddizForm.characters_left') }}</span>
      </section>

      <!-- Accompany Region and Transaction Count -->
      <section class="section-card">
        <h2 class="section-title"><i class="section-icon"></i> {{ t('common.buddizForm.additional_info') }}</h2>
        <div class="input-group">
          <label for="accompanyRegion">{{ t('common.buddizForm.accompany_region') }}</label>
          <select v-model="accompanyRegion" id="accompanyRegion">
            <option value="" disabled>{{ t('common.buddizForm.select_region') }}</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>

        <div class="input-group">
          <label for="transactionCount">{{ t('common.buddizForm.transaction_count') }}</label>
          <input v-model="transactionCount" type="number" id="transactionCount" :placeholder="t('buddizForm.enter_transactions')" />
        </div>
      </section>

      <!-- Characteristics and Languages -->
      <section class="section-card">
        <div class="checkbox-group">
          <h4>{{ t('common.buddizForm.characteristics') }}</h4>
          <div class="left-align">
            <div v-for="(characteristic, index) in characteristics" :key="index" class="checkbox-item">
              <input type="checkbox" :id="'char-' + index" :value="characteristic" v-model="selectedCharacteristics" />
              <label :for="'char-' + index">{{ characteristic }}</label>
            </div>
          </div>
        </div>

        <div class="checkbox-group">
          <h4>{{ t('common.buddizForm.languages') }}</h4>
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
        <h2 class="section-title"><i class="section-icon"></i> {{ t('common.buddizForm.price') }}</h2>
        <label for="price">{{ t('common.buddizForm.price_label') }} <span class="required-asterisk">*</span></label>
        <div class="price-group-inline">
          <input v-model="price" type="number" :placeholder="t('common.buddizForm.min')" min="0" id="price" />
          <select v-model="currencyUnit">
            <option value="$">$</option>
            <option value="€">w</option>
            <option value="₫">₫</option>
          </select>
        </div>
      </section>

      <button class="submit-btn" @click="submitForm">{{ t('common.buddizForm.submit') }}</button>
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

