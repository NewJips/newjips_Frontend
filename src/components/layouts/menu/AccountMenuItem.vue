<script setup>
const props = defineProps({ userId: String, nickname: String, profilePic: String });

const avatar = `/api/member/${props.userId}/avatar`;
</script>

<template>
  <li class="nav-item">
    <router-link class="nav-link" to="/mypage/mystatus">
      {{ nickname }}
      <img :src="profilePic" class="avatar avatar-sm" />
      <!-- 이미지 로드 전 표시될 내용 -->
    </router-link>
  </li>
</template>
<style></style>
<!-- 로그인 된 상태 -->
