<script setup>
import MenuItem from './MenuItem.vue';

import { useI18n } from 'vue-i18n'; // i18n 사용
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import router from '@/router';
import chatApi from '@/api/chatApi';

// 이미지 가져오기
const messageIcon = new URL('@/assets/icons/message.png', import.meta.url).href;
console.log('Avatar URL:', messageIcon); // URL 확인
const messageOnIcon = new URL('@/assets/icons/messageon.png', import.meta.url).href;
console.log('Avatar URL:', messageOnIcon); // URL 확인

const messageIconUrl = ref(messageIcon);
const messageOnIconUrl = ref(messageOnIcon);

// import messageIcon from '@/assets/icons/message.png';
// import messageOnIcon from '@/assets/icons/messageon.png';

const props = defineProps({
  menus: { Type: Array, required: true },
});

// i18n 훅 사용
const { t, locale } = useI18n(); // locale도 가져옵니다.
const changing = (lan) => {
  locale.value = lan; // 언어 변경 로직
  console.log(`Language changed to: ${lan}`); // 콘솔에 언어 변경 확인
  // 언어 변경 로직
};

const displayLanguage = computed(() => {
  return locale.value === 'ko' ? '한국어' : 'vietnamese';
});

// 채팅 활성화 여부를 나타내는 ref
const isChatActive = ref(false); // 필요에 따라 true로 설정

///////// 안읽은 메시지 확인 /////////
const uno = '97';
const pollingInterval = ref(null);

const requestChatRoom = async () => {
  try {
    const chatRooms = await chatApi.getRoomList(uno);
    const cnt = ref(0);
    chatRooms.forEach((room) => {
      if ((room.requesterFrom && room.senderUnreadCount > 0) || (!room.requesterFrom && room.receiverUnreadCount > 0)) {
        cnt.value++;
      }

      if (cnt.value > 0) isChatActive.value = true;
      else isChatActive.value = false;
    });
  } catch (error) {
    // console.error('폴링 중 오류 발생: ', error);
  }
};

// 폴링을 시작하는 함수
const startPolling = () => {
  pollingInterval.value = setInterval(() => {
    requestChatRoom(); // 일정 간격으로 메시지를 가져옴
  }, 1000); // 5000ms (5초) 간격으로 폴링
};

// 폴링을 중단하는 함수
const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
};

// 컴포넌트가 마운트되면 폴링을 시작
onMounted(() => {
  startPolling();
});

// 컴포넌트가 언마운트될 때 폴링을 중단
onBeforeUnmount(() => {
  stopPolling();
});
</script>

<template>
  <ul class="navbar-nav">
    <MenuItem v-for="menu in menus" :menu="menu" />
  </ul>
</template>
