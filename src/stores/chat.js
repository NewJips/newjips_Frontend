import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useChatStore = defineStore('chat', {
    state: () => ({
      savedMessages: [],  // 저장된 메시지 목록
    }),
    actions: {
      setMessages(messages) {
        this.savedMessages = messages;  // 메시지 저장
      }
    },
    getters: {
      getMessages: (state) => state.savedMessages  // 저장된 메시지 반환
    }
});