<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();

const router = useRouter();
const logout = (e) => {
  // 로그아웃!
  store.logout();
  router.push('/');
};
</script>
<template>
  <a href="#" class="nav-link" @click.prevent="logout">
    <i class="logout"></i>
    로그아웃
  </a>
</template>
