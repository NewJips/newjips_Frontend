<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const member = reactive({
  userId: '',
  password: '',
});

const error = ref('');

const disableSubmit = computed(() => !(member.userId && member.password));

const login = async () => {
  console.log(member);
  try {
    await auth.login(member);

    // 일반
    router.push('/');
  } catch (e) {
    // 로그인 에러
    console.log('에러=======', e);
    error.value = e.response && e.response.data ? e.response.data : '로그인 중 에러 발생';
  }
};
</script>

<template>
  <!-- 배경색 -->
  <body class="bg-light">
    <main class="page-wrapper d-flex flex-column" style="min-height: 100vh">
      <div class="container-fluid d-flex h-100 align-item-center justify-content-center py-4">
        <!-- style="max-width: 100%; height: 100vh;" > 이러면 화면 길어짐;;;; -->
        <div class="card card-body" style="max-width: 70%; max-height: 600px">
          <a class="position-absolute top-1 end-0 nav-link fs-sm py-1 px-2 me-3" href="#" onclick="window.history.go(-1); return false;">
            <i class="fa-solid fa-arrow-left fs-base me-2"></i>Go back</a
          >
          <div class="row mx-0 align-item-center">
            <!-- 왼쪽화면 -->
            <div class="col-md-6 border-end-md p-sm-1" style="display: flex; flex-direction: column; align-items: center; margin-top: 3%">
              <div>
                <h3 class="mt-2">안녕하세요!</h3>
                <h3>다시 만나서 반가워요 :)</h3>
              </div>
              <img src="@/assets/images/Loginimg.png" style="height: 100%; max-height: 60%" />
            </div>

            <!-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ오른쪽 화면ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ -->
            <!-- 좌우패딩 위쪽패딩 아래쪽 패딩 text바 너비          toppadding -->
            <div class="col-md-6 mb-5 px-2 pt-2 pb-4 px-sm-2 pb-sm-5 pt-md-5">
              <form class="needs-validation mt-5" @submit.prevent="login" novalidate>
                <div class="mb-4">
                  <label class="form-label mb-2 mt-5" for="signin-email">이메일</label>
                  <input class="form-control" type="email" id="signin-email" v-model="member.userId" placeholder="이메일을 입력하세요." required />
                </div>
                <div class="mb-4">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <label class="form-label mb-0" for="signin-password">비밀번호</label>
                    <a class="fs-ms" href="#" style="color: #ff8f17">잊으셨나요?</a>
                  </div>
                  <div class="change">
                    <input class="form-control" type="password" id="signin-password" v-model="member.password" placeholder="비밀번호를 입력하세요" required />
                  </div>
                </div>
                <button class="btn-orange btn-lg w-100 mt-4 mb-4" type="submit" :disabled="disableSubmit">로그인</button>
              </form>
              <div class="mt-4 mt-sm-5">
                계정이 없으신가요??
                <router-link to="/auth/join" style="color: #ff8f17">회원가입</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
