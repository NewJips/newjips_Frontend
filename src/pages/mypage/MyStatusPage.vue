<script setup>
import SideBar from '@/components/layouts/SideBar.vue';
import { computed, ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import blameApi from '@/api/blameApi';
import wishApi from '@/api/wishApi';
import authApi from '@/api/authApi';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const auth = useAuthStore();

// Auth 상태 관리
const uno = computed(() => auth.uno);
const userId = computed(() => auth.userId);
const nickname = computed(() => auth.nickname);
const profilePic = computed(() => auth.profilePic);

const avatar = computed(() => `/api/member/${uno}/avatar`); // auth에서 직접 id를 가져옴
console.log(auth.uno);

//찜 등록한 매물 개수
const wishestatecount = ref(0);
//찜 등록한 버디즈 개수
const wishbuddizcount = ref(0);
//신고한 매물 개수
const budizcount = ref(0);
//신고한 버디즈 개수
const estatecount = ref(0);

//찜 등록한 매물 개수를 세는 함수
async function fetchWishEstateCount() {
  try {
    const data = await wishApi.getwishestate(uno.value);
    wishestatecount.value = data.length;
    console.log('매물찜 등록한 개수: ', wishestatecount.value);
  } catch (e) {
    console.error('매물 찜 목록 조회 실패: ', e);
  }
}
//찜 등록한 버디즈 개수를 세는 함수
async function fetchWishBuddizCount() {
  try {
    const data = await wishApi.getwishbuddiz(uno.value);
    wishbuddizcount.value = data.length;
    console.log('버디즈찜 등록한 개수: ', wishbuddizcount.value);
  } catch (e) {
    console.error('버디즈 찜 목록 조회 실패: '.e);
  }
}
//신고한 매물 개수를 세는 함수
async function fetchBlameEstateCount() {
  try {
    const data = await blameApi.getblameestate(uno.value); // uno를 인자로 전달
    estatecount.value = data.length; //신고한 매물 개수를 세어서 저장.
  } catch (error) {
    console.error('매물 신고 목록 조회 실패:', error);
  }
}
// 신고한 버디즈 개수를 세는 함수
async function fetchBlameBudizCount() {
  try {
    const data = await blameApi.getblamebudiz(uno.value); // uno를 인자로 전달
    budizcount.value = data.length; // 신고한 버디즈 개수를 세어서 저장
  } catch (error) {
    console.error('버디즈 신고 목록 조회 실패:', error);
  }
}

// 컴포넌트가 마운트될 때 신고한 버디즈 개수를 가져오기
onMounted(() => {
  //찜 등록한 매물 개수를 가져오기
  fetchWishEstateCount();
  //찜 등록한 버디즈 개수를 가져오기
  fetchWishBuddizCount();
  //신고한 매물 개수를 가져오기
  fetchBlameEstateCount();
  //신고한 버디즈 개수를 가져오기
  fetchBlameBudizCount();
  findBuddiz(uno.value);
});

//버디즈 등록/미등록
const isBuddiz = ref(false);

async function findBuddiz(uno) {
  try {
    const data = await authApi.findBuddiz(uno);
    isBuddiz.value = data ? true : false; //데이터 있으면 true, 없으면 false
    console.log('버디즈 등록 여부: ', isBuddiz.value);
  } catch (e) {
    console.log('확인 여부 실패: ', e);
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row px-xl-3">
      <!-- 사이드바 -->
      <div class="col-lg-2">
        <SideBar />
      </div>
      <!-- 오른쪽화면 프로필 정보 -->
      <!-- lg화면일때열10개차지 xl화면일때열8개차지 lg일때열3개차지 위마진 왼쪽마진  -->
      <div class="col-lg-10 col-xl-8 col-lg-3 mt-5 ms-5">
        <!-- 프로필정보창 -->
        <div class="profile-info mb-4">
          <h4 class="mb-3">{{ t('common.mystatus.profile') }}</h4>
          <div class="profile-content d-flex" style="border: 2px; border-style: solid; border-color: #eaecef; border-radius: 10px">
            <img class="mx-4 my-4" :src="profilePic" style="max-width: 10%; height: auto; border-radius: 50%" alt="Profile Picture" />
            <div class="profile-data mt-5">
              <h4>{{ nickname }}</h4>
              <p style="color: #8f9bb3">{{ userId }}</p>
            </div>
            <div class="edit-btn d-flex" style="margin-left: auto; max-width: 100%; margin-right: 4%">
              <router-link class="btn mt-5" style="border: 1px solid #ff8f17; max-height: 27%; background-color: #ff8f17; color: white" to="/mypage/myedit">{{
                t('common.mystatus.editbtn')
              }}</router-link>
            </div>
          </div>
        </div>
        <!-- 프로필정보창 여기까지 -->
        <!-- 내역 -->
        <div class="history mb-4">
          <h4 class="mb-3">{{ t('common.mystatus.my_content') }}</h4>
          <div class="d-flex" style="border: 2px; border-style: solid; border-color: #eaecef; border-radius: 10px 10px 0 0; justify-content: center">
            <h5 class="flex-fill text-center my-3" style="width: 25%">{{ t('common.mystatus.wish_estate') }}</h5>
            <h5 class="flex-fill text-center my-3" style="width: 25%">{{ t('common.mystatus.wish_buddiz') }}</h5>
            <h5 class="flex-fill text-center my-3" style="width: 25%">{{ t('common.mystatus.blame_estate') }}</h5>
            <h5 class="flex-fill text-center my-3" style="width: 25%">{{ t('common.mystatus.blame_buddiz') }}</h5>
          </div>
          <div class="d-flex" style="border: 2px; border-style: solid; border-color: #eaecef; border-radius: 0 0 10px 10px; border-top: none; justify-content: center">
            <router-link to="/mypage/wish" class="flex-fill text-center my-3" style="width: 25%; text-decoration: none"
              ><h5 style="color: black">{{ wishestatecount }}</h5></router-link
            >
            <router-link to="/mypage/wish" class="flex-fill text-center my-3" style="width: 25%; text-decoration: none"
              ><h5 style="color: black">{{ wishbuddizcount }}</h5></router-link
            >
            <router-link to="/mypage/blame" class="flex-fill text-center my-3" style="width: 25%; text-decoration: none"
              ><h5 style="color: black">{{ estatecount }}</h5></router-link
            >
            <router-link to="/mypage/blame" class="flex-fill text-center my-3" style="width: 25%; text-decoration: none"
              ><h5 style="color: black">{{ budizcount }}</h5></router-link
            >
          </div>
        </div>
        <!-- ---프로필정보창 여기까지--- -->
        <!-- 버디즈 미등록시-->
        <div v-if="isBuddiz === false">
          <div class="profile-info mt-5 mb-5 d-flex" style="justify-content: flex-end; flex-direction: row; align-items: center">
            <router-link :to="`/form/${uno}`" class="text-center my-2" style="text-decoration: none; display: inline-block">
              <button
                class="btn-buddiz"
                style="border: 1px solid #eaecef; border-radius: 10px; width: 100%; background-color: #eaecef; padding: 10px; font-size: 18px"
                onmouseover="this.style.backgroundColor='#ff8f17'; this.style.color='white';"
                onmouseout="this.style.backgroundColor='#eaecef'; this.style.color='#616b79';"
              >
                <h5 style="margin: 0">{{ t('common.mystatus.add_buddiz_btn') }}</h5>
              </button>
            </router-link>
          </div>
        </div>
        <!-- 버디즈 미등록시 여기까지 -->
        <!-- 버디즈 등록시 -->
        <div v-else>
          <div class="budiiz mb-5">
            <h4 class="mb-3">{{ t('common.mystatus.buddiz_e') }}</h4>
            <div class="budiiz-btn d-flex justify-content-start">
              <router-link
                :to="`/buddiz/userDetail/${uno}`"
                class="no-underline"
                style="border: 1px solid #eaecef; border-radius: 10px; width: 30%; background-color: #eaecef; background-color: #1e4475"
              >
                <h5 class="text-center my-2" style="color: white">{{ t('common.mystatus.watch_btn') }}</h5>
              </router-link>
              <router-link
                :to="`/form`"
                class="no-underline"
                style="border: 1px solid #eaecef; border-radius: 10px; width: 30%; background-color: #eaecef; margin-left: 1rem"
              >
                <h5 class="text-center my-2" style="color: #616b79">{{ t('common.mystatus.edit_btn') }}</h5>
              </router-link>
            </div>
          </div>
        </div>
        <!-- 버디즈 등록시 여기까지 -->
      </div>
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
.no-underline {
  text-decoration: none; /* 밑줄 제거 */
}
</style>
