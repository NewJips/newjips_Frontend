<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import authApi from '@/api/authApi';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const avatar = ref(null);
const authStore = useAuthStore; //pinia store 사용을 위한 초기화

//////////////////////////////////////////////////////////
const member = reactive({
  uno: '',
  name: '닉네임기본값설정',
  userId: '1234',
  password: '1234',
  password2: '1234',
  nickname: '',
  avatar: null,
  profilePic: '',
  gender: 'M',
});
//////////////////////////////////////////////////////////
const disableSubmit = ref(true);
const checkError = ref('');
const checkId = async () => {
  if (!member.userId) {
    return alert('사용자 ID를 입력하세요.');
  }

  disableSubmit.value = await authApi.checkId(member.userId);
  console.log(disableSubmit.value, typeof disableSubmit.value);
  checkError.value = disableSubmit.value ? '이미 사용중인 ID입니다.' : '사용가능한 ID입니다.';
};

const changeId = () => {
  disableSubmit.value = true;
  if (member.userId) {
    checkError.value = '아이디 중복 체크를 하셔야 합니다.';
  } else {
    checkError.value = '';
  }
};

const join = async () => {
  if (member.password != member.password2) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  // if (avatar.value.files.length > 0) {
  //   member.avatar = avatar.value.files[0];
  // }

  console.log('회원가입 정보:', member);
  try {
    //회원가입 정보 전송
    await authApi.create(member);
    localStorage.setItem('userId', member.userId); // userId 저장
    localStorage.setItem('password', member.password); // password 저장
    router.push({ name: 'home' });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <!-- 배경색 -->
  <body class="bg-light">
    <main class="page-wrapper d-flex flex-column" style="min-height: 100vh">
      <div class="container-fluid d-flex h-100 align-items-center justify-content-center py-4">
        <!-- style="max-width: 100%; height: 100vh;" > 이러면 화면 길어짐;;;; -->
        <div class="card card-body" style="max-width: 70%; max-height: 600px">
          <a class="position-absolute top-1 end-0 nav-link fs-sm py-1 px-2 me-3" href="#" onclick="window.history.go(-1); return false;">
            <i class="fa-solid fa-arrow-left fs-base me-2"></i>Go back</a
          >
          <!-- 양쪽 화면 -->
          <div class="row mx-0 align-item-center">
            <!-- 왼쪽화면 -->
            <div class="col-md-6 border-end-md p-sm-1" style="display: flex; flex-direction: column; align-items: center; margin-top: 3%">
              <h3 class="h3 mb-4 mb-sm-5">
                NewJips에 가입하세요!<br />
                당신을 위한 집과 버디즈를 만나요
              </h3>

              <ul class="list mb-4 mb-sm-5" style="margin-bottom: 0%">
                <li class="d-flex mb-2">
                  <i class="fa-regular fa-circle-check"><span> 원하는 집을 찜하세요.</span></i>
                </li>
                <li class="d-flex mb-2">
                  <i class="fa-regular fa-circle-check"><span> 나와 딱 맞는 버디즈를 찾으세요.</span></i>
                </li>
                <li class="d-flex mb-2">
                  <i class="fa-regular fa-circle-check"><span> 나도 또다른 버디즈로 활동해보세요.</span></i>
                </li>
              </ul>

              <img src="@/assets/images/joinimg.png" style="height: 100%; max-height: 40%" />
            </div>

            <!-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ오른쪽 화면ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ -->
            <!-- col-md-6중간화면일때화면너비50% px-2좌우패딩 pt=2위쪽패딩 pb-4아래쪽패딩 px-sm-5작은화면일때수평패딩 pb-sm-5작은화면일때아래쪽패딩 pt-md-5증간화면일때위쪽패딩 -->
            <div class="col-md-6 px-2 pt-2 pb-2 px-sm-2 pb-sm-5 pt-md-5">
              <form class="needs-validation" @submit.prevent="join" novalidate>
                <div class="mb-2">
                  <label class="form-label" for="name">이름 </label>
                  <input class="form-control" type="text" id="name" v-model="member.name" placeholder="이름을 입력하세요." required />
                </div>
                <div class="mb-2">
                  <label class="form-label" for="text"
                    >아이디
                    <button type="button" class="btn btn-success btn-sm py-0 me-2" @click="checkId">ID 중복 확인</button>
                    <span :class="disableSubmit.value ? 'text-primary' : 'text-danger'">{{ checkError }}</span>
                  </label>
                  <input class="form-control" type="text" id="text" @input="changeId" v-model="member.userId" placeholder="아이디를 입력하세요." required />
                </div>
                <div class="mb-2">
                  <label class="form-label" for="password">비밀번호</label>
                  <input class="form-control" type="password" id="password" v-model="member.password" required />
                </div>
                <div class="mb-2">
                  <label class="form-label" for="password2">비밀번호 확인</label>
                  <input class="form-control" type="password" id="password2" v-model="member.password2" required />
                </div>
                <div class="mb-2">
                  <label class="form-label" for="nickname">닉네임</label>
                  <input class="form-control" type="text" id="nickname" v-model="member.nickname" placeholder="닉네임을 입력하세요." required />
                </div>
                <div class="mb-4">
                  <label class="form-label">성별</label>
                  <div>
                    <input type="radio" id="male" value="M" v-model="member.gender" required />
                    <label for="male" class="me-3">남성</label>
                    <input type="radio" id="female" value="F" v-model="member.gender" required />
                    <label for="female">여성</label>
                  </div>
                </div>
                <button class="btn-orange btn-lg w-100" type="submit" :disabled="disableSubmit">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<!-- :disabled="!isFormValid" -->
<!-- <div class="mt-5 mx-auto" style="width: 500px">
    <h1 class="my-5">
      <i class="fa-solid fa-user-plus"></i>
      회원 가입
    </h1>

    <form @submit.prevent="join">
      <div class="mb-3 mt-3">
        <label for="id" class="form-label">
          <i class="fa-solid fa-user"></i>
          사용자 ID :
          <button type="button" class="btn btn-success btn-sm py-0 me-2" @click="checkId">ID 중복 확인</button>
          <span :class="disableSubmit.value ? 'text-primary' : 'text-danger'">{{ checkError }}</span>
        </label>
        <input type="text" class="form-control" placeholder="사용자 ID" id="id" @input="changeId" v-model="member.id" />
      </div>

      <div>
        <label for="avatar" class="form-label">
          <i class="fa-solid fa-user-astronaut"></i>
          아바타 이미지:
        </label>
        <input type="file" class="form-control" ref="avatar" id="avatar" accept="image/png, image/jpeg" />
      </div>

      <div class="mb-3 mt-3">
        <label for="email" class="form-label">
          <i class="fa-solid fa-envelope"></i>
          email
        </label>
        <input type="email" class="form-control" placeholder="Email" id="email" v-model="member.email" />
      </div>

      <div class="mb-3 mt-3">
        <label for="name" class="form-label">
          <i class="fa-solid fa-user"></i>
          name
        </label>
        <input type="text" class="form-control" placeholder="Name" id="name" v-model="member.name" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호:
        </label>
        <input type="password" class="form-control" placeholder="비밀번호" id="password" v-model="member.password" />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호 확인:
        </label>
        <input type="password" class="form-control" placeholder="비밀번호 확인" id="password2" v-model="member.password2" />
      </div>

      <button type="submit" class="btn btn-primary mt-4" :disabled="disableSubmit">
        <i class="fa-solid fa-user-plus"></i>
        확인
      </button>
    </form>
  </div> -->
