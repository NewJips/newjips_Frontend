<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import LogoutMenuItem from '../layouts/menu/LogoutMenuItem.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const route = useRoute(); // 전체 route 객체 사용
const validPaths = ['/mypage/mystatus', '/mypage/myedit', '/mypage/wish', '/mypage/blame'];
const showSidebar = computed(() => validPaths.includes(route.path));
console.log(route.path); //현재 url 출력

const active = (path) => {
  return route.path === path ? 'nav-link mb-2 active' : 'nav-link mb-2';
};
</script>
<template>
  <div class="sticky-top mb-5" style="top: 120px" v-if="showSidebar">
    <!-- 사이드바 -->
    <div class="sidebar">
      <!-- mt-4 mb-4로 top,bottom 마진줌. -->
      <h2 class="sidebar-header mt-4 mb-4 ms-2">
        <router-link class="mypage" to="/mypage/mystatus">{{ t('common.sidebar.mypage') }}</router-link>
      </h2>
      <nav class="nav nav-pills flex-column">
        <!-- 아래쪽마진/활성화 -->
        <!-- 활성화했을 때 붙이고 싶으면 mb-2빼 -->
        <router-link :class="active('/mypage/mystatus')" to="/mypage/mystatus">{{ t('common.sidebar.status') }}</router-link>
        <router-link :class="active('/mypage/myedit')" to="/mypage/myedit"> {{ t('common.sidebar.edit') }} </router-link>
        <router-link :class="active('/mypage/wish')" to="/mypage/wish"> {{ t('common.sidebar.wish') }} </router-link>
        <router-link :class="active('/mypage/blame')" to="/mypage/blame"> {{ t('common.sidebar.blame') }} </router-link>
        <LogoutMenuItem />
      </nav>
    </div>
  </div>
</template>
<style>
.nav-pills .nav-link.active {
  background-color: #ff8f17;
  color: white;
}
.nav-link {
  text-decoration: none; /* 밑줄 제거 */
  color: black;
}

.nav-link:hover {
  text-decoration: none; /* 밑줄 제거 */
  color: #ff8f17;
}

.nav-link.active:hover {
  color: red;
}
.sidebar {
  margin-bottom: 20px;
  margin-right: 10px; /* 사이드바와 콘텐츠 사이 간격 */
  width: 180px; /* 사이드바 너비 고정 */
}
.mypage {
  text-decoration: none; /* 밑줄 제거 */
  color: black;
}
</style>
