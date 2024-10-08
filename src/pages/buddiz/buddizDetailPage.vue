<template>
  <div style="background-color: #F5F6F7;">
    <div class="buddiz-banner" style="margin-top: 10px; margin-bottom: 30px;">
      <h1>버디즈</h1>
      <p>나에게 꼭 맞는 버디를 찾아보세요!</p>
    </div>
  </div>

  <section class="content">
    <div class="container">
      <div class="row">

        <!-- 왼쪽 배너 시작 -->
        <div class="col-lg-3 me-lg-auto">
          <div class="card border-0 shadow mb-6 mb-lg-0">
            <!-- 사진 출력 부분 -->
            <div class="card-header bg-gray-100 py-4 border-0 text-center">
              <a class="d-inline-block" href="#">
                <img src="/src/assets/images/face1.jpg" alt="buddiz image" class="d-block avatar avatar-xxl p-2 mb-2"
                  style="width: 100px; height: 100px;">
              </a>
              <!-- 실명 입력 -->
              <h5>하니</h5>
              <p class="text-muted text-sm mb-0">Gwangjin-Gu, Jayang-Dong</p>
            </div>
            <!-- 별점, 달러 표시 -->
            <div class="card-body p-4">
              <div class=" test">
                <div class="icon-rounded icon-rounded-sm bg-primary-light flex-shrink-0 me-2" style="width: 150px;">
                  <img src="/src/assets/icons/roundstar.png" alt="star" style="width: 35px; height: 35px;">
                  <span style="margin-left: 10px; margin-top: 15px; display: inline; white-space: nowrap;">
                    4.8(888)
                  </span>
                </div>
              </div>

              <div class="test" style="margin-top: 20px;">
                <div class="icon-rounded icon-rounded-sm bg-primary-light flex-shrink-0 me-2" style="width: 100px;">
                  <img src="/src/assets/icons/roundmoney.png" alt="money" style="width: 35px; height: 35px;">
                  <span style="margin-left: 10px; margin-top: 15px;">
                    {{ price }}₩8000
                  </span>
                </div>
              </div>
              <hr>
              <div class="card-text text-muted">
                <div>유쾌함, 감성적인, 과묵함,</div>
                <div>기 쌤, 집주인과 타협 능숙,</div>
                <div>인테리어에 감각 있음</div>
                <br>
              </div>
              <div class="text-block">
                <div class="badge2 badge-secondary-light2" style="font-size: 15px;"><img
                    src="/src/assets/icons/heart.png" alt="star"> 버디즈 찜하기</div>
                <div class="badge2 badge-secondary-light2" style="font-size: 15px;"><img
                    src="/src/assets/icons/chatIcon.png" alt="star"> 채팅하기</div>
              </div>
            </div>
          </div>
        </div>


        <!-- 오른쪽 배너 시작 -->
        <div class="col-lg-9 ps-lg-5">
          <!-- 닉네임 -->
          <h1 class="hero-heading mb-0" style="">보니하니</h1>
          <!-- <div class="box">
            <div class="rounded-box">
              <p>한국 자취 28년</p>
            </div>
            <div class="rounded-box">
              <p>활동 77번</p>
            </div>
            <div class="rounded-box">
              <p>한국어</p>
            </div>
            <div class="rounded-box">
              <p>베트남어</p>
            </div>
          </div> -->
          <div class="text-block">
            <p>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">한국 자취 28년</span>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">활동 77번</span>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">한국어</span>
              <span style="margin-right: 7px;" class="badge badge-secondary-light">베트남어</span>
            </p>
          </div>

          <div class="text-block">
            <p> 안녕하세요^^ 하니입니다~ 벌써 한국에 온지도 3년이 지났네요..<br>
              그동안 배웠던 집구하기 꿀팁들을 다량 보유하고 있습니다~~!! <br>
              혼자서 집을 구하기 힘들거나 같이 발품팔 친구를 찾는다면 연락주세요 ☎☎ <br>
            </p>
          </div>

          <!-- 리뷰 시작 -->
          <br>
          <div class="text-block">
            <h5 class="mb-4">후기</h5>

            <!-- 리뷰 목록 출력 시작 -->

            <!-- <div class="d-flex d-block d-sm-flex review">
              <div v-for="review in reviewList" :key="review.id" class="text-md-center flex-shrink-0 me-4 me-xl-5">
                <img class="d-block avatar avatar-xl p-2 mb-2" :src="review.profileImage" alt="review image">
                <span class="text-uppercase text-muted text-sm">Dec 2018</span>
              </div>
              <div>
                <h6 class="mt-2 mb-1">{{ review.name }}</h6>
                <div class="mb-2"><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-primary"></i>
                </div>
                <p class="text-muted text-sm">{{ review.content }}</p>
              </div>
            </div> -->

            <!-- 리뷰 목록 출력 끝 -->




            <div class="d-flex d-block d-sm-flex review">
              <div class="text-md-center flex-shrink-0 me-4 me-xl-5">
                <img src="/src/assets/images/face2.jpg" alt="buddiz image" class="d-block avatar avatar-xxl p-2 mb-2"
                  style="width: 100px; height: 100px;"><span class="text-uppercase text-muted text-sm">Mar 2020</span>
              </div>
              <div>
                <h6 class="mt-2 mb-1">레이</h6>
                <div class="mb-2"><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-gray-200"></i>
                </div>
                <p class="text-muted text-sm">The bedding was hardly able to cover it and seemed ready to slide off any
                  moment. His many legs, pitifully thin compared with the size of the rest of him, waved about
                  helplessly as he looked. &quot;What's happened to me?&quot; he thought. It wasn't a dream. </p>
              </div>
            </div>
            <div class="d-flex d-block d-sm-flex review">
              <div class="text-md-center flex-shrink-0 me-4 me-xl-5">
                <img src="/src/assets/images/face3.jpg" alt="buddiz image" class="d-block avatar avatar-xxl p-2 mb-2"
                  style="width: 100px; height: 100px;">
                <span class="text-uppercase text-muted text-sm">Fab 2019</span>
              </div>
              <div>
                <h6 class="mt-2 mb-1">다니엘</h6>
                <div class="mb-2"><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-gray-200"></i><i class="fa fa-xs fa-star text-gray-200"></i>
                </div>
                <p class="text-muted text-sm">His room, a proper human room although a little too small, lay peacefully
                  between its four familiar walls. A collection of textile samples lay spread out on the table. </p>
              </div>
            </div>
            <div class="d-flex d-block d-sm-flex review">
              <div class="text-md-center flex-shrink-0 me-4 me-xl-5"><img src="/src/assets/images/face4.jpg"
                  alt="buddiz image" class="d-block avatar avatar-xxl p-2 mb-2"
                  style="width: 100px; height: 100px;"><span class="text-uppercase text-muted text-sm">Dec 2018</span>
              </div>
              <div>
                <h6 class="mt-2 mb-1">호날두</h6>
                <div class="mb-2"><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-primary"></i><i
                    class="fa fa-xs fa-star text-primary"></i><i class="fa fa-xs fa-star text-primary"></i>
                </div>
                <p class="text-muted text-sm">Samsa was a travelling salesman - and above it there hung a picture that
                  he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. </p>
              </div>
            </div>


            <!-- 리뷰 작성란 시작 -->
            <!-- <div class="py-5">
              <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse"
                data-bs-target="#leaveReview" aria-expanded="false" aria-controls="leaveReview">Leave a review</button>
              <div class="collapse mt-4" id="leaveReview">
                <h5 class="mb-4">Leave a review</h5>
                <form class="form" id="contact-form" method="get" action="#">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="mb-4">
                        <label class="form-label" for="name">Your name *</label>
                        <input class="form-control" type="text" name="name" id="name" placeholder="Enter your name"
                          required="required">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-4">
                        <label class="form-label" for="rating">Your rating *</label>
                        <select class="form-select focus-shadow-0" name="rating" id="rating">
                          <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                          <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                          <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                          <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                          <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="email">Your email *</label>
                    <input class="form-control" type="email" name="email" id="email" placeholder="Enter your  email"
                      required="required">
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="review">Review text *</label>
                    <textarea class="form-control" rows="4" name="review" id="review" placeholder="Enter your review"
                      required="required"></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit">Post review</button>
                </form>
              </div>
            </div> -->
            <!-- 리뷰 작성란 끝 -->
            <!-- 
            <div class="py-5">
                <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#leaveReview" aria-expanded="false" aria-controls="leaveReview">Leave a review</button>
                <div class="collapse mt-4" id="leaveReview">
                  <h5 class="mb-4">Leave a review</h5>
                  <form class="form" id="contact-form" method="get" action="#">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-4">
                          <label class="form-label" for="name">Your name *</label>
                          <input class="form-control" type="text" name="name" id="name" placeholder="Enter your name" required="required">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-4">
                          <label class="form-label" for="rating">Your rating *</label>
                          <select class="form-select focus-shadow-0" name="rating" id="rating">
                            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                            <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                            <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                            <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                            <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="email">Your email *</label>
                      <input class="form-control" type="email" name="email" id="email" placeholder="Enter your  email" required="required">
                    </div>
                    <div class="mb-4">
                      <label class="form-label" for="review">Review text *</label>
                      <textarea class="form-control" rows="4" name="review" id="review" placeholder="Enter your review" required="required"></textarea>
                    </div>
                    <button class="btn btn-primary" type="submit">Post review</button>
                  </form>
                </div>
              </div> -->


            <!-- <div class="py-5">
    <button 
      class="btn btn-outline-primary" 
      type="button" 
      @click="toggleReview"
    >
      Leave a review
    </button>
    <div class="collapse mt-4" v-show="isReviewVisible">
      <h5 class="mb-4">Leave a review</h5>
      <form class="form" id="contact-form" method="get" action="#">
        <div class="row">
          <div class="col-sm-6">
            <div class="mb-4">
              <label class="form-label" for="name">Your name *</label>
              <input 
                class="form-control" 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Enter your name" 
                required="required"
              >
            </div>
          </div>
          <div class="col-sm-6">
            <div class="mb-4">
              <label class="form-label" for="rating">Your rating *</label>
              <select class="form-select focus-shadow-0" name="rating" id="rating">
                <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label class="form-label" for="email">Your email *</label>
          <input 
            class="form-control" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Enter your email" 
            required="required"
          >
        </div>
        <div class="mb-4">
          <label class="form-label" for="review">Review text *</label>
          <textarea 
            class="form-control" 
            rows="4" 
            name="review" 
            id="review" 
            placeholder="Enter your review" 
            required="required"
          ></textarea>
        </div>
        <button class="btn btn-primary" type="submit">Post review</button>
      </form>
    </div>
  </div> -->



            <div class="py-5">
              <button class="btn btn-outline-primary" type="button" @click="toggleReview">
                Leave a review
              </button>
              <div v-show="isReviewVisible" class="mt-4">
                <h5 class="mb-4">Leave a review</h5>
                <form class="form" id="contact-form" method="get" action="#">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="mb-4">
                        <label class="form-label" for="name">Your name *</label>
                        <input class="form-control" type="text" name="name" id="name" placeholder="Enter your name"
                          required="required" />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-4">
                        <label class="form-label" for="rating">Your rating *</label>
                        <select class="form-select focus-shadow-0" name="rating" id="rating">
                          <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733; (5/5)</option>
                          <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734; (4/5)</option>
                          <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734; (3/5)</option>
                          <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734; (2/5)</option>
                          <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734; (1/5)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="email">Your email *</label>
                    <input class="form-control" type="email" name="email" id="email" placeholder="Enter your email"
                      required="required" />
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="review">Review text *</label>
                    <textarea class="form-control" rows="4" name="review" id="review" placeholder="Enter your review"
                      required="required"></textarea>
                  </div>
                  <button class="btn btn-primary" type="submit">Post review</button>
                </form>
              </div>
            </div>
          </div>
          <!-- 리뷰 끝 -->

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      buddizDetail: null, // 사용자 상세 데이터
      currentPage: 1,
      isReviewVisible: false, // 초기 상태 설정
      review: [
        {
          id: 1,
          name: '카리나',
          profileImage: '/src/assets/images/face1.jpg',
          rating: 5,
          content: '테스트다아.....................................ㅇㄹㄴㅇㄹㅇㄴㄹㅇㄹ',
        },
      ]
    };
  },
  created() {
    this.fetchBuddizDetail();
  },
  methods: {
    fetchBuddizDetail() {
      // 이곳에서 ID에 해당하는 사용자의 상세 정보를 가져옵니다.
      // 예시: API 호출 또는 데이터베이스 조회
      const buddiz = this.getBuddizById(this.id); // getBuddizById는 예시 메서드입니다.
      this.buddizDetail = buddiz;
    },
    getBuddizById(id) {
      // 실제 데이터에 맞춰서 수정하세요.
      const buddizList = [
        { id: 1, name: '카리나', profileImage: '/src/assets/images/face1.jpg' },
        // 추가 데이터...
      ];
      return buddizList.find(buddiz => buddiz.id === id);
    },
    fetchBuddizDetail() {
      const userId = this.$route.params.id; // URL 파라미터에서 사용자 ID 가져오기
      // 예시 데이터 (실제로는 API 호출을 통해 데이터를 가져올 수 있음)
      const users = [
        { id: 1, name: '사용자 1', email: 'user1@example.com', phone: '010-1234-5678' },
        { id: 2, name: '사용자 2', email: 'user2@example.com', phone: '010-2345-6789' },
        { id: 3, name: '사용자 3', email: 'user3@example.com', phone: '010-3456-7890' },
      ];
      this.user = users.find(user => user.id === parseInt(userId)); // ID로 사용자 찾기
    },
    toggleReview() {
      this.isReviewVisible = !this.isReviewVisible; // 버튼 클릭 시 상태 토글
    },
  },
  computed: {
    filteredBuddizs() {

      let result = this.buddizs;

      return result;
    },
  },

};
</script>




<style scoped>
.buddiz-banner {
  max-width: 1300px;
  margin: 0 auto;
}

.box {
  display: flex;
  /* 한 줄에 배치 */
  gap: 10px;
  /* 상자 간 간격 */
  justify-content: flex-start;
  /* 좌측 정렬 */
  align-items: center;
  /* 세로 가운데 정렬 */
  flex-wrap: wrap;
  /* 필요할 경우 줄바꿈 허용 */
}

.rounded-box {

  /* align-items: center; 수직 가운데 정렬 */
  /* justify-content: center; 수평 가운데 정렬 */
  /* white-space: nowrap; 텍스트 줄바꿈 방지 */
  /* font-size: 1em; 텍스트 크기 */
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 5px 5px 0px 10px;
  display: flex;
  flex-direction: column;
}

.badge {
  --bs-badge-padding-x: 0.7em;
  --bs-badge-padding-y: 0.5em;
  --bs-badge-font-size: 0.75em;
  --bs-badge-font-weight: 700;
  --bs-badge-color: #fff;
  --bs-badge-border-radius: 0.4rem;
  display: inline-block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: var(--bs-badge-color);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
}

.badge-secondary-light {
  color: #e83e8c;
  background-color: #fce2ee;
}

.badge2 {
  --bs-badge-padding-x: 0.7em;
  --bs-badge-padding-y: 0.5em;
  --bs-badge-font-size: 0.75em;
  --bs-badge-font-weight: 700;
  --bs-badge-color: #fff;
  --bs-badge-border-radius: 0.4rem;
  display: block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: var(--bs-badge-color);
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
  margin-bottom: 10px;
}

.badge-secondary-light2 {
  color: #616B79;
  background-color: #F5F6F7;
}
</style>