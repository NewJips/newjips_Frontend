<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useBlameStore } from '@/stores/blame';
import { useI18n } from 'vue-i18n';
import blameApi from '@/api/blameApi';

const { t, locale } = useI18n();
const auth = useAuthStore();
const blame = useBlameStore();
const router = useRouter();
const reasondetail = ref('');
const blameType = ref('');

const blameDTO = reactive({
  uno: auth.uno,
  blamedId : blame.blamedId,
  content : '',
  targetType : 'B'
});

const blameOptions = computed(() => [
    { value: 1, label: t('common.blame.b1') },
    { value: 2, label: t('common.blame.b2') },
    { value: 3, label: t('common.blame.b3') },
    { value: 4, label: t('common.blame.b4') },
    { value: 5, label: t('common.blame.b5') },
]);

const updateContent = (label) => {
    blameType.value = label;  // 선택된 레이블 텍스트를 저장
};

const goBack = () => {
  router.go(-1); 
};

// 확인버튼 - 신고하기
const requestBlame = async () => {
    blameDTO.content = blameType.value + '. ' + reasondetail.value;

    try {
        await blameApi.insertblame(blameDTO);
        router.push('/blame/success');
    } catch (error) {
        return alert('fail to Blame');
    }
};

</script>

<template>
    <div class="container-fluid px-0">
        <!-- header -->
        <div class="type-header">
            <h2>{{ t('common.blame.blame') }}</h2>
            <div style="font-size: 17pt; margin-top: 8pt;">{{ t('common.blame.des') }}</div>
        </div>

        <div class="box">
            <h4 class="mb-4">{{ t('common.blame.binfo') }}</h4>

            <div  class="d-flex align-items-center ms-3">
                <img
                    id="profile"
                    :src="blame.buddizProfile"
                    alt=""
                    class="imgProfile" />

                <table class="table table-bordered ms-4 mt-3">
                    <tbody>
                        <tr>
                            <th>{{ t('common.edit.nickname') }}</th>
                            <td>{{ blame.buddizNM }}</td>
                        </tr>
                        <tr>
                            <th>{{ t('common.blame.id') }}</th>
                            <td>{{ blame.buddizid }}</td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>

        <div class="box">
            <h4 class="mb-4">{{ t('common.blame.reason') }}</h4>
            <table class="table table-bordered ms-3">
                <tbody>
                    <tr v-for="(option, index) in blameOptions" :key="index">
                        <td>
                            <label class="d-flex align-items-center" style="margin-top: 6px; margin-bottom: 6px;">
                                <input
                                    class="form-check-input mt-0"
                                    type="radio"
                                    name="blameOption"
                                    :value="option.value"
                                    v-model="selectedOption"
                                    aria-label="Radio button for following text input"
                                    @change="updateContent(option.label)"
                                    />
                            <span class="ms-3">{{ option.label }}</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="box">
            <h4 class="mb-4">{{ t('common.blame.content') }}</h4>
            <textarea class="form-control ms-3" v-model="reasondetail" id="content" rows="5" :placeholder="t('common.blame.holder')"></textarea>
        </div>

        <div class="container-fluid d-flex justify-content-center mb-5 box mt-4" style="gap: 15px;">
            <button class="button-box me-4" style="background-color: #F5F6F7;" @click="goBack">{{ t('common.cancle') }}</button>
            <button class="button-box ms-4" style="background-color: #344356; color: #FFFFFF;" @click="requestBlame()">{{ t('common.yes') }}</button>
        </div>
    </div>
</template>

<style>
.type-header {
    background-color: #F5F6F7;
    padding-top: 4vh;
    padding-bottom: 4vh;
    padding-left: 6vh;
}

.box {
    padding-top: 4vh;
    padding-left: 6vh;
    padding-right: 10vh;
}

.box-title {
    font-size: 17pt;
    font-weight: bold;
}

.button-box {
    border-radius: 5pt;
    padding-top: 10pt;
    padding-bottom: 10pt;
    padding-left: 80pt;
    padding-right: 80pt;
    border: 0;
    font-size: 14pt;
}

.table tr th {
    background-color: #344356;
    color: white;
    text-align: center;
    width: 30vh;
}

.table {
    overflow: hidden;
}

.table th, .table tr {
    padding-top: 15px;
    padding-bottom: 15px;
    vertical-align: middle;
}

.table td {
   padding-left : 15px;
}

input[type="radio"]:checked + span {
        color: #FF8F17;
        font-weight: bold;
}

input[type="radio"] + span {
    color: #616B79;
}

.imgProfile {
    height: 18vh;
    border-radius: 5px;
}
</style>