<!-- FormComponent.vue -->
<script setup>
import { ref } from 'vue';

const nickname = ref('');
const residence = ref('');
const koreaExperience = ref('');
const accompanyRegion = ref('');
const transactionCount = ref('');
const description = ref('');
const price = ref(0);
const currencyUnit = ref('$'); // Default currency unit
const photos = ref([]);
const selectedCharacteristics = ref([]);
const selectedLanguages = ref([]);

// Example lists for checkboxes
const characteristics = ['Friendly', 'Emotional', 'Calm', 'Energetic', 'Silent', 'Organized', 'Sociable'];
const languages = ['English', 'Vietnamese', 'Korean', 'Chinese'];

// Regions dropdown options
const regions = ['서울', '부산', '대구', '인천', '광주'];

const handleFileUpload = (event) => {
  const files = event.target.files || event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photos.value.push(e.target.result);
    };
    reader.readAsDataURL(files[i]);
  }
};

const handleDragOver = (event) => {
  event.preventDefault(); // Necessary to allow drop
  event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy
};

const handleDrop = (event) => {
  event.preventDefault();
  handleFileUpload(event); // Use the same handler for both input and drop
};

const submitForm = () => {
  const formData = {
    nickname: nickname.value,
    residence: residence.value,
    koreaExperience: koreaExperience.value,
    accompanyRegion: accompanyRegion.value,
    transactionCount: transactionCount.value,
    selectedCharacteristics: selectedCharacteristics.value,
    selectedLanguages: selectedLanguages.value,
    description: description.value,
    price: price.value,
    currencyUnit: currencyUnit.value,
    photos: photos.value,
  };
  console.log(formData);
  alert('Form submitted!');
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

        <!-- Photos Section with Simplified Design and Drag-and-Drop -->
        <section class="section-card">
          <h2 class="section-title"><i class="section-icon"></i> Photos</h2>
          <div class="info-box">
            <p>The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first. The maximum video size
              is 10 MB. Formats: mp4, mov.</p>
          </div>
          <div class="drag-and-drop-box" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
            <label class="upload-btn">
              <input type="file" @change="handleFileUpload" multiple aria-label="Upload photos" />
              <span>Upload photos</span>
            </label>
            <p>or drag them in</p>
          </div>

          <!-- Show photo previews if photos are uploaded -->
          <div v-if="photos.length">
            <div v-for="(photo, index) in photos" :key="index" class="photo-preview">
              <img :src="photo" />
            </div>
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

.photo-preview {
  margin-top: 1rem;
}

img {
  max-width: 100px;
  border-radius: 8px;
  margin-right: 1rem;
}

.info-box {
  background-color: #e0f7ff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #333;
}

.price-group-inline {
  display: flex;
  flex-direction: row;
  /* Keeps the input and dropdown in a row */
  gap: 1rem;
  align-items: center;
}

.price-group-inline input {
  width: 150px;
  /* Smaller input box for price */
}

.price-group-inline select {
  width: 80px;
  /* Smaller dropdown for the currency */
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

.drag-and-drop-box {
  padding: 1.5rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #f8f8f8;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-btn {
  background-color: #ff8c00;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.upload-btn input {
  display: none;
}

p {
  margin-top: 0.5rem;
  color: #777;
}

.required-asterisk {
  color: red;
  margin-left: 0.2rem;
}

.checkbox-group h4 {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
