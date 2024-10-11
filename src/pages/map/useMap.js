import { ref } from 'vue';
import MarkerClustering from './markerClustering';
import estateApi from '@/api/estateApi';
import hotplaceApi from '@/api/hotplaceApi';

export function useMap(HOME_PATH) {
  const visibleMarkerCount = 0;
  const markers = ref([]);
  const estateMarkers = ref([]); // Estate 마커 배열
  const hotplaceMarkers = ref([]);
  const selectedMarker = ref(null);

  // 클러스터링 초기화 함수
  function initializeClustering(map, markers) {
    if (markers.length > 0) {
      const markerClustering = new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 18,
        map: map,
        markers: markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [clusterMarker1],
        indexGenerator: function (count) {
          var index = 0;

          if (count >= 100 && count < 200) {
            index = 1;
          } else if (count >= 200 && count < 500) {
            index = 2;
          }

          return index;
        },
        stylingFunction: function (clusterMarker, count) {
          const element = clusterMarker.getElement();
          const textElement = element.querySelector('div:first-child');
          var count = count - 1;
          if (textElement) {
            textElement.textContent = count;

            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
            element.style.width = '3rem';
            element.style.height = '3rem';
            element.style.backgroundImage =
              "url('src/assets/icons/estate_marker.svg')";
            element.style.backgroundSize = 'cover';
            element.style.backgroundRepeat = 'no-repeat';
            element.style.backgroundPosition = 'center';
            element.style.cursor = 'pointer';
            element.style.color = 'white';
            element.style.fontWeight = 'bold';
            textElement.style.transform = 'translateY(4px)';
          }
        },
      });
      console.log('Clustering initialized.'); // 클러스터링 초기화 완료 로그
    } else {
      console.warn('No markers to cluster.');
    }
  }
  // 전세가 포맷
  const formatPrice = (price, tradetype) => {
    if (tradetype === 'monthly') {
      return `${price}`; // 월세는 그대로 숫자 사용
    } else if (tradetype === 'charter') {
      const won = price; // 가격을 만 단위로 변환하지 않음
      const billion = Math.floor(won / 10000); // 억 단위 계산
      const thousand = Math.floor((won % 10000) / 1000); // 천 단위 계산

      let result = '';
      if (billion > 0) {
        result += `${billion}억`;
      }
      if (thousand > 0) {
        result += ` ${thousand}천`;
      }
      return result.trim(); // 앞뒤 공백 제거 후 반환
    }
    return price; // 기본값 (예외 처리)
  };
  const estateMarker = (tradetype, price) => {
    const displayTradeType = tradetype === 'monthly' ? '월세' : '전세'; // 'charter'를 '전세'로 가정
    const formattedPrice = formatPrice(price, tradetype); // 가격 포맷

    return `
      <div style="display: flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; background-image: url('/src/assets/icons/estate_marker.svg'); background-size: contain; background-repeat: no-repeat; background-position: center; cursor: pointer;">
        <span style="color: white; font-size: 1rem; font-weight: 600; text-align: center;">
          <p style="margin:0; font-size:12px; font-weight:400;">${displayTradeType}</p>
          <p style="margin:0; font-size:16px; line-height:1.5;">${formattedPrice}</p>
        </span>
      </div>
    `;
  };
  const clusterMarker1 = {
    content: `
      <div style="display: flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; background-image: url('../assets/icons/estate_marker.svg'); background-size: cover; background-repeat: no-repeat; background-position: center; cursor: pointer;">
      </div>
    `,
    size: N.Size(40, 40),
    anchor: N.Point(20, 20),
  };

  const subWayMapMarker = `
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
      어린이대공원역
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
  <button class="btn_filter" id="hotplace" data-active="false">핫플</button>
  <button class="btn_filter" id="safety" data-active="false">안전</button>
  <button class="btn_filter" id="convenient" data-active="false">편의</button>
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
          // active 클래스 토글
          if (button.classList.contains('active')) {
            button.classList.remove('active');
          } else {
            button.classList.add('active');
          }
        });
      });
      map.controls[naver.maps.Position.RIGHT_CENTER].push(
        customControl.getElement()
      );
    });
    // subwway 고정 마커찍기
    const subWayMarker = new naver.maps.Marker({
      map: map,

      position: { lat: 37.54785018, lng: 127.074454848 },

      icon: {
        content: subWayMapMarker,
        size: new naver.maps.Size(22, 35),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(11, 35),
      },
    });
    // hotpalce 마커찍기
    hotplaceApi
      .getHotplaceList()
      .then((response) => {
        const hotplaces = response.data;

        // 다국어처리 해야해!!
        const krHotplaces = hotplaces.filter(
          (hotplace) => hotplace.lan === 'KR'
        );
        krHotplaces.forEach((hotplace) => {
          const position = new naver.maps.LatLng(
            hotplace.longitude,
            hotplace.latitude
          );

          const marker = new naver.maps.Marker({
            map: map,
            position: position,
            title: hotplace.hpName,

            icon: {
              content: hotplaceMarker(hotplace.hpName),
              size: new naver.maps.Size(24, 37),
              anchor: new naver.maps.Point(12, 37),
              origin: new naver.maps.Point(0, 0),
            },
            zIndex: 100,
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            console.log('Hotplace clicked:', hotplace);
            // 핫플레이스 관련 작업 수행
          });

          hotplaceMarkers.value.push(marker);
        });
      })
      .catch((error) => {
        console.error('Error fetching hotplace data:', error);
      });

    // Estate 마커 찍기
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
            estate.tradetype === 'monthly' ? estate.monthlyPee : estate.deposit;

          const marker = new naver.maps.Marker({
            map: map,
            position: position,
            title: estate.title,
            animation: naver.maps.Animation.DROP,
            icon: {
              content: estateMarker(estate.tradetype, price),
              size: new naver.maps.Size(24, 37),
              anchor: new naver.maps.Point(12, 37),
              origin: new naver.maps.Point(0, 0),
            },
            zIndex: 100,
          });

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
        initializeClustering(map, estateMarkers.value);
      })
      .catch((error) => {
        console.error('Error fetching estate data:', error);
      });

    naver.maps.Event.addListener(map, 'idle', () => {
      updateMarkers(map, markers.value);
    });
  };

  // 필터 적용 함수
  function applyFilter(type) {
    // 모든 마커를 숨김
    markers.value.forEach((marker) => {
      marker.setMap(null);
    });

    // 선택된 타입의 마커만 표시
    markers.value.forEach((marker) => {
      if (marker.title === type) {
        marker.setMap(map);
      }
    });

    console.log(`${type} 필터 적용됨`);
  }

  // 마커 업데이트 함수
  const updateMarkers = (map, markers, visibleMarkerCount) => {
    const mapBounds = map.getBounds();
    visibleMarkerCount = 0;
    markers.forEach((marker) => {
      const position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
        visibleMarkerCount++;
      } else {
        hideMarker(marker);
      }
    });
    console.log(`Visible markers count: ${visibleMarkerCount}`);
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
  };
}
