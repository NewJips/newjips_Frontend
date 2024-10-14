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
        if (chatStore.getMessages.length > 0) {
          messages.value = chatStore.getMessages;  // Pinia에서 messages 불러오기
        }
      });

      onBeforeUnmount(() => {
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
        if (prompt.toLowerCase() === "Xin chào") {
          return "Xin chào! Tôi có thể giúp gì cho bạn?";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("ý nghĩa")) {
          return "Điều này có nghĩa là một điều khoản đặc biệt được đồng ý và điền vào các tài liệu chính thức sẽ được lập.";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("lý do")) {
          return "Việc ghi rõ các điều khoản đặc biệt có thể ngăn ngừa hoặc giải quyết các tranh chấp có thể phát sinh sau này, và vì hợp đồng bằng miệng không có hiệu lực pháp lý, nên tốt nhất là cần được lập thành văn bản.";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("hiệu lực")) {
          return "'Điều khoản đặc biệt' là một cam kết đặc biệt giữa các bên. Hợp đồng mua bán bất động sản là một 'hợp đồng tư nhân' được ký kết giữa cá nhân với cá nhân. Do đó, dù có quy định khác trong luật pháp, các điều khoản đặc biệt giữa các bên vẫn được ưu tiên áp dụng.\n" +
              "\n" +
              "Tuy nhiên, dù là điều khoản đặc biệt, nếu vi phạm các quy định bắt buộc gây hại cho trật tự xã hội (các quy định pháp luật liên quan đến trật tự công cộng), thì sẽ không có hiệu lực.\n" +
              "\n" +
              "Ngoài ra, trong trường hợp hành vi của chủ nhà liên quan đến việc hoàn trả tiền đặt cọc bị coi là vi phạm các điều khoản đặc biệt trong hợp đồng, việc có được bồi thường hay không cũng có thể khác nhau tùy theo luật pháp liên quan. Do đó, để xác định liệu bạn có thể nhận được bồi thường hợp pháp hay không, tốt nhất là tham khảo ý kiến của chuyên gia pháp lý hoặc luật sư tại quốc gia đó.";
        }
        if (prompt.toLowerCase().includes("điều khoản đặc biệt") && prompt.toLowerCase().includes("lưu ý")) {
          return "Có một số trường hợp hiểu lầm rằng chỉ cần ghi chú ý vào điều khoản đặc biệt thì sẽ có hiệu lực pháp lý, nhưng điều này không đúng. \n" +
              "\n" +
              "Các điều khoản đặc biệt trái với quy định bắt buộc sẽ không có hiệu lực pháp lý, ngay cả khi được lập thành văn bản.\n" +
              "\n" +
              "Nói cách khác, các điều khoản đặc biệt vi phạm pháp luật sẽ không có hiệu lực pháp lý ngay cả khi được ghi vào hợp đồng.\n" +
              "\n" +
              "Do đó, ngay cả khi ghi các nội dung vi phạm pháp luật để ép buộc hoặc ràng buộc đối phương, điều này cũng không có hiệu lực pháp lý. Nếu bạn ghi các nội dung vi phạm pháp luật và ép buộc đối phương chấp nhận, bạn có thể sẽ tự gây thiệt hại cho chính mình.";
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
              "- Vì khả năng phản kháng có hiệu lực từ 0h ngày tiếp theo sau khi đăng ký chuyển đổi địa chỉ cư trú, điều khoản đặc biệt phải quy định không được thiết lập quyền lợi trước đó.\n" +
              "- Quyền thế chấp có hiệu lực ngay trong ngày thiết lập, nhưng ngày đăng ký chuyển đổi địa chỉ cư trú và ngày xác nhận chỉ có hiệu lực từ ngày hôm sau vì nhận được sau khi đăng ký.\n" +
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
        //여기보면됨 위에
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
        if (prompt.toLowerCase().includes("bảo hiểm") && prompt.toLowerCase().includes("ý nghĩa")) {
          return "Bảo hiểm tiền đặt cọc là hệ thống trong hợp đồng thuê, khi người thuê trả tiền đặt cọc cho chủ nhà và nếu chủ nhà không trả lại tiền đặt cọc khi hợp đồng thuê kết thúc, tổ chức bảo hiểm sẽ thay mặt trả lại tiền đặt cọc. Thông qua bảo hiểm, người thuê có thể bảo vệ tiền đặt cọc của mình an toàn hơn.";
        }

        // Lý do tham gia bảo hiểm tiền đặt cọc
        if (prompt.toLowerCase().includes("bảo hiểm") && prompt.toLowerCase().includes("lý do")) {
          return "Luật bảo vệ người thuê nhà và luật bảo vệ người thuê trong tòa nhà thương mại bảo vệ quyền lợi của người thuê, nhưng nếu chủ nhà không trả lại tiền đặt cọc kịp thời, người thuê có thể chịu thiệt hại kinh tế. Để phòng ngừa điều này, việc tham gia bảo hiểm sẽ giúp tổ chức bảo hiểm gánh rủi ro không trả lại tiền đặt cọc của chủ nhà, đảm bảo người thuê được hoàn tiền.";
        }

        // Hiệu lực pháp lý của bảo hiểm tiền đặt cọc
        if (prompt.toLowerCase().includes("bảo hiểm") && prompt.toLowerCase().includes("hiệu lực")) {
          return "Bảo hiểm tiền đặt cọc là một phần của hợp đồng thuê và tổ chức bảo hiểm có nghĩa vụ thay mặt chủ nhà trả lại tiền đặt cọc theo điều kiện hợp đồng. Nếu đã tham gia bảo hiểm, dù chủ nhà không trả lại tiền đặt cọc, tổ chức bảo hiểm sẽ đảm nhận trách nhiệm này, đóng vai trò như một biện pháp bảo đảm bổ sung cho việc hoàn trả tiền đặt cọc của người thuê.";
        }

        // Các lưu ý khi tham gia bảo hiểm tiền đặt cọc
        if (prompt.toLowerCase().includes("bảo hiểm") && prompt.toLowerCase().includes("lưu ý")) {
          return "Khi tham gia bảo hiểm, điều quan trọng là phải ghi rõ các điều khoản hợp đồng giữa chủ nhà và người thuê, đồng thời xác nhận trước về việc tham gia bảo hiểm. Nếu không thể tham gia bảo hiểm, nên chuẩn bị sẵn các biện pháp giải quyết thông qua các điều khoản đặc biệt như giải trừ hợp đồng hoặc bồi thường thiệt hại.";
        }

        // Điều khoản đặc biệt liên quan đến bảo hiểm tiền đặt cọc
        if (prompt.toLowerCase().includes("bảo hiểm") && prompt.toLowerCase().includes("điều khoản đặc biệt")) {
          return "Các điều khoản đặc biệt liên quan đến bảo hiểm tiền đặt cọc như sau:\n" +
              "1. Điều kiện tham gia bảo hiểm: 'Chủ nhà phải tham gia bảo hiểm, nếu không thể tham gia, hợp đồng sẽ bị hủy và tiền đặt cọc sẽ được hoàn trả.'\n" +
              "2. Thời hạn tham gia bảo hiểm: 'Chủ nhà phải tham gia bảo hiểm trong vòng [ngày], nếu không tham gia trong thời hạn, hợp đồng sẽ tự động hủy bỏ.'\n" +
              "3. Xác nhận khả năng tham gia bảo hiểm: 'Xác nhận khả năng tham gia bảo hiểm tại thời điểm ký hợp đồng thuê, nếu không thể tham gia, hợp đồng sẽ được giải trừ.'\n" +
              "4. Nghĩa vụ sau khi tham gia bảo hiểm: 'Sau khi tham gia bảo hiểm, chủ nhà phải cung cấp tài liệu chứng minh cho người thuê, nếu không cung cấp, hợp đồng có thể bị hủy bỏ.'";
        }
        if (prompt.toLowerCase() === "안녕하세요") {
          return "안녕하세요! 무엇을 도와드릴까요?";
        }
        if (prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("의미")) {
          return "정식으로 작성하게 될 서류에 합의하여 기입하는 특별한 약관을 의미합니다.";
        }
        if (prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("이유")) {
          return "특약사항을 명시함으로써 추후 발생할 수 있는 분쟁을 예방하거나 해결할 수 있고, 구두계약으로는 효력이 발생하지 않기 때문에 문서화 시키는 것이 좋습니다.";
        }
        if (prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("효력")) {
          return "‘특약’이란 당사자 간의 특별한 약속입니다. 부동산 매매계약은 개인과 개인 간에 체결되는 ‘사적계약’입니다. 그러므로 법으로 다른 규정이 있다고 하더라도 당사자 간의 특약사항을 우선 적용받습니다.\n" +
              "\n" +
              "단, 아무리 특약사항이라 하더라도 사회질서를 해칠 만한 강행규정(공공의 질서에 관한 사항을 정한 법규)에 대한 위반일 경우에는 효력이 없습니다.\n" +
              "\n" +
              "그리고, 보증금 반환과 관련하여 집주인의 행동이 계약서의 특약사항에 어긋난다고 판단되는 경우, 이에 대한 보상을 받을 수 있는지 여부도 관련 법률에 따라 다를 수 있습니다. 따라서, 법적인 보상을 받을 수 있는지 여부를 판단하기 위해서는 해당 국가의 법률 전문가나 변호사와 상담하는 것이 좋습니다.";
        }
        if (prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("주의사항")) {
          return "주의사항은 특약사항에 적어 놓기만 하면 법적효력을 가질 수 있다고 오해하는 경우가 있는데 그렇지 않습니다. \n" +
              "\n" +
              "강행규정에 반하는 특약사항은 작성하더라도 법적인 효력이 없습니다.\n" +
              "\n" +
              "즉, 법을 위반하는 특약사항은 계약서에 작성한다고 해도 법적인 효력이 없습니다.\n" +
              "\n" +
              "따라서 법을 위반하여 상대방을 강제하는 내용 또는 구속하는 내용 등을 작성한다고 하더라도 실제 법적으로는 효력이 없기 때문에 법적으로 위반되는 내용을 적고 이를 상대방에게 무리하게 요구할 경우에는 오히려 본인이 손해를 볼 수도 있습니다.";
        }
        if (prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("추천")) {
          return "특약에는 크게 1. 전세자금대출에 관한 특약문구 추천 \n" +
              "\n" +
              "2.권리주장에 관한 특약문구 추천\n" +
              "\n" +
              "3. 국세완납에 따른 특약문구 추천\n" +
              "\n" +
              "4. 전세반환보증에 따른 특약문구 추천\n" +
              "\n" +
              "5. 입주 전 계약 된 집 가구나 물품, 벽지, 장판 불량 관련 특약사항 문구 추천";
        }
        if ((prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("전세자금대출")) || (prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("전세자금대출"))) {
          return "전세자금대출 특약사항 문구 추천으로는 몇가지가 있습니다.\n" +
              "\n" +
              "- “물건의 하자로 전세자금대출이 불가할 경우 계약을 해지하고 계약금을 반환해준다.”\n" +
              "- 임대인은 전세자금대출에 적극 협조한다.\n" +
              "- 전세반환보증 가입이 불가한 경우에는 계약을 해지하고 반환해준다.\n" +
              "(계약서 작성 전에 은행에 방문하여 대출 여부와 한도 등을 확인 후 진행하는 것이 좋습니다.)\n" +
              "- 단, 임차인의 문제로 인해 대출이 나오지 않아 잔금을 치르지 못하는 것에 대해 계약금이나 보증금을 반환받을 수 없습니다.\n" +
              "\n" +
              "더 정확한 정보나 자세한 정보는 전문가와 상담해 보는 걸 권장해 드립니다.";
        }
        if ((prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("권리")) || (prompt.toLowerCase().includes("추천")  && prompt.toLowerCase().includes("권리"))) {
          return "권리주장에 관한 특약사항 문구 추천으로는 몇 가지가 있습니다.\n" +
              "\n" +
              "- “잔금일 익일까지 근저당권 등의 권리 설정을 하지 않는다.”\n" +
              "- “선순위 근저당은 잔금일 이전에 말소한다.”\n" +
              "- \"선순위 근저당은 잔금을 치르는 동시에 말소한다.”\n" +
              "- 대항력은 확정일자를 전입신고한 다음날 0시부터 효력이 발생하므로 그 전에 권리 등을 설정하지 못하도록 특약에 적어놔야 합니다.\n" +
              "- 근저당권은 설정 당일날에 바로 효력이 발생하지만, 전입신고 일자와 확정일자는 전입신고와 확정일자를 받은 다음날부터 효력이 발생하기 때문\n" +
              "\n" +
              "더 정확한 정보나 자세한 정보는 전문가와 상담해 보는 걸 권장해 드립니다.";
        }
        if ((prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("국세 완납")) || (prompt.toLowerCase().includes("추천")  && prompt.toLowerCase().includes("국세 완납"))) {
          return "국세 완납 사실 확인 특약사항 문구 추천으로는 몇 가지가 있습니다.\n" +
              "\n" +
              "- “임대인에게 국세 지방세 미납이 있을 경우 계약을 해지한다.”\n" +
              "- 세금 미납 사실에 대한 임차인의 보호를 위함\n" +
              "\n" +
              "더 정확한 정보나 자세한 정보는 전문가와 상담해 보는 걸 권장해 드립니다.";
        }
        if ((prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("전세반환보증")) || (prompt.toLowerCase().includes("추천")  && prompt.toLowerCase().includes("전세 반환 보증"))) {
          return "전세반환보증 특약사항 문구 추천으로는 몇 가지가 있습니다. \n" +
              "- “전세반환보증 보험 가입 불가능할 시 계약을 해지한다.”\n" +
              "계약 전 전세반환보증이 가능한지 여부를 미리 열람하고 확인하는 것이 중요\n" +
              "더 정확한 정보나 자세한 정보는 전문가와 상담해 보는 걸 권장해 드립니다.";
        }
        if ((prompt.toLowerCase().includes("특약") && prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("불량")) || (prompt.toLowerCase().includes("추천") && prompt.toLowerCase().includes("불량"))) {
          return "입주 전 계약 된 집 가구나 물품, 벽지, 장판 불량 관련 특약사항 문구 추천으로는 몇 가지가 있습니다. \n" +
              "- “임차인의 부주의로 내부 파손 시 원상회복하고 중대한 하자는 임대인이, 사소한 하자는(수리비 5만원 이하, 소모품) 임차인이 부담하기로 한다.”\n" +
              "“도배는 임대인 부담으로 입주 전까지 완료하기로 함.”\n" +
              "더 정확한 정보나 자세한 정보는 전문가와 상담해 보는 걸 권장해 드립니다.";
        }
        if ((prompt.toLowerCase().includes("버디즈") && prompt.toLowerCase().includes("뭐"))  || (prompt.toLowerCase().includes("버디즈")  && prompt.toLowerCase().includes("뭔"))) {
          return "버디즈란, 저희 뉴집스에서 한국의 부동산이 낯선 외국인 분들에게 제공하는 서비스로서, \n" +
              "실제 한국에 거주하고 있는 외국인 분들 혹은, 외국어가 가능한 한국분들이 좋은 매물을 보는법이나,”\n" +
              "안전하게 거래하기 위해 체크해야 할 상황을 같이 고민해주고, 매물을 같이 보러 다니기도 하는 서비스 입니다.\n" +
              "안전하고, 낯선환경에서 집을 구하기 부담스러우시다면, 버디즈 서비스를 경험해 보세요!";
        }
        if ((prompt.toLowerCase().includes("좋은") && prompt.toLowerCase().includes("버디즈")) || (prompt.toLowerCase().includes("버디즈")  && prompt.toLowerCase().includes("팁"))) {
          return "좋은 버디즈를 구하는 방법에는 크게 몇가지가 있습니다. \n" +
              "1. 홈화면에 인기 버디즈 탭을 참고해 보세요! 실시간으로 평점이 좋은 버디즈 분들이 홈화면에 게시됩니다!”\n" +
              "2. 상단바 > 버디즈 페이지에서, 자신에게 맞는 성향을 지닌 버디즈, 별점이 높은 버디즈, 혹은 한국에서 오래 거주했던 경험 등, 원하는 기준으로 버디즈를 구해보세요!\n" +
              "다양한 버디즈 분들이 있는 뉴집스에서 안전한 부동산 거래 해보세요!";
        }
        if ((prompt.toLowerCase().includes("buddiz") && prompt.toLowerCase().includes("gì"))  || (prompt.toLowerCase().includes("buddiz")  && prompt.toLowerCase().includes("là gì"))) {
          return "Buddiz là dịch vụ mà NewJips của chúng tôi cung cấp cho những người nước ngoài cảm thấy lạ lẫm với bất động sản Hàn Quốc. \n" +
              "Những người nước ngoài đang sinh sống tại Hàn Quốc hoặc người Hàn Quốc có khả năng nói tiếng nước ngoài sẽ giúp bạn cách xem các tài sản tốt, \n" +
              "cùng nhau suy nghĩ về những điểm cần kiểm tra để giao dịch an toàn, và thậm chí đi cùng bạn để xem các bất động sản. \n" +
              "Nếu bạn cảm thấy khó khăn trong việc tìm kiếm nhà ở một môi trường xa lạ và muốn giao dịch an toàn, hãy trải nghiệm dịch vụ Buddiz!";
        }
        if ((prompt.toLowerCase().includes("buddiz") && prompt.toLowerCase().includes("như thế nào")) || (prompt.toLowerCase().includes("buddiz") && prompt.toLowerCase().includes("mẹo"))) {
          return "Có một số cách để tìm Buddiz tốt. \n" +
              "1. Hãy tham khảo thẻ Buddiz phổ biến trên màn hình chính! Những Buddiz có đánh giá cao sẽ được hiển thị trên màn hình chính theo thời gian thực!\n" +
              "2. Trên thanh điều hướng trên cùng > trang Buddiz, bạn có thể tìm kiếm Buddiz phù hợp với tính cách của mình, Buddiz có xếp hạng cao, hoặc những người đã sống ở Hàn Quốc trong thời gian dài dựa trên tiêu chí bạn muốn!\n" +
              "Hãy trải nghiệm giao dịch bất động sản an toàn tại NewJips với nhiều Buddiz khác nhau!";
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
                "content": "너는 한국 부동산에 관해서 전문가인데, 한국인과 베트남인을 상대로 한국의 부동산 문화에 대해서 설명을 해 줘야하는 상황이야. 베트남어로 질문하면, 베트남어로 친절하게 대답을 해줘. 한국어로 물어보면 한국어로 대답하고, 베트남어로 질문하면 베트남어로 반드시 대답해."
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