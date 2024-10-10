<template>
  <div
    class="brief-detail"
    v-if="estateData"
    @click="goToDetail(estateData.eno)"
  >
    <div class="picArea">
      <img
        v-if="estateData.img && estateData.img.length > 0"
        :src="estateData.img[0]"
        alt="Property Image"
      />
      <p v-else>No Image Available</p>
    </div>
    <div class="briefArea">
      <i
        :class="[isLiked(estateId) ? 'bi bi-heart-fill' : 'bi bi-heart']"
        @click="toggleLike(estateId)"
        class="heart-icon"
      ></i>
      <p style="font-weight: 600; font-size: 1.5rem">
        {{
          estateData.tradetype === 'monthly'
            ? `${formatDeposit(estateData.deposit)} / ${estateData.monthlyPee}`
            : formatDeposit(estateData.deposit)
        }}만원
      </p>
      <p>{{ estateData.housetype === 'villa' ? '빌라' : '오피스텔' }}</p>
      <p>{{ estateData.floor }}층, {{ estateData.roomSize }}㎡,</p>
      <p>{{ estateData.distToSub }}</p>
    </div>
  </div>
</template>

<script setup>
import { useLikedEstateStore } from '@/stores/likedEstate';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  estateId: {
    type: Number,
    required: true,
  },
  estateData: {
    type: Object,
    required: true,
  },
});
const router = useRouter();

const goToDetail = (eno) => {
  router.push({ name: 'estate', params: { eno } });
};

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

const likedEstateStore = useLikedEstateStore();
const isLiked = likedEstateStore.isLiked;
const toggleLike = likedEstateStore.toggleLike;
</script>

<style scoped>
.brief-detail {
  display: flex;
  border-bottom: 1px solid #8f9bb3;
  padding: 10px;
  position: relative;
}

.picArea {
  margin-right: 1rem;
  position: relative;
  flex: 1;
  background-color: white;
  overflow: hidden;
  border-radius: 1.5pt;
}

.picArea img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.briefArea {
  flex: 2;
  height: 100%;
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

p {
  margin: 0;
  line-height: 2rem;
}
</style>
