<script setup>
import SideBar from '@/components/layouts/SideBar.vue';
import { computed, ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import authApi from '@/api/authApi';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const error = ref('');
const auth = useAuthStore();
const router = useRouter();
const profilePic = ref('');
const avatar = ref(null);
const maxFileSize = 5 * 1024 * 1024;

const oldPw = ref('');
const newPw1 = ref('');
const newPw2 = ref('');
const iscorrect = ref(true);

const member = reactive({
  uno: auth.uno,
  nickname: auth.nickname,
  password: '',
  avatar: null,
});
profilePic.value = auth.profilePic;

const onSubmit = async () => {
  // 아바타가 null이 아닐 때만 파일을 가져옵니다.
  if (avatar.value) {
    member.avatar = avatar.value;
  }

  if (!confirm(t('common.edit.info'))) return;

  try {
    const formData = new FormData();
    formData.append('avatar', member.avatar);
    formData.append('nickname', member.nickname);
    formData.append('uno', member.uno);

    let result = await authApi.update(formData);
    error.value = '';
    member.nickname = result.nickname;
    member.profilePic = result.profilePic;
    auth.changeProfile(member);
    alert(t('common.edit.infoedit'));
    router.go(0);
  } catch (e) {
    console.log(e);
    error.value = e.response?.data || '알 수 없는 오류가 발생했습니다.'; // 기본값 설정
  }
};

// 비밀번호 바꾸기
const onChangePw = async () => {
  try {
    const formData = new FormData();
    formData.append('newPassword', newPw1.value);
    formData.append('oldPassword', oldPw.value);
    formData.append('uno', member.uno);

    await authApi.changePassword(formData);
    alert(t('common.edit.infoedit'));
    oldPw.value = '';
    newPw1.value = '';
    newPw2.value = '';
  } catch (error) {
    alert(error.message);
  }
};

const newPwMatch = () => {
  if (newPw1.value === newPw2.value) {
    iscorrect.value = true;
  } else {
    iscorrect.value = false;
  }
};

//파일 변경 시 미리보기 처리
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > maxFileSize) {
      alert(t('common.edit.file'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      profilePic.value = e.target.result;
    };
    reader.readAsDataURL(file);
    avatar.value = file;
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
            <h4 class="card-header-title">{{ t('common.edit.personal') }}</h4>
          </div>
          <div class="card-body">
            <form class="row g-3" @submit.prevent="onSubmit">
              <div class="col-12">
                <label class="form-label ms-1" style="color: #bababa">
                  {{ t('common.edit.upload_img') }}
                  <span class="text-danger">*</span>
                </label>
                <div class="d-flex align-items-start mb-3">
                  <label class="mt-3 ms-5" for="uploadfile" title="Replace this pic" style="cursor: pointer; display: flex; align-items: center; justify-content: center">
                    <!-- Avatar place holder -->
                    <div style="position: relative; display: inline-block">
                      <img class="avatar-img" :src="profilePic" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%" />
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
                  {{ t('common.edit.nickname') }}
                  <span class="text-danger">*</span> </label
                ><br />
                <input
                  class="text-nicname w-100"
                  value=""
                  type="text"
                  :placeholder="t('common.edit.nicknameHolder')"
                  v-model="member.nickname"
                  style="border: 2px solid #eaecef; border-radius: 3px; padding: 2%"
                />
              </div>

              <!-- 수정하기 버튼 -->
              <div class="col-12 text-end">
                <button class="btn mb-1 me-3" style="border: 1px solid #ff8f17; max-height: 100%; background-color: #ff8f17; color: white">
                  {{ t('common.edit.edit') }}
                </button>
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
            <h4 class="card-header-title">{{ t('common.edit.changePw') }}</h4>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">{{ t('common.edit.oldPw') }}</label>
              <input class="form-control" v-model="oldPw" type="password" :placeholder="t('common.edit.oldPwHolder')" />
            </div>
            <div class="mb-3">
              <label class="form-label">{{ t('common.edit.newPw') }}</label>
              <input class="form-control" v-model="newPw1" type="password" :placeholder="t('common.edit.newPwHolder')" @change="newPwMatch()" />
            </div>
            <div class="mb-3">
              <label class="form-label">{{ t('common.edit.checkPw') }}</label>
              <input class="form-control" v-model="newPw2" type="password" :placeholder="t('common.edit.checkPwHolder')" @change="newPwMatch()" />
              <span v-if="!iscorrect" class="ms-2" style="color: red">{{ t('common.edit.notpw') }}</span>
            </div>
            <div class="col-12 text-end">
              <button @click="onChangePw()" class="btn mb-1 me-3" style="border: 1px solid #ff8f17; max-height: 100%; background-color: #ff8f17; color: white">
                {{ t('common.edit.edit') }}
              </button>
            </div>
          </div>
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
