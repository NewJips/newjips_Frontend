<template>
  <div class="estate-detail-page">
    <div class="picArea">
      <div
        class="img-container"
        v-if="estateDetail.img && estateDetail.img.length > 0"
      >
        <img
          v-for="(image, index) in estateDetail.img.slice(0, 3)"
          :key="index"
          :src="image"
          :alt="`Property Image ${index + 1}`"
        />
      </div>

      <p v-else>No Image Available</p>
    </div>

    <div class="estate-content clearfix">
      <div class="estate-description">
        <p style="font-weight: 600; font-size: 2rem">
          {{ tradeWon }}
        </p>
        <div style="display: flex; font-size: 1.5rem; gap: 0.5rem">
          <i class="bi bi-geo-alt-fill" style="color: #4e65f8"></i>
          <p style="color: #4e65f8; font-weight: bold">
            {{ estateDetail.address }}
          </p>
        </div>
        <p style="color: gray">
          {{ translateHouseType(estateDetail.housetype, estateDetail.lan) }}
        </p>
        <p v-html="estateDetail.content"></p>
        <hr />
        <!-- 매물 옵션 -->
        <div
          v-if="estateDetail.option && estateDetail.option.length > 0"
          class="options-container"
        >
          <h3 v-text="estateDetail.lan === 'KR' ? '옵션' : 'Room Option'"></h3>
          <div class="options-grid">
            <div
              v-for="option in estateDetail.option"
              :key="option"
              class="option-item"
            >
              <img
                :src="optionIcons[option]?.icon"
                alt=""
                v-if="optionIcons[option]"
                class="option-icon"
              />
              <span class="option-text">{{
                optionIcons[option]?.[estateDetail.lan] || option
              }}</span>
            </div>
          </div>
        </div>

        <!-- 보안 옵션 -->
        <div
          v-if="estateDetail.secOption && estateDetail.secOption.length > 0"
          class="options-container"
        >
          <h3
            v-text="estateDetail.lan === 'KR' ? '보안 옵션' : 'Security Option'"
          ></h3>
          <div class="options-grid">
            <div
              v-for="option in estateDetail.secOption"
              :key="option"
              class="option-item"
            >
              <img
                :src="secOptionIcons[option]?.icon"
                alt=""
                v-if="secOptionIcons[option]"
                class="option-icon"
              />
              <span class="option-text">{{
                secOptionIcons[option]?.[estateDetail.lan] || option
              }}</span>
            </div>
          </div>
        </div>
        <hr />
        <div class="location-section">
          <h2
            style="font-weight: 600; font-size: 2rem; margin-bottom: 1rem"
            v-text="
              estateDetail.lan === 'KR'
                ? '위치 및 주변 편의시설'
                : 'Location and surrounding'
            "
          ></h2>

          <p style="font-weight: bold">{{ estateDetail.address }}</p>
          <div id="map" style="width: 700px; height: 600px"></div>
          <div class="marker-guide">
            <div
              v-for="(marker, category) in markerGuide"
              :key="category"
              class="marker-item"
            >
              <div>
                <img :src="marker.icon" alt="Marker Icon" class="marker-icon" />
              </div>
              <span class="marker-label">{{
                marker.label[estateDetail.lan]
              }}</span>
            </div>
          </div>
        </div>

        <hr />
        <div class="agent-container" style="gap: 1rem">
          <img
            src="/src/assets/images/avatar-10.jpg"
            style="width: 60px; height: 60px; border-radius: 50px"
          />
          <div style="flex-direction: column">
            <span style="color: grey">HOSTED BY</span>
            <div style="display: flex; font-weight: bold">
              <p
                v-text="
                  estateDetail.lan === 'KR' ? '중개사 상호' : 'Business Name'
                "
              ></p>
              <p>: {{ estateDetail.businessName }}</p>
            </div>
            <div style="display: flex">
              <p
                style="margin: 0"
                v-text="
                  estateDetail.lan === 'KR' ? '중개사 이름' : 'Agent Name'
                "
              ></p>
              <p style="margin: 0">: {{ estateDetail.agentName }}</p>
            </div>

            <div style="display: flex">
              <p
                style="margin: 0"
                v-text="estateDetail.lan === 'KR' ? '연락처' : 'Contact'"
              ></p>
              <p style="margin: 0">: {{ estateDetail.agentContact }}</p>
            </div>
            <div style="display: flex">
              <p
                style="margin: 0"
                v-text="
                  estateDetail.lan === 'KR'
                    ? '공인중개사 등록 번호'
                    : 'Registration Number'
                "
              ></p>
              <p style="margin: 0">: {{ estateDetail.agentRegNum }}</p>
            </div>
            <div style="display: flex">
              <p
                style="margin: 0"
                v-text="estateDetail.lan === 'KR' ? '소재지' : 'Agent Location'"
              ></p>
              <p style="margin: 0">: {{ estateDetail.agentLocation }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 오른쪽: 플로팅 바 -->
      <div class="sticky-bar clearfix">
        <Vue3StickySidebar
          class="sidebar"
          containerSelector=".estate-content"
          innerWrapperSelector=".sidebar__inner"
        >
          <div class="sidebar__inner">
            <div class="estate-info">
              <div class="estate-info-detail">
                <p
                  v-text="estateDetail.lan === 'KR' ? '보증금' : 'Deposit'"
                ></p>
                <p class="p-value">
                  ₩ {{ (estateDetail.deposit * 10000).toLocaleString('ko-KR') }}
                </p>
              </div>

              <div
                class="estate-info-detail"
                v-if="estateDetail.tradetype === 'monthly'"
              >
                <p
                  v-text="estateDetail.lan === 'KR' ? '월세' : 'Monthly Fee'"
                ></p>
                <p class="p-value">
                  ₩
                  {{
                    (estateDetail.monthlyPee * 10000).toLocaleString('ko-KR')
                  }}
                </p>
              </div>

              <hr class="divider" />
              <div class="estate-info-detail">
                <p v-text="estateDetail.lan === 'KR' ? '층수' : 'Floor'"></p>
                <p class="p-value">{{ estateDetail.floor }}</p>
              </div>
              <div class="estate-info-detail">
                <p
                  v-text="estateDetail.lan === 'KR' ? '면적' : 'Room Area'"
                ></p>
                <p class="p-value">{{ estateDetail.roomSize }}㎡</p>
              </div>
              <div class="button-group">
                <button class="contact-button">
                  <i
                    class="bi bi-telephone-forward-fill"
                    style="margin-right: 1rem"
                  ></i>
                  <span
                    v-text="estateDetail.lan === 'KR' ? '연락하기' : 'Contact'"
                  ></span>
                </button>
                <button
                  class="wishlist-button"
                  :class="{ active: isLiked }"
                  @click="handleLikeClick"
                >
                  <i class="bi bi-heart-fill" style="margin-right: 1rem"></i>
                  <span
                    v-text="
                      estateDetail.lan === 'KR' ? '매물 찜하기' : 'Like Estate'
                    "
                  ></span>
                </button>
                <button class="report-button" @click="goBlame">
                  <span
                    v-text="
                      estateDetail.lan === 'KR' ? '신고하기' : 'Declaration'
                    "
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </Vue3StickySidebar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { defineProps } from 'vue';
import axios from 'axios';
import Vue3StickySidebar from 'vue3-sticky-sidebar';
import detailConvenientApi from '@/api/detailConvenientApi';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useLikedEstateStore } from '@/stores/likedEstate';
import { useBlameStore } from '@/stores/blame';
const blameStore = useBlameStore();
const goBlame = () => {
  if (!isLogin.value) {
    alert('로그인이 필요한 서비스입니다.');
    // 현재 페이지 경로를 쿼리 파라미터로 넘기기
    router.push({
      path: '/auth/login',
      query: { redirect: router.currentRoute.value.fullPath },
    });
    return;
  }
  blameStore.blamedId = estateDetail.value.eno;
  // blameStore.buddizProfile = buddiz.value.profilePic;
  blameStore.agentNm = estateDetail.value.businessName;
  blameStore.agentPhone = estateDetail.value.agentContact;
  blameStore.eno = estateDetail.value.eno;
  blameStore.estateAddress = estateDetail.value.address;
  router.replace('/blame/agent');
};
const props = defineProps({
  eno: {
    type: Number,
    required: true,
  },
});
//좋아요관련
const authStore = useAuthStore();
const router = useRouter();
const likedEstateStore = useLikedEstateStore();

const isLogin = computed(() => authStore.isLogin);
const isLiked = computed(() => likedEstateStore.isLiked(props.eno));

const handleLikeClick = async () => {
  if (!isLogin.value) {
    alert('로그인이 필요한 서비스입니다.');
    router.push('/auth/login');
    return;
  }

  try {
    await likedEstateStore.toggleLike(props.eno);
  } catch (error) {
    console.error('Error toggling like:', error);
    alert('좋아요 처리 중 오류가 발생했습니다.');
  }
};

// 매물 정보를 담는 ref
const estateDetail = ref({});
const convenientMarkers = ref([]);
let map = null;
const convenientStoreMarker = `<img src="../src/assets/icons/convenient_store.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
const cafeMarker = `<img src="../src/assets/icons/cafe.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
const bankMarker = `<img src="../src/assets/icons/bank.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
const hospitalMarker = `<img src="../src/assets/icons/hospital.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
const markerGuide = {
  CS2: {
    icon: '/src/assets/icons/convenient_store.svg',
    label: { KR: '편의점', VN: 'Convenient Store' },
  },
  HP8: {
    icon: '/src/assets/icons/hospital.svg',
    label: { KR: '병원', VN: 'Hospital' },
  },
  BK9: {
    icon: '/src/assets/icons/bank.svg',
    label: { KR: '은행', VN: 'Bank' },
  },
  CE7: {
    icon: '/src/assets/icons/cafe.svg',
    label: { KR: '카페', VN: 'Cafe' },
  },
};

const optionIcons = {
  gasStove: {
    KR: '가스레인지',
    VN: 'Gas Stove',
    icon: '/src/assets/icons/cooker.png',
  },
  ac: {
    KR: '에어컨',
    VN: 'Air Conditioner',
    icon: '/src/assets/icons/air-conditioner.png',
  },
  wardrobe: {
    KR: '옷장',
    VN: 'Wardrobe',
    icon: '/src/assets/icons/wardrobe.png',
  },
  shoeRack: {
    KR: '신발장',
    VN: 'Shoerack',
    icon: '/src/assets/icons/shoe-rack.png',
  },
  refrigerator: {
    KR: '냉장고',
    VN: 'Refrigerator',
    icon: '/src/assets/icons/refrigerator.png',
  },
  wm: {
    KR: '세탁기',
    VN: 'Washing Machine',
    icon: '/src/assets/icons/washing.png',
  },
  sink: {
    KR: '싱크대',
    VN: 'Sink',
    icon: '/src/assets/icons/dishes-washer.png',
  },
  builtInCloset: {
    KR: '붙박이장',
    VN: 'Built-In Closet',
    icon: '/src/assets/icons/closet.png',
  },
  fAlarm: {
    KR: '화재경보기',
    VN: 'Fire Alarm',
    icon: '/src/assets/icons/smoke-detector.png',
  },
};

const secOptionIcons = {
  cctv: {
    KR: 'CCTV',
    VN: 'CCTV',
    icon: '/src/assets/icons/security-camera.png',
  },
  intercom: {
    KR: '인터폰',
    VN: 'Intercom',
    icon: '/src/assets/icons/intercom.png',
  },
  bouncer: {
    KR: '경비원',
    VN: 'Bouncer',
    icon: '/src/assets/icons/bouncer.png',
  },
  securityWindow: {
    KR: '방범창',
    VN: 'Security Window',
    icon: '/src/assets/icons/window.png',
  },
};
// housetype을 번역하는 함수
const translateHouseType = (housetype, lan) => {
  const housetypeMapping = {
    oneRoom: { KR: '원룸', VN: 'One Room' },
    twoRoom: { KR: '투룸', VN: 'Two Room' },
    officeTel: { KR: '오피스텔', VN: 'Officetel' },
    etc: { KR: '기타', VN: 'etc' },
    villa: { KR: '빌라', VN: 'Villa' },
    apartment: { KR: '아파트', VN: 'Apartment' },
  };

  // housetype이 유효한지 확인
  if (!housetypeMapping[housetype]) {
    console.warn(`Unknown housetype: ${housetype}`);
    return housetypeMapping['etc'][lan]; // 기본값은 '기타'로 설정
  }

  // 해당 housetype에 맞는 언어 값 반환
  return housetypeMapping[housetype][lan] || housetypeMapping[housetype]['KR']; // 기본값은 한국어
};
const getOptionIcons = (option, lan) => {
  return option
    .map((option) => {
      const { icon, [lan]: text } = optionIcons[option] || {};
      return { icon, text };
    })
    .filter((opt) => opt.icon); // 아이콘이 존재하는 경우만 필터링
};

const getSecOptionIcons = (secOption, lan) => {
  return secOption
    .map((option) => {
      const { icon, [lan]: text } = secOptionIcons[option] || {};
      return { icon, text };
    })
    .filter((opt) => opt.icon);
};

// 한국어 통화 포맷 함수
const formatDepositKR = (deposit) => {
  const billion = Math.floor(deposit / 10000); // 억 단위
  const thousand = Math.floor((deposit % 10000) / 1000); // 천 단위

  let result = '';
  if (billion > 0) {
    result += `${billion}억`;
  }
  if (thousand > 0) {
    result += ` ${thousand}천`;
  }
  return result.trim();
};

// 한국어 월세 포맷 함수 (만원 단위)
const formatMonthlyKR = (monthlyPee) => {
  return `${monthlyPee}만원`;
};

// 통합 통화 포맷 함수 - lan에 따라 한국어 또는 베트남어 포맷 처리
const formatMoney = (amount, type, lan) => {
  if (lan === 'KR') {
    if (type === 'deposit') {
      return formatDepositKR(amount); // 한국어 보증금 포맷 처리
    } else if (type === 'monthly') {
      return formatMonthlyKR(amount); // 한국어 월세 포맷 처리
    }
  } else if (lan === 'VN') {
    amount = amount * 10000; // 만원 단위 처리
    return `₩${amount.toLocaleString('ko-KR')}`; // 3자리마다 쉼표 추가
  }
  return amount; // 기본 값 (추가 언어에 대한 처리 가능)
};

// tradetype과 lan에 따라 다른 텍스트를 반환하는 computed 속성
const tradeWon = computed(() => {
  let text = '';

  if (estateDetail.value.tradetype === 'monthly') {
    // Monthly일 경우, 보증금(Deposit) + 월세 표시
    if (estateDetail.value.lan === 'KR') {
      text += `월세 ${formatMoney(
        estateDetail.value.deposit,
        'deposit',
        estateDetail.value.lan
      )} / ${formatMoney(
        estateDetail.value.monthlyPee,
        'monthly',
        estateDetail.value.lan
      )}`;
    } else {
      text += `Monthly ${formatMoney(
        estateDetail.value.deposit,
        'deposit',
        estateDetail.value.lan
      )} / ${formatMoney(
        estateDetail.value.monthlyPee,
        'monthly',
        estateDetail.value.lan
      )}`;
    }
  } else if (estateDetail.value.tradetype === 'charter') {
    // Charter일 경우
    if (estateDetail.value.lan === 'KR') {
      text += `전세 보증금 ${formatMoney(
        estateDetail.value.deposit,
        'deposit',
        estateDetail.value.lan
      )}`;
    } else {
      text += `Charter Deposit ${formatMoney(
        estateDetail.value.deposit,
        'deposit',
        estateDetail.value.lan
      )}`;
    }
  }

  return text;
});

// API에서 매물 정보 가져오기
onMounted(async () => {
  try {
    await fetchEstateDetails();
    await initMap();
    await fetchAndCreateConvenientMarkers();
  } catch (error) {
    console.error('Error in onMounted:', error);
  }
});

async function fetchEstateDetails() {
  const response = await axios.get(`/api/estate/list/${props.eno}`);
  estateDetail.value = response.data;

  // option과 secOption이 문자열로 오는 경우 배열로 변환
  if (typeof estateDetail.value.option === 'string') {
    estateDetail.value.option = estateDetail.value.option
      .split(',')
      .map((item) => item.trim());
  }
  if (typeof estateDetail.value.secOption === 'string') {
    estateDetail.value.secOption = estateDetail.value.secOption
      .split(',')
      .map((item) => item.trim());
  }
}
async function initMap() {
  if (!estateDetail.value.latitude || !estateDetail.value.longitude) return;

  // naver.maps 객체가 로드될 때까지 대기
  while (!window.naver || !window.naver.maps) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const mapOptions = {
    center: new naver.maps.LatLng(
      estateDetail.value.latitude,
      estateDetail.value.longitude
    ),
    zoom: 17,
    zoomControl: false,
    scrollWheel: false,
    draggable: false,
  };

  map = new naver.maps.Map('map', mapOptions);

  // 부동산 위치 마커
  new naver.maps.Marker({
    position: new naver.maps.LatLng(
      estateDetail.value.latitude,
      estateDetail.value.longitude
    ),
    map: map,
    icon: {
      content: `
      <div style="display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 3rem; background-image: url('/src/assets/icons/estate_marker.svg'); background-size: contain; background-repeat: no-repeat; background-position: center; cursor: pointer;">
        <span style="color: white; font-size: 1rem; font-weight: 600; text-align: center;">
<p style="margin:0; font-size:12px; line-height:1.5;">Here!</p>
</span>
      </div>
    `,
      anchor: new naver.maps.Point(15, 15),
    },
  });
}
async function fetchAndCreateConvenientMarkers() {
  try {
    const data = await detailConvenientApi.getConvenientLocations(
      estateDetail.value.latitude,
      estateDetail.value.longitude
    );

    Object.entries(data).forEach(([category, facilities]) => {
      facilities.forEach((facility) => {
        const marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(facility.y, facility.x),
          icon: {
            content: getConvenientMarkerIcon(category),
            size: new naver.maps.Size(24, 24),
            anchor: new naver.maps.Point(12, 12),
          },
          zIndex: -1,
        });
        convenientMarkers.value.push(marker);
      });
    });

    console.log('Convenient markers created:', convenientMarkers.value.length);
  } catch (error) {
    console.error('Error fetching convenient facility data:', error);
  }
}

function getConvenientMarkerIcon(category) {
  switch (category) {
    case 'CS2':
      return convenientStoreMarker;
    case 'HP8':
      return hospitalMarker;
    case 'BK9':
      return bankMarker;
    case 'CE7':
      return cafeMarker;
    default:
      return '';
  }
}
</script>

<style scoped>
.agent-container {
  display: flex;
}
.marker-guide {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  width: 500px;
}

.marker-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

.marker-icon {
  width: 30px;
  height: 30px;
}

.marker-label {
  font-size: 0.8rem;
  text-align: center;
  color: #333;
}
.location-section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#map {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
}
.options-container {
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
}

.option-item {
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
  align-items: center;

  width: 120%;
}

.option-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  margin-bottom: 5px;
}

.option-text {
  width: 100%;
  font-size: 0.8rem;
  color: #333;
}

.estate-content {
  display: flex;
  justify-content: space-between;
  margin: 3rem;
}

.estate-description {
  margin-left: 1rem;
  width: 70%;
}

.sticky-bar {
  width: 400px;
  margin-left: 4rem;
}

.sidebar__inner {
  transform: translate(0, 0);
  transform: translate3d(0, 0, 0);
  will-change: position, transform;
  margin-top: 100px;
}
.contact-button {
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.estate-info {
  box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.15);
  padding: 20px;
}
.img-container {
  display: flex;
  width: 100%;
}
.picArea {
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: white;

  border-radius: 1.5pt;
}

.picArea img {
  overflow: hidden;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.divider {
  border: 1px solid #ddd;
  margin: 15px 0;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.contact-button,
.wishlist-button {
  background-color: #f5f6f7;
  border: none;
  color: #616b79;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  font-size: 1rem;
}
.report-button {
  font-size: 0.75rem;
  border: none;
  background-color: white;
  color: #616b79;
}
.contact-button:hover,
.wishlist-button:hover,
.report-button:hover {
  background-color: #3f54e3;
  color: white;
}
.estate-info-detail {
  display: flex;
  justify-content: space-between;
}
.p-value {
  font-weight: 700;
}
.wishlist-button.active {
  background-color: #ff8f17;
  color: white;
}
</style>
