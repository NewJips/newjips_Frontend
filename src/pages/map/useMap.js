import { ref } from 'vue';
import { MARKER_SPRITE_POSITION, FIXED_MARKER_DATA } from './markerSprite';

export function useMap(HOME_PATH) {
  const visibleMarkerCount = 0;
  const markers = ref([]);
  const selectedMarker = ref(null);
  const estateMarker = (title, price) => {
    return `
      <div style="display: flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; background-image: url('../src/assets/icons/estate_marker.svg'); background-size: contain; background-repeat: no-repeat; background-position: center; cursor: pointer;">
        <span style="color: white; font-size: 1rem; font-weight: 600; text-align: center;">
          <p style="margin:0; font-size:12px; font-weight:400;">${title}</p>
          <p style="margin:0; font-size:16px; line-height:1.5;">${price}</p>
        </span>
        </span>
      </div>
    `;
  };
  const subWayMapMarker = `
 <div
    style="
      display: flex;
    padding: 0 8px;
    height: 35px;
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
  const hotPlaceMapMarker = `
 <div
    style="
      display: flex;
      padding: 0 8px;
      height: 35px;
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
    <p style="color: white; font-weight: bold; margin: 0">정빈이네집</p>
  </div>
`;

  const initializeMap = (mapElement) => {
    const map = new naver.maps.Map(mapElement, {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
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
    // hotpalce 고정 마커찍기
    const hotPlaceMarker = new naver.maps.Marker({
      map: map,

      position: { lat: 38.3595704, lng: 127.105399 },

      icon: {
        content: hotPlaceMapMarker,
        size: new naver.maps.Size(22, 35),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(11, 35),
      },
    });

    markers.value.push(hotPlaceMarker);
    // 랜덤 마커찍기(CustomMarker)
    const bounds = map.getBounds();
    const southWest = bounds.getSW();
    const northEast = bounds.getNE();
    const lngSpan = northEast.lng() - southWest.lng();
    const latSpan = northEast.lat() - southWest.lat();

    for (const key in MARKER_SPRITE_POSITION) {
      const position = new naver.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random()
        // { lat: 37.3595704, lng: 127.105399 },
        // { lat: 37.3595904, lng: 127.105629 },
        // { lat: 37.3596104, lng: 127.105649 }
      );

      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key, // 마커의 title을 필터 구분자로 사용
        animation: naver.maps.Animation.DROP,
        icon: {
          content: estateMarker(key, MARKER_SPRITE_POSITION[key].price),

          size: new naver.maps.Size(24, 37),
          anchor: new naver.maps.Point(12, 37),
          origin: new naver.maps.Point(
            MARKER_SPRITE_POSITION[key].position[0],
            MARKER_SPRITE_POSITION[key].position[1]
          ),
        },
        zIndex: 100,
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        console.log('penguin random marker click log');
        selectedMarker.value = {
          latitude: marker.getPosition().lat(),
          longitude: marker.getPosition().lng(),
          title: key,
        };
      });

      markers.value.push(marker);
    }

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
