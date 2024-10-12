import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useBlameStore = defineStore('blame', () => {
    // 버디즈 신고
    const blamedId = ref();
    const buddizProfile = ref('https://cdn-nj.s3.ap-northeast-2.amazonaws.com/default.jpg');
    const buddizNM = ref('');
    const buddizid = ref('');

    // 매물 신고
    const agentNm = ref('');
    const agentPhone = ref('');
    const eno = ref('');
    const estateAddress = ref('');

    return { blamedId, buddizProfile, buddizNM, buddizid, agentNm, agentPhone, eno, estateAddress };
});