<template>
    <div class="container-fluid px-0 py-0" style="height: 92vh;" >
      <div class="chat-container" style="background-color: #F2F5F9;">
        <div class="chat-body">
          <div id="chat-messages"  class="flex px-4 py-4 overflow-auto" style="height: 82vh;">

            <div>
              <!-- 받은 메시지 케이스 -->
              <div class="d-flex flex-column w-lg-40 mb-4" style="margin-right: 55vh;">
                <div class="ms-3 mb-2">
                  <img
                    src="../../assets/images/ai_profile.png"
                    alt=""
                    class="rounded-circle avatar-md"
                    style="object-fit: contain; border: 1px solid #caced4;"
                  />
                  <span class="ms-2" style="font-weight: 500; color: #353B43;">{{ t('common.chatting.torry') }}</span>
                </div>

                <!-- media body -->
                <div class="ms-3">
                  <div class="d-flex">
                    <div class="card mt-2 rounded-top-md-left-0">
                      <div class="card-body p-3">
                        <p class="mb-0 text-dark" v-html="t('common.chatting.aiIntro')"></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="ms-3">
                  <div class="flex" style="margin-right: 65.2vh;" @click="sendBtnMessage(0)">
                    <div class="card mt-2 rounded-top-md-left-0" style="background-color: #FF8F18; border: none; cursor: pointer;">
                      <div class="card-body p-3" >
                        <h6 class="mb-0" style="text-align: center; color: white; font-weight: 600; letter-spacing: 2px;">
                          {{ t('common.chatting.special_terms') }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="ms-3">
                  <div class="flex" style="margin-right: 65.2vh;" @click="sendBtnMessage(1)">
                    <div class="card mt-2 rounded-top-md-left-0" style="background-color: #FF8F18; border: none; cursor: pointer;">
                      <div class="card-body p-3">
                        <h6 class="mb-0" style="text-align: center; color: white; font-weight: 600; letter-spacing: 2px;">
                          {{ t('common.chatting.insurance') }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-for="message in messages" :key="message.id">
                <div v-if="message.isUser">
                  <!-- 보낸 메시지 케이스 -->
                  <div class="d-flex justify-content-end mb-4" style="margin-left: 55vh;">
                    <div class="d-flex w-lg-40">
                      <!-- media body -->
                      <div class=" me-3 text-end">
                        <div class="d-flex">
                          <!-- card -->
                          <div
                            class="card mt-2 rounded-top-md-end-0 text-white" style="background-color: #8892A0;">
                            <!-- card body -->
                            <div class="card-body text-start p-3">
                              <p class="mb-0">
                                {{ message.text }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              <div v-else>
                <!-- 받은 메시지 케이스 -->
                <div class="d-flex flex-column w-lg-40 mb-4" style="margin-right: 55vh;">
                  <div class="ms-3 mb-2">
                    <img
                      src="../../assets/images/ai_profile.png"
                      alt=""
                      class="rounded-circle avatar-md"
                      style="object-fit: contain; border: 1px solid #caced4;"
                    />
                    <span class="ms-2" style="font-weight: 500; color: #353B43;">뉴집스 토리</span>
                  </div>

                  <!-- media body -->
                  <div class="ms-3">
                    <div class="d-flex">
                      <div class="card mt-2 rounded-top-md-left-0">
                        <div class="card-body p-3">
                          <p class="mb-0 text-dark">
                            {{ message.text }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="isLoading" class="loading-animation ms-3">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
            
        <div id="user-input" class="mt-auto px-3 py-3">
          <div class="bg-white p-1 shadow-sm rounded-3">
            <div class="position-relative">
              <input
                class="form-control border-0 form-control-simple no-resize"
                :placeholder="t('common.chatting.placeholder')"
                v-model="userMessage"
                rows="1"
                @keydown.enter="sendMessage()"
              />
            </div>
            <div class="position-absolute end-0 mt-n6 me-4">
              <button
                v-on:click="sendMessage()"
                class="btn btn-focus-none">
                <img src="@/assets/icons/icon_send.svg" style="height: 26px;"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useI18n } from 'vue-i18n';
  import { useChatStore } from '@/stores/chat';
  import { ref, onBeforeUnmount, onMounted } from 'vue';

  export default {
    data() {
      return {
        userMessage: '',
        apiEndpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey:   process.env.VUE_APP_OPENAI_API_KEY,
      };
    },
    setup() {
      const { t, locale } = useI18n();
      const chatStore = useChatStore();
      const messages = ref([]);
      const isLoading = ref(false);

      // 컴포넌트가 마운트될 때 Pinia에서 messages 불러오기
      onMounted(() => {
        console.log('컴포넌트가 마운트되었습니다. Pinia에서 messages 불러오기 ', chatStore.getMessages);
        if (chatStore.getMessages.length > 0) {
          messages.value = chatStore.getMessages;  // Pinia에서 messages 불러오기
        }
      });

      onBeforeUnmount(() => {
        console.log('컴포넌트 파괴 직전, messages 저장', messages.value);
        chatStore.setMessages(messages.value);  // messages를 Pinia에 저장
      });

      return {
        t,  // 번역 함수
        locale,  // 현재 로케일
        messages,
        isLoading
      };
    },
    methods: {
      messageClass(message) {
        return message.isUser ? 'message user-message' : 'message ai-message';
      },
      addUserMessage(message) {
        this.messages.push({ text: message, isUser: true, id: Date.now() });  // push()로 메시지를 아래로 추가
        this.$nextTick(() => this.scrollToBottom());  // 메시지 추가 후 스크롤 맨 아래로 이동
      },
      scrollToBottom() {
            const chatBody = this.$refs.chatBody; // chat-body 참조
            chatBody.scrollTop = chatBody.scrollHeight; // 스크롤을 가장 아래로 이동
        },
      addAIMessage(message) {
        this.messages.push({ text: message, isUser: false, id: Date.now() });
        this.$nextTick(() => this.scrollToBottom());  // AI 메시지 추가 후 스크롤 맨 아래로 이동
      },
      async fetchAIResponse(prompt) {
        if (prompt.toLowerCase() === "xin chào") {
          return "Xin chào! Tôi có thể giúp gì cho bạn?";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ý nghĩa")) {
          return "Điều này có nghĩa là một điều khoản đặc biệt được đồng ý và điền vào các tài liệu chính thức sẽ được lập.";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("lý do")) {
          return "Việc ghi rõ các điều khoản đặc biệt có thể ngăn ngừa hoặc giải quyết các tranh chấp có thể phát sinh sau này, và vì hợp đồng bằng miệng không có hiệu lực pháp lý, nên tốt nhất là cần được lập thành văn bản.";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("hiệu lực")) {
          return "'Điều khoản đặc biệt' là một cam kết đặc biệt giữa các bên. Hợp đồng mua bán bất động sản là một 'hợp đồng tư nhân' được ký kết giữa cá nhân với cá nhân. Do đó, dù có 규 định khác trong luật pháp, các điều khoản đặc biệt giữa các bên vẫn được ưu tiên áp dụng.\n" +
              "\n" +
              "Tuy nhiên, dù là điều khoản đặc biệt, nếu vi phạm các bắt buộc gây hại cho trật tự xã hội (các pháp luật liên quan đến trật tự công cộng), thì sẽ không có.\n" +
              "\n" +
              "Ngoài ra, trong trường hợp hành vi của chủ nhà liên quan đến việc hoàn trả tiền đặt cọc bị coi là vi phạm các điều khoản đặc biệt trong hợp đồng, việc có được bồi thường hay không cũng có thể khác nhau tùy theo luật pháp liên quan. Do đó, để xác định liệu bạn có thể nhận được bồi thường hợp pháp hay không, tốt nhất là tham khảo ý kiến của chuyên gia pháp lý hoặc luật sư tại quốc gia đó.";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("lưu ý")) {
          return "Có một số trường hợp hiểu lầm rằng chỉ cần ghi chú ý vào điều khoản đặc biệt thì sẽ có pháp lý, nhưng điều này không đúng. \n" +
              "\n" +
              "Các điều khoản đặc biệt trái với quy định bắt buộc sẽ không có pháp lý, ngay cả khi được lập thành văn bản.\n" +
              "\n" +
              "Nói cách khác, các điều khoản đặc biệt vi phạm pháp luật sẽ không có pháp lý ngay cả khi được ghi vào hợp đồng.\n" +
              "\n" +
              "Do đó, ngay cả khi ghi các nội dung vi phạm pháp luật để ép buộc hoặc ràng buộc đối phương, điều này cũng không có pháp lý. Nếu bạn ghi các nội dung vi phạm pháp luật và ép buộc đối phương chấp nhận, bạn có thể sẽ tự gây thiệt hại cho chính mình.";
        }
        if ((prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("vay tiền thuê nhà")) || (prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("câu") && prompt.toLowerCase().includes("vay tiền thuê nhà"))) {
          return "Có một số câu văn đề xuất cho điều khoản đặc biệt về khoản vay tiền đặt cọc nhà thuê.\n" +
              "\n" +
              "- “Trong trường hợp không thể vay tiền đặt cọc do khiếm khuyết của tài sản, hợp đồng sẽ bị hủy bỏ và tiền đặt cọc sẽ được hoàn trả.”\n" +
              "- Người cho thuê sẽ tích cực hợp tác trong việc vay tiền đặt cọc nhà thuê.\n" +
              "- Trong trường hợp không thể tham gia bảo hiểm hoàn trả tiền đặt cọc, hợp đồng sẽ bị hủy bỏ và tiền đặt cọc sẽ được hoàn trả.\n" +
              "(Trước khi lập hợp đồng, nên đến ngân hàng để xác nhận khả năng vay và hạn mức trước khi tiến hành.)\n" +
              "- Tuy nhiên, nếu tiền vay không được giải ngân do vấn đề của người thuê, người thuê sẽ không được hoàn lại tiền đặt cọc hoặc tiền bảo đảm.\n" +
              "\n" +
              "Tôi khuyên bạn nên tham khảo ý kiến của chuyên gia để có được thông tin chính xác hoặc chi tiết hơn.";
        }
        if ((prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("quyền lợi của người thuê nhà ghi trên hợp đồng ")) || (prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("câu") && prompt.toLowerCase().includes("quyền lợi của người thuê nhà ghi trên hợp đồng "))) {
          return "Có một số câu văn đề xuất cho điều khoản đặc biệt về quyền yêu cầu bảo vệ quyền lợi.\n" +
              "\n" +
              "- “Không thiết lập quyền thế chấp hoặc các quyền lợi khác cho đến ngày tiếp theo sau ngày thanh toán số dư.”\n" +
              "- “Quyền thế chấp có ưu tiên sẽ bị xóa trước ngày thanh toán số dư.”\n" +
              "- Vì khả năng phản kháng có từ 0h ngày tiếp theo sau khi đăng ký chuyển đổi địa chỉ cư trú, điều khoản đặc biệt phải quy định không được thiết lập quyền lợi trước đó.\n" +
              "- Quyền thế chấp có ngay trong ngày thiết lập, nhưng ngày đăng ký chuyển đổi địa chỉ cư trú và ngày xác nhận chỉ có từ ngày hôm sau vì nhận được sau khi đăng ký.\n" +
              "\n" +
              "Tôi khuyên bạn nên tham khảo ý kiến của chuyên gia để có được thông tin chính xác hoặc chi tiết hơn.";
        }
        if ((prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("thuế nhà nước")) || (prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("câu") && prompt.toLowerCase().includes("thuế nhà nước"))) {
          return "Có một số câu văn đề xuất cho điều khoản đặc biệt về việc xác nhận hoàn thành thuế quốc gia.\n" +
              "\n" +
              "- “Nhằm bảo vệ người thuê nhà trước việc không nộp thuế.”\n" +
              "- Trong trường hợp người cho thuê chưa nộp thuế quốc gia hoặc thuế địa phương, hợp đồng sẽ bị hủy bỏ.\n" +
              "\n" +
              "Tôi khuyên bạn nên tham khảo ý kiến của chuyên gia để có được thông tin chính xác hoặc chi tiết hơn.";
        }
        if ((prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("quyền được hoàn trả tiền thuê nhà")) || (prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("câu") && prompt.toLowerCase().includes("quyền được hoàn trả tiền thuê nhà"))) {
          return "Có một số câu văn đề xuất cho điều khoản đặc biệt về bảo đảm hoàn trả tiền đặt cọc.\n" +
              "- “Trong trường hợp không thể tham gia bảo hiểm đảm bảo hoàn trả tiền đặt cọc, hợp đồng sẽ bị hủy bỏ.”\n" +
              "Điều quan trọng là phải kiểm tra trước và xác nhận xem bảo hiểm đảm bảo hoàn trả tiền đặt cọc có khả thi hay không trước khi ký hợp đồng.\n" +
              "Tôi khuyên bạn nên tham khảo ý kiến của chuyên gia để có thông tin chính xác và chi tiết hơn.";
        }
        if ((prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("câu")) || (prompt.toLowerCase().includes("ví dụ") && prompt.toLowerCase().includes("câu") && prompt.toLowerCase().includes("nội thất"))) {
          return "Có một số điều khoản đặc biệt liên quan đến các lỗi về nội thất, vật dụng, giấy dán tường và sàn nhà đã được thỏa thuận trước khi dọn vào nhà như sau. \n" +
              "- “Trong trường hợp hư hỏng bên trong do sự bất cẩn của người thuê, người thuê phải khôi phục lại như ban đầu, các hư hỏng lớn do người cho thuê chịu trách nhiệm, và các hư hỏng nhỏ (chi phí sửa chữa dưới 5 triệu đồng, các vật phẩm tiêu hao) do người thuê chịu trách nhiệm.”\n" +
              "“Việc dán giấy dán tường sẽ do người cho thuê chịu trách nhiệm và hoàn thành trước khi dọn vào ở.”\n" +
              "Để có thông tin chính xác hơn hoặc chi tiết hơn, bạn nên tư vấn với chuyên gia.";
        }
  
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "너는 한국 부동산에 관해서 전문가인데, 베트남인을 상대로 한국의 부동산 문화에 대해서 설명을 해 줘야하는 상황이야. 베트남어로 친절하게 대답을 해줘."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.8,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
          }),
        };
  
        try {
          const response = await fetch(this.apiEndpoint, requestOptions);
          const data = await response.json();
          return data.choices[0].message.content;
        } catch (error) {
          console.error('OpenAI API 호출 중 오류 발생:', error);
          return 'OpenAI API 호출 중 오류 발생';
        }
      },
      async sendMessage() {
        this.isLoading = true;

        if (this.userMessage.trim() === '') return;
        const msg = this.userMessage;
        this.userMessage = '';
        this.addUserMessage(msg);

        try {
          const aiResponse = await this.fetchAIResponse(msg);
          this.addAIMessage(aiResponse);  // AI 메시지 추가
        } catch (error) {
          console.error('AI 응답 처리 중 오류 발생:', error);
        } finally {
          this.isLoading = false;
        }
      },
      async sendBtnMessage(type) {
        this.isLoading = true;
        let msg = '';

        if (type == 0) { // 특약이란?
          msg = this.t('common.chatting.special_terms');
          this.addUserMessage(msg);
        } else if (type == 1) { // 보증보험이란?
          msg = this.t('common.chatting.insurance');
          this.addUserMessage(msg);
        }

        try {
          const aiResponse = await this.fetchAIResponse(msg);
          this.addAIMessage(aiResponse);  // AI 메시지 추가
        } catch (error) {
          console.error('AI 응답 처리 중 오류 발생:', error);
        } finally {
          this.isLoading = false;
        }
      },
      scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;  // 채팅 창을 맨 아래로 스크롤
      },
    },
  };
  </script>
  
<style scoped>
.loading-animation {
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 20px 0;
}

.dot {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #888;
  border-radius: 50%;
  animation: bounce 1.2s infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

#chat-container {
    overflow: hidden;
}

#chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.message {
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 70%;
    word-break: break-word;
}

.user-message {
    align-self: flex-end;
    background-color: #1e88e5;
    color: #ffffff;
}

.ai-message {
    align-self: flex-start;
    background-color: #e6e6e6;
}

#user-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    outline: none;
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
</style>