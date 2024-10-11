<template>
  <div class="estate-detail-page">
    <div class="picArea">
      <div
        class="img-container"
        v-if="estateDetail.img && estateDetail.img.length > 0"
      >
        <img
          v-for="(image, index) in estateDetail.img.slice(0, 3)"
          :key="index"
          :src="image"
          :alt="`Property Image ${index + 1}`"
        />
      </div>

      <p v-else>No Image Available</p>
    </div>

    <div class="estate-content clearfix">
      <div class="estate-decription">
        <p style="font-weight: 600; font-size: 2rem">
          {{ estateDetail.tradetype === 'monthly' ? '월세' : '전세' }}
          {{
            estateDetail.tradetype === 'monthly'
              ? `${formatDeposit(estateDetail.deposit)} / ${
                  estateDetail.monthlyPee
                }`
              : formatDeposit(estateDetail.deposit)
          }}
        </p>
        <div style="display: flex; font-size: 1.5rem">
          <i class="bi bi-geo-alt-fill" style="color: #4e65f8"></i>
          <p style="color: #4e65f8; font-weight: bold">
            {{ estateDetail.address }}
          </p>
        </div>
        <p style="color: gray">
          {{ estateDetail.housetype === 'twoRoom' ? '투룸' : '원룸' }}
        </p>
        <p>{{ estateDetail.content }}</p>
        <hr />
        <p style="font-weight: 600; font-size: 2rem">방 옵션</p>
        <div></div>
        <p style="font-weight: 600; font-size: 2rem">보안 옵션</p>
        <div></div>
        <hr />
        <p style="font-weight: 600; font-size: 2rem">위치 및 주변시설</p>
        <p style="font-weight: bold">
          {{ estateDetail.address }}
        </p>
        <div style="width: 100%; height: 400px; background-color: black"></div>
        <hr />
      </div>
      <!-- 오른쪽: 플로팅 바 -->
      <div class="sticky-bar clearfix">
        <Vue3StickySidebar
          class="sidebar"
          containerSelector=".estate-content"
          innerWrapperSelector=".sidebar__inner"
        >
          <div class="sidebar__inner">
            <div class="estate-info">
              <div class="estate-info-detail">
                <p>보증금</p>
                <p class="p-value">₩ {{ estateDetail.deposit }} 만원</p>
              </div>

              <div
                class="estate-info-detail"
                v-if="estateDetail.tradetype === 'monthly'"
              >
                <p>월세</p>
                <p class="p-value">₩ {{ estateDetail.monthlyPee }} 만원</p>
              </div>

              <div class="estate-info-detail">
                <p>관리비</p>
                <p class="p-value">{{ estateDetail.managementFee }}</p>
              </div>
              <hr class="divider" />
              <div class="estate-info-detail">
                <p>층수</p>
                <p class="p-value">{{ estateDetail.floor }}층</p>
              </div>
              <div class="estate-info-detail">
                <p>면적</p>
                <p class="p-value">{{ estateDetail.roomSize }}㎡</p>
              </div>
              <div class="button-group">
                <button class="contact-button">
                  <i
                    class="bi bi-telephone-forward-fill"
                    style="margin-right: 5px"
                  ></i
                  >연락하기
                </button>
                <button class="wishlist-button">
                  <i class="bi bi-heart-fill"></i>
                  매물 찜하기
                </button>
                <button class="report-button">신고하기</button>
              </div>
            </div>
          </div>
        </Vue3StickySidebar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import axios from 'axios';
import Vue3StickySidebar from 'vue3-sticky-sidebar';

const props = defineProps({
  eno: {
    type: Number,
    required: true,
  },
});

// 매물 정보를 담는 ref
const estateDetail = ref({});
const formatDeposit = (deposit) => {
  const billion = Math.floor(deposit / 10000); // 억 단위
  const thousand = Math.floor((deposit % 10000) / 1000); // 천 단위 정수로 변환

  let result = '';
  if (billion > 0) {
    result += `${billion}억`;
  }
  if (thousand > 0) {
    result += ` ${thousand}천`;
  }
  return result.trim(); // 앞뒤 공백 제거 후 반환
};
// API에서 매물 정보 가져오기
onMounted(async () => {
  const response = await axios.get(`/api/estate/list/${props.eno}`);
  estateDetail.value = response.data;
});
</script>

<style scoped>
/* 기존 스타일 유지 */
.estate-detail-page {
  background-color: white;
  width: 100%;
}

.estate-content {
  display: flex;
  margin: 3rem;
}

.estate-description {
  width: 100%;
  margin-left: 1rem;
}

.sticky-bar {
  width: 100%;

  margin-left: 4rem;
}

.sidebar__inner {
  transform: translate(0, 0); /* For browsers don't support translate3d. */
  transform: translate3d(0, 0, 0);
  will-change: position, transform;
  margin-top: 100px;
}
.contact-button {
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.estate-info {
  box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.15);
  padding: 20px;
}
.img-container {
  display: flex;
  width: 100%;
}
.picArea {
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: white;

  border-radius: 1.5pt;
}

.picArea img {
  overflow: hidden;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.divider {
  border: 1px solid #ddd;
  margin: 15px 0;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.contact-button,
.wishlist-button {
  background-color: #f5f6f7;
  border: none;
  color: #616b79;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  font-size: 1rem;
}
.report-button {
  font-size: 0.75rem;
  border: none;
  background-color: white;
  color: #616b79;
}
.contact-button:hover,
.wishlist-button:hover,
.report-button:hover {
  background-color: #3f54e3;
  color: white;
}
.estate-info-detail {
  display: flex;
  justify-content: space-between;
}
.p-value {
  font-weight: 700;
}
</style>
