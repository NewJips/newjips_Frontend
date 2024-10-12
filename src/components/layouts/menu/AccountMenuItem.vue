<script setup>
const props = defineProps({ userId: String, nickname: String, profilePic: String });
</script>

<template>
  <li class="nav-item">
    <router-link class="nav-link" to="/mypage/mystatus"  style="color: #111111;">
      <span>{{ nickname }}</span>
      <img :src="profilePic" class="avatar avatar-sm ms-2" />
      <!-- 이미지 로드 전 표시될 내용 -->
    </router-link>
  </li>
</template>
<style></style>
<!-- 로그인 된 상태 -->
