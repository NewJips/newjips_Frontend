<script setup>
import SideBar from '@/components/layouts/SideBar.vue';
import { computed, ref, reactive } from 'vue';
// import avatar from '../assets/images/myeongsu.jpg';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import authApi from '@/api/authApi';

// const avatar = new URL('@/assets/images/myeongsu.jpg', import.meta.url).href;
// const avatar = require('@/assets/images/myeongsu.jpg');
// const avatarUrl = ref(avatar);
const error = ref('');
const auth = useAuthStore();
const router = useRouter();
const profilePic = computed(() => auth.profilePic);
const avatar = ref(null);
console.log('Auth store:', auth); // Auth 객체 확인
// const avatarUrl = `/api/member/${auth.UserId}/avatar`;

// 아바타 URL computed
const avatarUrl = computed(() => `/api/member/${auth.userId}/avatar`);

const member = reactive({
  uno: auth.uno,
  userId: auth.userId,
  name: auth.name,
  nickname: auth.nickname,
  gender: auth.gender,
  password: '',
  avatar: null,
});
console.log(member);

const onSubmit = async () => {
  // 아바타가 null이 아닐 때만 파일을 가져옵니다.
  if (avatar.value.files.length > 0) {
    member.avatar = avatar.value.files[0];
  }

  if (!confirm('수정하시겠습니까?')) return;

  try {
    await authApi.update(member);
    error.value = '';
    auth.changeProfile(member);
    alert('정보를 수정하였습니다.');
    router.go(0);
  } catch (e) {
    console.log(e);
    error.value = e.response?.data || '알 수 없는 오류가 발생했습니다.'; // 기본값 설정
  }
};
// const avatar = new URL('@/assets/images/myeongsu.jpg', import.meta.url).href;

// const avatarUrl = `/api/member/${auth.UserId}/avatar`; //기본 이미지를 avataeUel로 설정
console.log('Avatar URL:', avatar); // URL 확인

//파일 변경 시 미리보기 처리
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarUrl.value = e.target.result; // 미리보기 이미지 업데이트
      console.log('file loaded', e.target.result); //결과 확인
    };
    reader.readAsDataURL(file);
  } else {
    console.log('API 호출 중 오류 발생:', e); // 에러 로그 추가
    error.value = e.response?.data?.message || '알 수 없는 오류가 발생했습니다.'; // 에러 메시지 개선
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="row px-xl-3">
      <!-- 사이드바 -->
      <div class="col-lg-2">
        <SideBar />
      </div>
      <!-- 오른쪽화면 -->
      <div class="col-lg-10 col-xl-8 col-lg-3 mt-5 ms-5">
        <!-- 개인정보시작 -->
        <div class="card border mb-5">
          <div class="card-header border-bottom">
            <h4 class="card-header-title">개인정보</h4>
          </div>
          <div class="card-body">
            <form class="row g-3" @submit.prevent="onSubmit">
              <div class="col-12">
                <label class="form-label ms-1" style="color: #bababa">
                  프로필 사진을 업로드하세요.
                  <span class="text-danger">*</span>
                </label>
                <div class="d-flex align-items-start mb-3">
                  <label class="mt-3 ms-5" for="uploadfile" title="Replace this pic" style="cursor: pointer; display: flex; align-items: center; justify-content: center">
                    <!-- Avatar place holder -->
                    <div style="position: relative; display: inline-block">
                      <img class="avatar-img" :src="profilePic" style="width: 100px; height: 100px; object-fit: contain; border-radius: 50%" />
                      <div
                        style="
                          position: absolute;
                          bottom: 5px;
                          right: 5px;
                          background-color: white; /* 흰색 배경 */
                          border-radius: 50%; /* 동그라미 모양 */
                          padding: 5px; /* 패딩으로 크기 조정 */
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                      >
                        <i class="fa-solid fa-camera"></i>
                      </div>
                    </div>
                  </label>
                  <!-- 업로드 버튼 -->
                  <!-- <label class="btn btn-sm mb-0 ms-0 mt-3" for="uploadfile" style="border: 1px solid; margin-left: -100px; cursor: pointer">수정</label> -->
                  <input type="file" id="uploadfile" style="display: none" accept="image/*" @change="onFileChange" />
                </div>
              </div>
              <!-- 닉네임 -->
              <div class="col-md-6">
                <!-- label과 input의 간격 조정(mb-2) -->
                <label class="nicname mb-2">
                  닉네임
                  <span class="text-danger">*</span> </label
                ><br />
                <input
                  class="text-nicname w-100"
                  value=""
                  type="text"
                  placeholder="닉네임을 입력하세요."
                  v-model="member.nickname"
                  style="border: 2px solid #eaecef; border-radius: 3px; padding: 2%"
                />
              </div>
              <!-- 이메일 -->
              <!-- <div class="col-md-6"> -->
              <!-- label과 input의 간격 조정(mb-2) -->
              <!-- <label class="Email mb-2">
                  이메일
                  <span class="text-danger">*</span> </label
                ><br />
                <input
                  class="text-email w-100"
                  value=""
                  type="email"
                  placeholder="이메일 주소를 입력하세요."
                  v-model="member.email"
                  style="border: 2px solid #eaecef; border-radius: 3px; padding: 2%"
                />
              </div> -->
              <!-- 이름 -->
              <div class="col-md-6">
                <!-- label과 input의 간격 조정(mb-2) -->
                <label class="name mb-2">
                  이름
                  <span class="text-danger">*</span> </label
                ><br />
                <input
                  class="text-name w-100"
                  value=""
                  type="text"
                  placeholder="이름을 입력하세요."
                  v-model="member.name"
                  style="border: 2px solid #eaecef; border-radius: 3px; padding: 2%"
                />
              </div>
              <!-- 성별 -->
              <div class="col-md-6">
                <!-- label과 input의 간격 조정(mb-2) -->
                <label class="gender mb-3">
                  성별
                  <span class="text-danger">*</span> </label
                ><br />
                <div class="d-flex gap-4">
                  <div class="check-gender radio-bg-light">
                    <input class="check-manbox" type="radio" name="gender" id="man" value="남자" v-model="member.gender" />
                    <label class="check-manlabel" for="man">남자</label>
                  </div>
                  <div class="check-gender radio-bg-light">
                    <input class="check-womanbox" type="radio" name="gender" id="woman" value="여자" v-model="member.gender" />
                    <label class="check-womanlabel" for="woman">여자</label>
                  </div>
                </div>
              </div>
              <!-- 수정하기 버튼 -->
              <div class="col-12 text-end">
                <button class="btn mb-1 me-3" style="border: 1px solid #ff8f17; max-height: 100%; background-color: #ff8f17; color: white">수정</button>
              </div>
              <!-- 끝 -->
            </form>
          </div>
          <!-- card-body End -->
        </div>
        <!-- card-border End -->
        <!-- 비밀번호 변경 -->
        <div class="card border mb-5">
          <div class="card-header card-bottom">
            <h4 class="card-header-title">비밀번호 변경</h4>
          </div>
          <form class="card-body">
            <div class="mb-3">
              <label class="form-label">비밀번호</label>
              <input class="form-control" type="password" placeholder="비밀번호를 입력하세요." />
            </div>
            <div class="mb-3">
              <label class="form-label">새로운 비밀번호</label>
              <input class="form-control" type="password" placeholder="새로운 비밀번호를 입력하세요." />
            </div>
            <div class="mb-3">
              <label class="form-label">비밀번호 확인</label>
              <input class="form-control" type="password" placeholder="새로운 비밀번호 확인" />
            </div>
            <div class="col-12 text-end">
              <button class="btn mb-1 me-3" style="border: 1px solid #ff8f17; max-height: 100%; background-color: #ff8f17; color: white">수정</button>
            </div>
          </form>
          <!-- card-body End -->
        </div>
        <!-- caed-border End -->
      </div>
      <!-- 오른쪽 화면 끝 -->
    </div>
  </div>
</template>
<style>
.nav-pills .nav-link.active {
  background-color: #ff8f17;
  color: white;
}
.nav-link:hover {
  text-decoration: none; /* 밑줄 제거 */
  color: #ff8f17;
}
.nav-link {
  text-decoration: none; /* 밑줄 제거 */
  color: black;
}
.sidebar {
  margin-bottom: 20px;
  margin-right: 10px; /* 사이드바와 콘텐츠 사이 간격 */
  width: 180px; /* 사이드바 너비 고정 */
}
</style>
