import { ref, reactive } from 'vue';
import MarkerClustering from './markerClustering';
import estateApi from '@/api/estateApi';
import hotplaceApi from '@/api/hotplaceApi';
import cctvApi from '@/api/cctvApi';
import convenientApi from '@/api/convenientApi';
import { useMarkerStore } from '@/stores/marker';

export function useMap(HOME_PATH) {
  const markers = ref([]);
  const estateMarkers = ref([]);
  const hotplaceMarkers = ref([]);
  const selectedMarker = ref(null);
  const selectedCluster = ref([]);
  const cctvMarkers = ref([]);
  const convenientMarkers = ref([]);
  let map = null;

  const activeFilters = reactive({
    hotplace: false,
    safety: false,
    convenient: false,
  });

  // 클러스터링 초기화 함수
  function onLoad(map, markers) {
    const cluster = new MarkerClustering({
      minClusterSize: 3,
      maxZoom: 16,
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
          Object.assign(element.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            backgroundImage: "url('src/assets/icons/estate_marker.svg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            cursor: 'pointer',
            color: 'white',
            fontWeight: 'bold',
          });
          textElement.style.transform = 'translateY(4px)';
        }
      },
    });
  }

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

  const initializeMap = (mapElement) => {
    const map = new naver.maps.Map(mapElement, {
      center: new naver.maps.LatLng(37.564214, 127.001699),
      zoom: 12,
      scaleControl: true,
      logoControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    // 필터 버튼 HTML
    var filterButtonsHtml = `
      <div class="filter-buttons">
        <button class="btn_filter" id="hotplace" >핫플</button>
        <button class="btn_filter" id="safety" >안전</button>
        <button class="btn_filter" id="convenient" >편의</button>
      </div>`;

    // 맵이 초기화되면 버튼 추가
    naver.maps.Event.once(map, 'init', function () {
      // 사용자 정의 컨트롤 추가
      var customControl = new naver.maps.CustomControl(filterButtonsHtml, {
        position: naver.maps.Position.RIGHT_BOTTOM,
      });

      customControl.setMap(map);

      // 각 버튼에 대한 클릭 이벤트 리스너 추가
      var filterButtons = customControl
        .getElement()
        .querySelectorAll('.btn_filter');

      filterButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();
          const filterId = button.id;
          activeFilters[filterId] = !activeFilters[filterId];

          button.classList.toggle('active', activeFilters[filterId]);
          button.dataset.active = activeFilters[filterId];

          applyFilter(filterId, activeFilters[filterId]);
        });
      });

      map.controls[naver.maps.Position.RIGHT_CENTER].push(
        customControl.getElement()
      );
      // 초기 필터 상태 적용
      applyInitialFilters();

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
            visible: activeFilters.safety,
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
                  visible: activeFilters.convenient,
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
        applyFilter('convenient', activeFilters.convenient);
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
            visible: activeFilters.hotplace,
          });
          hotplaceMarkers.value.push(marker);
          marker.setMap(map);
        });
      })
      .catch((error) => {
        console.error('Error fetching hotplace data:', error);
      });

    // Estate 마커 찍기
    const loadEstates = () => {
      estateApi
        .getEstateList()
        .then((response) => {
          const estates = response.data;

          estates.forEach((estate) => {
            const position = new naver.maps.LatLng(
              estate.latitude,
              estate.longitude
            );
            const price =
              estate.tradetype === 'monthly'
                ? estate.monthlyPee
                : estate.deposit;

            const marker = new naver.maps.Marker({
              map: map,
              position: position,
              title: estate.eno,
              // animation: naver.maps.Animation.DROP,
              icon: {
                content: estateMarker(estate.tradetype, price),
                size: new naver.maps.Size(24, 37),
                anchor: new naver.maps.Point(12, 37),
                origin: new naver.maps.Point(0, 0),
              },
              zIndex: 100,
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
        });
    };

    // 초기 매물 로드
    loadEstates();

    // 지도 idle 이벤트 처리
    naver.maps.Event.addListener(map, 'idle', async () => {
      updateMarkers(map, estateMarkers.value);
    });

    return map;
  };
  // getEstatesByLocation 함수 수정 및 export
  const getEstatesByLocation = async (latitude, longitude) => {
    try {
      const response = await estateApi.getEstateByLocation(latitude, longitude);
      const estates = response.data;
      estateMarkers.value = []; // 기존 마커 초기화

      estates.forEach((estate) => {
        const position = new naver.maps.LatLng(
          estate.latitude,
          estate.longitude
        );
        const marker = new naver.maps.Marker({
          map: map,
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
      });

      return estates; // 매물 리스트 반환
    } catch (error) {
      console.error('Error fetching estate data:', error);
      return [];
    }
  };

  // 필터 적용 함수 수정
  function applyFilter(type, isActive) {
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
    console.log(`${type} 필터 ${isActive ? '적용' : '해제'}됨`);
  }

  // 초기 필터 상태 적용 함수
  function applyInitialFilters() {
    Object.entries(activeFilters.value).forEach(([type, isActive]) => {
      applyFilter(type, isActive);
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
        showMarker(map, marker);
      } else {
        hideMarker(marker);
      }
    });

    console.log('penguin update log');
  };

  const showMarker = (map, marker) => {
    if (marker.getMap()) return;
    marker.setMap(map);
  };

  const hideMarker = (marker) => {
    if (!marker.getMap()) return;
    marker.setMap(null);
  };

  return {
    initializeMap,
    markers,
    selectedMarker,
    selectedCluster,
    getEstatesByLocation,

    activeFilters,

    map: () => map,
  };
}
