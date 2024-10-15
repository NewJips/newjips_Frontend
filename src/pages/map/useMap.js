import { ref, reactive, watch, computed } from 'vue';
import MarkerClustering from './markerClustering';
import estateApi from '@/api/estateApi';
import hotplaceApi from '@/api/hotplaceApi';
import cctvApi from '@/api/cctvApi';
import convenientApi from '@/api/convenientApi';
import { useMarkerStore } from '@/stores/marker';
import { useFilterStore } from '@/stores/filter';
import { useRoute } from 'vue-router';

export function useMap(HOME_PATH) {
  const route = useRoute();
  //필터
  const filterStore = useFilterStore();
  //로딩
  const isLoading = ref(false);
  //마커
  const markers = ref([]);
  const estateMarkers = ref([]);
  const hotplaceMarkers = ref([]);
  const selectedMarker = ref(null);
  const selectedCluster = ref([]);
  const cctvMarkers = ref([]);
  const convenientMarkers = ref([]);
  let map = null;

  const activeToggles = reactive({
    hotplace: true,
    safety: false,
    convenient: false,
  });
  let markerCluster = null;
  let estatesLoaded = false;
  // 클러스터링 초기화 함수
  function onLoad(map, markers) {
    if (markerCluster) {
      markerCluster.clearMarkers();
    }
    markerCluster = new MarkerClustering({
      minClusterSize: 3,
      maxZoom: 20,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 80,
      icons: [clusterMarker2, clusterMarker3, clusterMarker4, clusterMarker5],
      indexGenerator: [1, 2, 3, 4],
      stylingFunction: (clusterMarker, count) => {
        const adjustedCount = count - 1;
        const element = clusterMarker.getElement();
        const textElement = element.querySelector('div:first-child');

        if (textElement) {
          textElement.textContent = adjustedCount;
          textElement.style.fontFamily = 'gmarket-font';
          Object.assign(element.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            backgroundColor: '#ff5722',
            borderRadius: '50%',
            cursor: 'pointer',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          });
          textElement.style.transform = 'translateY(4px)';
        }
      },
    });
  }

  const updateClustering = () => {
    if (map && estateMarkers.value.length > 0) {
      onLoad(
        map,
        estateMarkers.value.filter((marker) => marker.getVisible())
      );
    }
  };
  // 전세가 포맷
  const formatPrice = (price, tradetype) => {
    if (tradetype === 'monthly') {
      return `${price}`;
    } else if (tradetype === 'charter') {
      const won = price;
      const billion = Math.floor(won / 10000);
      const thousand = Math.floor((won % 10000) / 1000);

      let result = '';
      if (billion > 0) {
        result += `${billion}억`;
      }
      if (thousand > 0) {
        result += ` ${thousand}천`;
      }
      return result.trim();
    }
    return price;
  };
  const estateMarker = (tradetype, price) => {
    const displayTradeType = tradetype === 'monthly' ? '월세' : '전세';
    const formattedPrice = formatPrice(price, tradetype);

    return `
      <div style="display: flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; background-image: url('/src/assets/icons/estate_marker.svg'); background-size: contain; background-repeat: no-repeat; background-position: center; cursor: pointer;">
        <span style="color: white; font-size: 1rem; font-weight: 600; text-align: center;">
          <p style="margin:0; font-size:12px; font-weight:400;">${displayTradeType}</p>
          <p style="margin:0; font-size:16px; line-height:1.5;">${formattedPrice}</p>
        </span>
      </div>
    `;
  };

  const clusterMarker2 = {
    content: `
      <div >
      </div>
    `,
  };
  const clusterMarker3 = {
    content: `
      <div >
      </div>
    `,
  };
  const clusterMarker4 = {
    content: `
      <div >
      </div>
    `,
  };
  const clusterMarker5 = {
    content: `
      <div >
      </div>
    `,
  };

  const subWayMapMarker = (stationName) => `
 <div
    style="
      display: flex;
    padding: 0 10px;
    height: 40px;
      background-color: #3f54e3;
      border-radius: 50px;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      gap:5px
    "
  >
    <img src="../src/assets/icons/train_icon.svg" style="width: 24px; height: 24px" />

    <p style="color: white; margin-top: 15px; font-weight: bold">
    ${stationName}
    </p>
  </div>
`;
  const hotplaceMarker = (hpName) => {
    return `
 <div
    style="
      display: flex;
      padding: 0 10px;
      height: 40px;
      background-color: #ff8f17;
      border-radius: 50px;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    "
  >
    <img
      src="../src/assets/icons/hot_place_icon.svg"
      style="width: 24px; height: 24px; margin-right: 10px"
    />
    <p style="color: white; font-weight: bold; margin: 0">${hpName}</p>
  </div>
`;
  };
  const cctvMarker = `
  <img
  src="../src/assets/icons/cctv.svg"
  style="width: 24px; height: 24px; margin-right: 10px"
  />
  `;
  const convenientStoreMarker = `<img src="../src/assets/icons/convenient_store.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
  const cafeMarker = `<img src="../src/assets/icons/cafe.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
  const bankMarker = `<img src="../src/assets/icons/bank.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
  const hospitalMarker = `<img src="../src/assets/icons/hospital.svg" style="width: 24px; height: 24px; margin-right: 10px" />`;
  // 기본값 설정 (쿼리 파라미터가 없을 경우)
  const defaultLat = 37.54785018;
  const defaultLng = 127.074454848;

  // 쿼리 파라미터로 받은 값 또는 기본값 사용
  const centerLat = route.query.centerLat
    ? parseFloat(route.query.centerLat)
    : defaultLat;
  const centerLng = route.query.centerLng
    ? parseFloat(route.query.centerLng)
    : defaultLng;

  const initializeMap = (mapElement) => {
    const map = new naver.maps.Map(mapElement, {
      center: new naver.maps.LatLng(centerLat, centerLng),
      zoom: 16,
      scaleControl: true,
      logoControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    // 토글 버튼 HTML
    var toggleButtonsHtml = `
      <div class="filter-buttons">
        <button class="btn_filter" id="hotplace" >핫플</button>
        <button class="btn_filter" id="safety">안전</button>
        <button class="btn_filter" id="convenient">편의</button>
      </div>`;

    // 맵이 초기화되면 버튼 추가
    naver.maps.Event.once(map, 'init', function () {
      // 사용자 정의 컨트롤 추가
      var customControl = new naver.maps.CustomControl(toggleButtonsHtml, {
        position: naver.maps.Position.RIGHT_BOTTOM,
      });

      customControl.setMap(map);

      // 각 버튼에 대한 클릭 이벤트 리스너 추가
      var toggleButtons = customControl
        .getElement()
        .querySelectorAll('.btn_filter');

      toggleButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          const toggleId = button.id;
          activeToggles[toggleId] = !activeToggles[toggleId];

          button.classList.toggle('active', activeToggles[toggleId]);
          button.dataset.active = activeToggles[toggleId];

          applyToggle(toggleId, activeToggles[toggleId]);
        });
      });

      map.controls[naver.maps.Position.RIGHT_CENTER].push(
        customControl.getElement()
      );
      // 초기 토글 상태 적용
      applyInitialToggles();

      return map;
    });
    const stations = [
      { lat: 37.54785018, lng: 127.074454848, name: '어린이대공원역' },
      { lat: 37.4980669, lng: 127.0281517, name: '강남역' },
      { lat: 37.5446007, lng: 127.0555885, name: '성수역' },
      { lat: 37.557667, lng: 126.925666, name: '홍대입구역' },
    ];
    // 각 역에 대해 마커 생성
    const subwayMarkers = stations.map((station) => {
      return new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(station.lat, station.lng),
        icon: {
          content: subWayMapMarker(station.name),
          size: new naver.maps.Size(22, 35),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(11, 35),
        },
        zIndex: 101,
      });
    });

    // cctv 마커찍기

    cctvApi
      .getCctvList()
      .then((response) => {
        const cctvs = response.data;
        cctvs.forEach((cctv) => {
          const position = new naver.maps.LatLng(cctv.latitude, cctv.longitude);
          const marker = new naver.maps.Marker({
            position: position,
            icon: {
              content: cctvMarker,
              size: new naver.maps.Size(24, 24),
              anchor: new naver.maps.Point(12, 24),
            },
            zIndex: 100,
            visible: activeToggles.safety,
          });
          cctvMarkers.value.push(marker);
          marker.setMap(map);
        });
      })
      .catch((error) => {
        console.error('Error fetching CCTV data:', error);
      });
    // 편의시설 마커 생성
    convenientApi
      .getConvenientLocations()
      .then((data) => {
        data.forEach((locationData) => {
          Object.entries(locationData.categories).forEach(
            ([category, facilities]) => {
              facilities.forEach((facility) => {
                const marker = new naver.maps.Marker({
                  map: map,
                  position: new naver.maps.LatLng(facility.y, facility.x),

                  icon: {
                    content: getConvenientMarkerIcon(category),
                    size: new naver.maps.Size(24, 24),
                    anchor: new naver.maps.Point(12, 12),
                  },
                  zIndex: 100,
                  visible: activeToggles.convenient,
                });
                convenientMarkers.value.push(marker);
              });
            }
          );
        });
        console.log(
          'Convenient markers created:',
          convenientMarkers.value.length
        );
        applyToggle('convenient', activeToggles.convenient);
      })
      .catch((error) => {
        console.error('Error fetching convenient facility data:', error);
      });

    // 편의시설 마커 아이콘 가져오기
    const getConvenientMarkerIcon = (category) => {
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
    };
    // hotplace 마커찍기
    hotplaceApi
      .getHotplaceList()
      .then((response) => {
        const hotplaces = response.data;
        const krHotplaces = hotplaces.filter(
          (hotplace) => hotplace.lan === 'KR'
        );
        krHotplaces.forEach((hotplace) => {
          const position = new naver.maps.LatLng(
            hotplace.longitude,
            hotplace.latitude
          );
          const marker = new naver.maps.Marker({
            position: position,
            title: hotplace.hpName,
            icon: {
              content: hotplaceMarker(hotplace.hpName),
              size: new naver.maps.Size(24, 37),
              anchor: new naver.maps.Point(12, 37),
            },
            zIndex: 101,
            visible: activeToggles.hotplace,
          });
          hotplaceMarkers.value.push(marker);
          marker.setMap(map);
        });
      })
      .catch((error) => {
        console.error('Error fetching hotplace data:', error);
      });
    // estate 마커 찍기

    const loadEstates = () => {
      if (estatesLoaded) return;
      isLoading.value = true;
      estateApi
        .getEstateList()
        .then((response) => {
          const estates = response.data;
          const filters = filterStore.filters; // 현재 필터 상태 가져오기
          estatesLoaded = true;
          updateClustering();
          estates.forEach((estate) => {
            const position = new naver.maps.LatLng(
              estate.latitude,
              estate.longitude
            );
            const price =
              estate.tradetype === 'monthly'
                ? estate.monthlyPee
                : estate.deposit;

            // 필터 조건에 따라 마커의 초기 가시성 결정
            const isVisible = applyFilters(estate, filters);

            const marker = new naver.maps.Marker({
              position: position,
              title: estate.eno,
              map: map,
              icon: {
                content: estateMarker(estate.tradetype, price),
                size: new naver.maps.Size(24, 37),
                anchor: new naver.maps.Point(12, 37),
                origin: new naver.maps.Point(0, 0),
              },
              zIndex: 100,
              visible: isVisible,
            });
            marker.estateData = estate;

            naver.maps.Event.addListener(marker, 'click', () => {
              console.log('Marker clicked:', estate);
              selectedMarker.value = {
                eno: estate.eno,
                latitude: estate.latitude,
                longitude: estate.longitude,
                title: estate.title,
                tradetype: estate.tradetype,
                deposit: estate.deposit,
                monthlyPee: estate.monthlyPee,
                housetype: estate.housetype,
                floor: estate.floor,
                roomSize: estate.roomSize,
                distToSub: estate.distToSub,
                img: estate.img,
                lan: estate.lan,
              };
            });

            estateMarkers.value.push(marker);
          });

          // 모든 마커 추가 후 클러스터링 초기화

          onLoad(map, estateMarkers.value);
        })
        .catch((error) => {
          console.error('Error fetching estate data:', error);
        })
        .finally(() => {
          isLoading.value = false; // 로딩 완료
        });
    };
    loadEstates();

    // 지도 idle 이벤트 처리
    naver.maps.Event.addListener(map, 'idle', () => {
      updateMarkers(map, estateMarkers.value);
      updateClustering();
    });

    return map;
  };
  // getEstatesByLocation 함수 수정 및 export
  const getEstatesByLocation = async (latitude, longitude) => {
    try {
      const response = await estateApi.getEstateByLocation(latitude, longitude);
      const estates = response.data;

      estates.forEach((estate) => {
        if (
          !estateMarkers.value.some(
            (marker) => marker.estateData.eno === estate.eno
          )
        ) {
          const position = new naver.maps.LatLng(
            estate.latitude,
            estate.longitude
          );
          const marker = new naver.maps.Marker({
            position: position,
            title: estate.eno,
            icon: {
              content: estateMarker(estate.tradetype, estate.deposit),
              size: new naver.maps.Size(24, 37),
              anchor: new naver.maps.Point(12, 37),
            },
            zIndex: 100,
          });

          marker.estateData = estate;
          estateMarkers.value.push(marker);
        }
      });

      estatesLoaded = true;
      updateClustering();
      return estates;
    } catch (error) {
      console.error('Error fetching estate data:', error);
      return [];
    }
  };

  // 토글 적용 함수 수정
  function applyToggle(type, isActive) {
    switch (type) {
      case 'hotplace':
        toggleMarkers(hotplaceMarkers.value, isActive);
        break;
      case 'safety':
        toggleMarkers(cctvMarkers.value, isActive);
        break;
      case 'convenient':
        toggleMarkers(convenientMarkers.value, isActive);
        break;
    }
    console.log(`${type} 토글 ${isActive ? '적용' : '해제'}됨`);
  }

  // 초기 토글 상태 적용 함수
  function applyInitialToggles() {
    Object.entries(activeToggles).forEach(([type, isActive]) => {
      applyToggle(type, isActive);

      // 버튼 요소를 찾아 클래스를 업데이트합니다.
      const button = document.getElementById(type);
      if (button) {
        button.classList.toggle('active', isActive);
        button.dataset.active = isActive.toString();
      }
    });
  }

  // 마커 토글 함수 수정
  function toggleMarkers(markerGroup, show) {
    if (Array.isArray(markerGroup)) {
      markerGroup.forEach((marker) => {
        if (marker && marker.setVisible) {
          marker.setVisible(show);
        }
      });
    }
  }

  // 마커 업데이트 함수
  const updateMarkers = (map, markers) => {
    const mapBounds = map.getBounds();

    markers.forEach((marker) => {
      const position = marker.getPosition();
      if (mapBounds.hasLatLng(position)) {
        if (!marker.getMap()) marker.setMap(map);
      } else {
        if (marker.getMap()) marker.setMap(null);
      }
    });

    console.log(
      'Map updated, visible markers:',
      markers.filter((m) => m.getMap()).length
    );
  };

  const updateMarkersVisibility = () => {
    const filters = filterStore.filters;

    estateMarkers.value.forEach((marker) => {
      const estate = marker.estateData;
      const isVisible = applyFilters(estate, filters);
      marker.setVisible(isVisible);
    });

    updateClustering();
  };

  const applyFilters = (estate, filters) => {
    let isVisible = true;

    // 거래유형 필터
    if (filters.tradetype.charter || filters.tradetype.monthly) {
      isVisible =
        (filters.tradetype.charter && estate.tradetype === 'charter') ||
        (filters.tradetype.monthly && estate.tradetype === 'monthly');
    }

    // 보증금 필터
    if (isVisible && estate.deposit !== undefined) {
      isVisible =
        estate.deposit >= filters.deposit.min &&
        estate.deposit <= filters.deposit.max;
    }

    // 월세 필터 (월세인 경우에만 적용)
    if (
      isVisible &&
      estate.tradetype === 'monthly' &&
      estate.monthlyPee !== undefined
    ) {
      isVisible =
        estate.monthlyPee >= filters.monthlyPee.min &&
        estate.monthlyPee <= filters.monthlyPee.max;
    }

    // 방 크기 필터
    if (isVisible && estate.roomSize !== undefined) {
      isVisible =
        estate.roomSize >= filters.roomSize.min &&
        estate.roomSize <= filters.roomSize.max;
    }

    // 층수 필터
    if (
      isVisible &&
      (filters.floor['1층'] ||
        filters.floor['2층 이상'] ||
        filters.floor['반지하'])
    ) {
      isVisible =
        (filters.floor['1층'] && estate.floor === 1) ||
        (filters.floor['2층 이상'] && estate.floor >= 2) ||
        (filters.floor['반지하'] && estate.floor < 0);
    }

    // 구조 필터
    if (isVisible && Object.values(filters.housetype).some((v) => v)) {
      if (filters.housetype.oneRoom && estate.housetype === 'oneRoom') {
        isVisible = true;
      } else if (filters.housetype.twoRoom && estate.housetype === 'twoRoom') {
        isVisible = true;
      } else if (
        filters.housetype.threeRoomPlus &&
        ['villa', 'apartment', 'etc'].includes(estate.housetype)
      ) {
        isVisible = true;
      } else if (
        filters.housetype.officeTel &&
        estate.housetype === 'officeTel'
      ) {
        isVisible = true;
      } else {
        isVisible = false;
      }
    }

    return isVisible;
  };

  // 필터 상태 변경 감지
  watch(() => filterStore.filters, updateMarkersVisibility, { deep: true });
  return {
    initializeMap,
    markers,
    selectedMarker,
    selectedCluster,
    getEstatesByLocation,
    isLoading,
    activeToggles,
    applyFilters,
    // visibleMarkers,
    map: () => map,
    updateMarkersVisibility,
  };
}
