<script setup>
import { reactive, computed } from 'vue';
import MenuGroup from './menu/MenuGroup.vue';
import AccountMenuGroup from './menu/AccountMenuGroup.vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore(); //인증 스토어 사용
const isLogin = computed(() => authStore.isLogin); //로그인 상태 확인

let state = reactive({ isNavShow: false });

let navClass = computed(() => (state.isNavShow ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'));

const toggleNavShow = () => (state.isNavShow = !state.isNavShow);

const { t, locale } = useI18n();

const changing = (lan) => {
  locale.value = lan;
  console.log(lan);
};

const menus = computed(() => [
  {
    title: t('common.map'),
    url: '/map'
  },
  {
    title: t('common.buddiz'),
    url: '/buddiz'
  },
  {
    title: t('common.notice'),
    url: '/board'
  },
  {
    title: t('common.chat'),
    url: '/chat'
  }
]);
</script>

<template>
  <nav class="navbar navbar-expand-sm sticky-top bg-white shadow fixed-height">
    <div class="container-fluid" style="padding: 10px">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/newjips.png" alt="Brand Logo" style="height: 100%; max-height: 40px" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" @click="toggleNavShow">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div :class="navClass" id="collapsibleNavbar" style="flex-grow: 0; background-color: white">
        <div style="flex-direction: row; display: flex">
          <MenuGroup :menus="menus" />

          <AccountMenuGroup />
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}

.fixed-height {
  height: 66px;
}
</style>
