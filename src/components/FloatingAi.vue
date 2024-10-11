<template>
    <div class="ai-container">
      <div class="ai-card">
        <router-link to="/ai" >
          <img src="@/assets/images/chatbot.png">
        </router-link>    
      </div>

      <div class="hidden-text">
        <div v-html="t('common.chatting.desc')"></div>
      </div>
    </div>
    
</template>

<style scoped>
.ai-container{
  position: fixed;      
    bottom: 4vh;
    right: 4vh;      
    z-index: 1000;
    width: 24vh;
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
    align-items: flex-end; /* 오른쪽 끝에 정렬 */
}
.ai-card {    
    background-color: #f88b17;
    padding: 15px;
    width: 10vh;
    border-radius: 50%;  
    box-shadow: 0 8px 8px rgba(204, 102, 13, 0.4); 
    transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  }

  .ai-card img {
    width: 50px;            /* 이미지 크기 조정 */
    height: 50px;
    object-fit: inherit;
  }
  .hidden-text {
    visibility: hidden;
    opacity: 0;
    display: flex;
    transition: visibility 0.25s, opacity 0.25s ease-in-out;  
    position: absolute;      
    background-color: #9c9c9c;
    color: white;
    padding: 10px;
    border-radius: 3px;
    bottom: 13vh;
}
  .ai-card:hover + .hidden-text {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;
  }
  .ai-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 16px rgba(204, 102, 13, 0.4); 
  }
</style>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>