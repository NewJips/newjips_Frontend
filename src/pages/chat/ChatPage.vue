<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import chatApi from '@/api/chatApi';
import { useChatStore } from '@/stores/chat';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const router = useRouter();
const chatStore = useChatStore();
const auth = useAuthStore();
const uno = computed(() => auth.uno);

//////////////////////// 데이터 ///////////////////////////
const chatMsg = ref([]);
const chatRooms = ref([]);
const chatRoomid = ref(0);
const chatName = ref('');
const chatImg = ref('');
const isSender = ref(false);
const msgContent = ref('');
const pollingInterval = ref(null);
////////////////////////////////////////////////////////

const requestChatRoomSetting = async () => {
  chatRooms.value = await chatApi.getRoomList(uno.value);

  if (chatRooms.value.length > 0) {
    requestChatMsg(chatRooms.value[0]);
    chatRoomid.value = chatRooms.value[0].cno;
    if (chatRooms.value[0].requesterFrom) {
      chatName.value = chatRooms.value[0].toName;
      chatImg.value = chatRooms.value[0].toImg;
    } else {
      chatName.value = chatRooms.value[0].fromName;
      chatImg.value = chatRooms.value[0].fromImg;
    }
    isSender.value = chatRooms.value[0].requesterFrom;
  }
};

// 폴링할 요청
const requestChatRoom = async () => {
  try {
    chatRooms.value = await chatApi.getRoomList(uno.value);
  } catch (error) {
    console.error('폴링 중 오류 발생: ', error);
  }
};

// 폴링할 요청
const requestChatMsgPolling = async () => {
  chatMsg.value = await chatApi.getChatMsgList(chatRoomid.value, uno.value);
};

const requestChatMsg = async (room) => {
  chatMsg.value = await chatApi.getChatMsgList(room.cno, uno.value);
  chatRoomid.value = room.cno;
  if (room.requesterFrom) {
    chatName.value = room.toName;
    chatImg.value = room.toImg;
  } else {
    chatName.value = room.fromName;
    chatImg.value = room.fromImg;
  }
  isSender.value = room.requesterFrom;

  await nextTick();
  scrollToBottom();
};

// 메시지 전송 후 작동시킬 요청
const requestChatMsgAfterSend = async (roomid, uno) => {
  chatMsg.value = await chatApi.getChatMsgList(roomid, uno);

  await nextTick();
  scrollToBottom();
};

const requestSendMsg = async () => {
  const data = {
    roomId: chatRoomid.value,
    content: msgContent.value,
    fromSender: isSender.value,
  };

  try {
    const result = await chatApi.sendMsg(data);
    if (result != null) {
      msgContent.value = '';
      requestChatMsgAfterSend(chatRoomid.value, uno.value);
      requestChatRoom();
    }
  } catch (error) {
    console.error('메시지 전송 중 오류 발생 : ', error);
  }
};

// 폴링을 시작하는 함수
const startPolling = () => {
  pollingInterval.value = setInterval(() => {
    requestChatRoom();
    requestChatMsgPolling();
    console.log('폴링 send');
  }, 500); // 5000ms (5초) 간격으로 폴링
};

// 폴링을 중단하는 함수
const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
};

// 날짜 포맷 함수
const formatDateForRoom = (date) => {
  const d = new Date(date);
  const now = new Date();

  // 오늘인지 확인
  const isToday = d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

  if (isToday) {
    // 오늘이면 시:분만 표시
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  } else {
    // 오늘이 아니면 날짜만 표시 (년-월-일 형식)
    return d.toLocaleDateString();
  }
};

const formatDateForChat = (date) => {
  const d = new Date(date);
  const now = new Date();

  // 오늘인지 확인
  const isToday = d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

  if (isToday) {
    // 오늘이면 시:분만 표시
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  } else {
    // 오늘이 아니면 년-월-일 시:분 형식으로 표시
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  }
};

// 스크롤을 가장 아래로 이동하는 함수
const scrollToBottom = () => {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// 컴포넌트가 마운트되면 폴링을 시작
onMounted(() => {
  startPolling();
});

// 컴포넌트가 언마운트될 때 폴링을 중단
onBeforeUnmount(() => {
  stopPolling();
});

requestChatRoomSetting();
</script>

<template>
  <div style="background-color: #f2f5f9">
    <!-- Container fluid -->
    <div class="container-fluid px-0" style="height: 90vh">
      <!-- 채팅방 없는 경우 -->
      <div v-if="chatRooms.length == 0">
        <div class="row align-items-center">
          <div class="col-5 ps-5 text-start" style="font-size: xx-large">
            아직 채팅이 없어요.<br />
            버디즈와 채팅해보세요 !
          </div>
          <div class="col-7 text-center pt-4">
            <img src="@/assets/images/Chatting-cuate.png" style="height: 80vh" class="img-fluid" />
          </div>
        </div>
      </div>

      <!-- 채팅방 있는 경우 -->
      <div v-else class="row g-0">
        <div class="col-xl-3 col-lg-12 col-md-12 col-12">
          <div class="bg-white border-end border-top" style="height: 90vh">
            <!-- chat list -->
            <div class="chat-window">
              <div class="bg-white">
                <div class="px-4 pt-3 pb-4">
                  <!-- heading -->
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 class="fw-bold">{{ t('common.chat') }}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div data-simplebar style="height: 80vh; overflow: auto">
                <!-- tab content -->
                <div class="tab-content" id="tabContent">
                  <!-- tab pane -->
                  <div class="tab-pane fade show active" id="recent" role="tabpanel" aria-labelledby="recent-tab">
                    <!-- 채팅방 리스트 -->
                    <ul class="list-unstyled contacts-list">
                      <div v-for="room in chatRooms" :key="room.cno">
                        <li class="py-3 px-4 chat-item contacts-item" v-on:click="requestChatMsg(room)">
                          <div class="d-flex justify-content-between align-items-center">
                            <a href="#" class="text-link contacts-link">
                              <!-- media -->
                              <div class="d-flex">
                                <div class="avatar avatar-md">
                                  <img :src="room.requesterFrom ? room.toImg : room.fromImg" alt="" class="rounded-circle" />
                                </div>
                                <!-- media body -->
                                <div class="ms-2">
                                  <h5 class="mb-0">{{ room.requesterFrom ? room.toName : room.fromName }}</h5>
                                  <p class="mb-0 text-muted text-truncate">
                                    {{ room.content }}
                                  </p>
                                </div>
                              </div>
                            </a>
                            <div>
                              <small class="text-muted">{{ formatDateForRoom(room.updateAt) }}</small>
                              <div class="text-end">
                                <span
                                  v-if="(room.requesterFrom ? room.senderUnreadCount : room.receiverUnreadCount) > 0"
                                  class="icon-shape icon-xs text-white bg-danger rounded-circle fw-bold fs-6"
                                >
                                  N
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-12 col-md-12 col-12">
          <!-- chat list -->
          <div class="chat-body w-100 vh-100" data-simplebar="">
            <div class="bg-white border-top border-bottom px-4 py-3">
              <div class="d-flex justify-content-between align-items-center">
                <!-- 채팅 상대 정보 -->
                <div class="d-flex align-items-center">
                  <a href="#" class="me-2 d-xl-none d-block" data-close><i class="fe fe-arrow-left"></i></a>
                  <div class="avatar avatar-md">
                    <img :src="chatImg" alt="" class="rounded-circle" />
                  </div>
                  <!-- media body -->
                  <div class="ms-2">
                    <h4 class="mb-0">{{ chatName }}</h4>
                  </div>
                </div>
              </div>
            </div>
            <!-- chating List -->
            <div id="chat-messages" class="flex px-4 py-4 overflow-auto" style="height: 70vh">
              <div v-for="msg in chatMsg" :key="msg.id">
                <div v-if="isSender && msg.fromSender == 1">
                  <!-- 보낸 메시지 (내가 formSender일때) -->
                  <div class="d-flex justify-content-end mb-4">
                    <div class="d-flex w-lg-40">
                      <!-- media body -->
                      <div class="me-3 text-end">
                        <small>{{ formatDateForChat(msg.createAt) }}</small>
                        <div class="d-flex justify-content-end">
                          <!-- card -->
                          <div class="card mt-2 rounded-top-md-end-0 text-white" style="background-color: #8892a0">
                            <!-- card body -->
                            <div class="card-body text-start p-3">
                              <p class="mb-0">
                                {{ msg.content }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else-if="isSender && msg.fromSender == 0">
                  <!-- 받은 메시지 (내가 formSender일때) -->
                  <div class="d-flex w-lg-40 mb-4">
                    <!-- media body -->
                    <div class="ms-3">
                      <small>{{ formatDateForChat(msg.createAt) }}</small>
                      <div class="d-flex">
                        <div class="card mt-2 rounded-top-md-left-0">
                          <div class="card-body p-3">
                            <p class="mb-0 text-dark">
                              {{ msg.content }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else-if="!isSender && msg.fromSender == 0">
                  <!-- 보낸 메시지 (상대가 formSender일때) -->
                  <div class="d-flex justify-content-end mb-4">
                    <div class="d-flex w-lg-40">
                      <!-- media body -->
                      <div class="me-3 text-end">
                        <small>{{ formatDateForChat(msg.createAt) }}</small>
                        <div class="d-flex justify-content-end">
                          <!-- card -->
                          <div class="card mt-2 rounded-top-md-end-0 text-white" style="background-color: #8892a0">
                            <!-- card body -->
                            <div class="card-body text-start p-3">
                              <p class="mb-0">
                                {{ msg.content }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else-if="!isSender && msg.fromSender == 1">
                  <!-- 받은 메시지 (상대가 formSender일때) -->
                  <div class="d-flex w-lg-40 mb-4">
                    <!-- media body -->
                    <div class="ms-3">
                      <small>{{ formatDateForChat(msg.createAt) }}</small>
                      <div class="d-flex">
                        <div class="card mt-2 rounded-top-md-left-0">
                          <div class="card-body p-3">
                            <p class="mb-0 text-dark">
                              {{ msg.content }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- insert place -->
            <div class="px-4 py-3 mt-auto">
              <div class="bg-white p-1 rounded-3 shadow-sm">
                <div class="position-relative">
                  <input
                    v-model="msgContent"
                    class="form-control border-0 form-control-simple no-resize"
                    :placeholder="t('common.chatting.placeholder')"
                    rows="1"
                    @keydown.enter="requestSendMsg()"
                  />
                </div>
                <div class="position-absolute end-0 mt-n6 me-4">
                  <button class="btn btn-focus-none" v-on:click="requestSendMsg()">
                    <img src="@/assets/icons/icon_send.svg" style="height: 26px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1199.98px) {
  .chat-layout .chat-body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1020;
    visibility: hidden;
    transform: translateX(100%);
    transition: transform 0.3s ease, visibility 0.3s ease;
    background: #f5f4f8;
  }
}

@media (max-width: 1199.98px) {
  .chat-layout .chat-body.chat-body-visible {
    visibility: visible;
    transform: translateX(0);
  }
}

.text-truncate {
  width: 18vh; /* 텍스트가 잘려야 하는 너비를 설정 (원하는 크기로 변경 가능) */
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
  overflow: hidden; /* 넘치는 텍스트는 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분을 '...'로 표시 */
}

.btn.btn-focus-none:focus {
  box-shadow: none;
}

.btn {
  --bs-btn-bg: transparent;
  --bs-btn-border-color: transparent;
}

.position-relative {
  position: relative !important;
}

.mt-auto {
  margin-top: auto !important;
}

.position-absolute {
  position: absolute !important;
}

.mt-n6 {
  margin-top: -2.5rem !important;
}

.mt-n7 {
  margin-top: -3rem !important;
}

.rounded-circle {
  border-radius: 50% !important;
}

.border-end {
  border-right: 1px solid #ecebf1 !important;
}

.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}

.fw-bold {
  font-weight: 700 !important;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.chat-item {
  position: relative;
  transition: background-color 0.3s;
}

.chat-item:hover {
  background-color: #f5f4f8;
}

.avatar {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 3rem;
}

.avatar-md {
  width: 2.5rem;
  height: 2.5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.text-muted {
  --bs-text-opacity: 1;
  color: #a8a3b9 !important;
}

.text-muted {
  --bs-text-opacity: 1;
  color: #a8a3b9 !important;
}

.text-end {
  text-align: right !important;
}

.icon-shape {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}

.icon-xs {
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
}

.text-white {
  --bs-text-opacity: 1;
  color: #fff !important;
}

.fs-6 {
  font-size: 0.75rem !important;
}

.text-link {
  color: #5c5776;
  text-decoration: none;
}
</style>
