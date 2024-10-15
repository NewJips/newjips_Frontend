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
        :class="[isLiked ? 'bi bi-heart-fill' : 'bi bi-heart']"
        @click.stop="handleLikeClick"
        class="heart-icon"
      ></i>
      <p style="font-weight: 600; font-size: 1.5rem">
        {{
          estateData.tradetype === 'monthly'
            ? `${formatDeposit(estateData.deposit)} / ${estateData.monthlyPee}`
            : formatDeposit(estateData.deposit)
        }}
      </p>
      <p>{{ estateData.housetype === 'villa' ? '빌라' : '오피스텔' }}</p>
      <p>{{ estateData.floor }}층, {{ estateData.roomSize }}㎡,</p>
      <p>{{ estateData.distToSub }}</p>
    </div>
  </div>
</template>

<script setup>
import { useLikedEstateStore } from '@/stores/likedEstate';
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

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
const authStore = useAuthStore();
const router = useRouter();
const isLogin = computed(() => authStore.isLogin);

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
const handleLikeClick = (event) => {
  event.stopPropagation();
  if (!isLogin.value) {
    alert('로그인이 필요한 서비스입니다.');
    // 현재 페이지 경로를 쿼리 파라미터로 넘기기
    router.push({
      path: '/auth/login',
      query: { redirect: router.currentRoute.value.fullPath },
    });
    return;
  }
  likedEstateStore.toggleLike(props.estateId);
};

const likedEstateStore = useLikedEstateStore();
const isLiked = computed(() => likedEstateStore.isLiked(props.estateId));
</script>

<style scoped>
.brief-detail {
  cursor: pointer;
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
