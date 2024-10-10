<script setup>
import { reactive, computed } from 'vue';
import MenuGroup from './menu/MenuGroup.vue';
import AccountMenuGroup from './menu/AccountMenuGroup.vue';
import config from '@/config';
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
</script>

<template>
  <nav class="navbar navbar-expand-sm sticky-top bg-white shadow fixed-height">
    <div class="container-fluid" style="padding: 0">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/images/newjips.png" alt="Brand Logo" style="height: 100%; max-height: 40px" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" @click="toggleNavShow">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <button type="button" @click="changing('vn')">베트남어 {{ t('common.notice') }}</button>
      <button type="button" @click="changing('ko')">한국어</button> -->

      <div :class="navClass" id="collapsibleNavbar" style="flex-grow: 0; background-color: white">
        <div style="flex-direction: row; display: flex">
          <MenuGroup :menus="config.menus" />

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
