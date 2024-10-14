<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
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
    {{ t('common.sidebar.logout') }}
  </a>
</template>
