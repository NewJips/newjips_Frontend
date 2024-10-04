<template>
  <div class="brief-detail">
    <div class="picArea"></div>
    <!-- <div class="briefArea">
        <h4>{{estate.tradeType}}{{ estate.monthlyPee}}}</h4>
        <p>{{estate.houseType}}</p>
        <p>1층, 40㎡, 관리비 15만{{estate.floor}}{{estate.roomSize}}{{estate.monthlyPee}}</p>
        <p>여의도광나루역 5분{{estate.distToSub}}</p>
      </div> -->
    <div class="briefArea">
      <i
        :class="[isLiked(estateId) ? 'bi bi-heart-fill' : 'bi bi-heart']"
        @click="toggleLike(estateId)"
        class="heart-icon"
      ></i>
      <h4>월세 1000/55</h4>
      <p>원룸</p>
      <p>1층, 40㎡, 관리비 15만</p>
      <p>여의도광나루역 5분</p>
    </div>
  </div>
</template>

<script setup>
import { useLikedEstateStore } from '@/stores/likedEstate';
import { defineProps } from 'vue';

// 매물 ID를 props로 받음
const props = defineProps({
  estateId: {
    type: Number,
    required: true,
  },
});

const likedEstateStore = useLikedEstateStore();

// 스토어의 찜 상태 및 토글 함수 사용
const isLiked = likedEstateStore.isLiked;
const toggleLike = likedEstateStore.toggleLike;
</script>

<style scoped>
.brief-detail {
  display: flex;
  border-top: 1px solid #8f9bb3;
  padding: 10px;
  position: relative;
}

.picArea {
  flex: 1;
  margin-right: 1rem;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  min-height: 130px;
  border-radius: 1.5pt;
}

.briefArea {
  flex: 2;
}

.heart-icon {
  font-size: 1.5rem;
  color: #ff8f17;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: color 0.3s;
}

.heart-icon:hover {
  color: #e05d00;
}
</style>
