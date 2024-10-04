<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';


</script>

<template>
  <div style="background-color: #F2F5F9;">
    <!-- Container fluid -->
    <div class="container-fluid px-0" style="height: 90vh;" >

        <!-- row -->
        <div class="row g-0">
            <div class="col-xl-3 col-lg-12 col-md-12 col-12">
                <div class="bg-white border-end border-top" style="height: 90vh;">
                    <!-- chat list -->
                    <div class="chat-window">
                        <div class="bg-white">
                            <div class="px-4 pt-3 pb-4">
                                <!-- heading -->
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h2 class="fw-bold">채팅</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  data-simplebar style="height: 80vh; overflow: auto;">
                            <!-- tab content -->
                            <div class="tab-content" id="tabContent">
                                <!-- tab pane -->
                                <div
                                    class="tab-pane fade show active"
                                    id="recent"
                                    role="tabpanel"
                                    aria-labelledby="recent-tab">
                                    <!-- contact list -->
                                    <ul class="list-unstyled contacts-list">
                                        
                                        <!-- chat item : 새로운 메시지가 있는 케이스 -->
                                        <li
                                            class="py-3 px-4 chat-item contacts-item">
                                            <div
                                                class="d-flex justify-content-between align-items-center">
                                                <a href="#" class="text-link contacts-link">
                                                    <!-- media -->
                                                    <div class="d-flex">
                                                        <div
                                                            class="avatar avatar-md">
                                                            <img
                                                                src="../../assets/images/avatar-15.jpg"
                                                                alt=""
                                                                class="rounded-circle"
                                                            />
                                                        </div>
                                                        <!-- media body -->
                                                        <div class="ms-2">
                                                            <h5 class="mb-0">Minji</h5>
                                                            <p class="mb-0 text-muted">
                                                                그 근처에 맞집 많아요!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div>
                                                    <small class="text-muted">8:48AM</small>
                                                    <div class="text-end">
                                                        <span
                                                            class="icon-shape icon-xs text-white bg-danger rounded-circle fw-bold fs-6"
                                                            >N</span>
													</div>
                                                </div>
                                            </div>
                                        </li>

                                        <!-- chat item : 기존 -->
                                        <li class="py-3 px-4 chat-item contacts-item">
                                            <div
                                                class="d-flex justify-content-between align-items-center">
                                                <a href="#" class="text-link contacts-link">
                                                    <!-- media -->
                                                    <div class="d-flex">
                                                        <div
                                                            class="avatar avatar-md">
                                                            <img
                                                                src="../../assets/images/avatar-14.jpg"
                                                                alt=""
                                                                class="rounded-circle"
                                                            />
                                                        </div>
                                                        <!-- media body -->
                                                        <div class=" ms-2">
                                                            <h5 class="mb-0">Sharad Mishra</h5>
                                                            <p class="mb-0 text-muted">
                                                                시간을 좀 조율해야할 것 같은데...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div>
                                                    <small class="text-muted">8:48AM</small>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-12 col-md-12 col-12">

                <!-- chat list -->
                <div class=" chat-body w-100 vh-100" data-simplebar="">
                    <div
                        class="bg-white border-top border-bottom px-4 py-3">
                        <div
                            class="d-flex justify-content-between align-items-center">
                            <!-- 채팅 상대 정보 -->
                            <div class="d-flex align-items-center">
                                <a href="#" class="me-2 d-xl-none d-block" data-close
                                    ><i class="fe fe-arrow-left"></i
                                ></a>
                                <div
                                    class="avatar avatar-md"
                                >
                                    <img
                                        src="../../assets/images/avatar-14.jpg"
                                        alt=""
                                        class="rounded-circle"
                                    />
                                </div>
                                <!-- media body -->
                                <div class=" ms-2">
                                    <h4 class="mb-0">Sharad Mishra</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- chating List -->
                    <div class="px-4 py-4 overflow-auto" style="height: 70vh;">

                        <!-- 받은 메시지 케이스 -->
                        <div class="d-flex w-lg-40 mb-4">
                            <img
                                src="../../assets/images/avatar-14.jpg"
                                alt=""
                                class="rounded-circle avatar-md"
                            />
                            <!-- media body -->
                            <div class=" ms-3">
                                <small>09:35</small>
                                <div class="d-flex">
                                    <div class="card mt-2 rounded-top-md-left-0">
                                        <div class="card-body p-3">
                                            <p class="mb-0 text-dark">
                                                어디를 방문할 예정이신가요?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- 보낸 메시지 케이스 -->
                        <div class="d-flex justify-content-end mb-4">
                            <div class="d-flex w-lg-40">
                                <!-- media body -->
                                <div class=" me-3 text-end">
                                    <small> 09:39</small>
                                    <div class="d-flex">
                                        <!-- card -->
                                        <div
                                            class="card mt-2 rounded-top-md-end-0 text-white" style="background-color: #8892A0;">
                                            <!-- card body -->
                                            <div class="card-body text-start p-3">
                                                <p class="mb-0">
                                                    어린이 대공원역 근처에 있는 오피스텔을 가보려고 해요! 
                                                    혹시 언제 시간이 괜찮으신가요?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- img -->
                                <img
                                    src="../../assets/images/avatar-1.jpg"
                                    alt=""
                                    class="rounded-circle avatar-md"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- insert place -->
                    <div class="px-4 py-3 mt-auto">
                        <div class="bg-white p-1 rounded-3 shadow-sm">
                            <form>
                                <div class="position-relative">
                                    <textarea
                                        class="form-control border-0 form-control-simple no-resize"
                                        placeholder="메시지를 입력해주세요"
                                        rows="1"
                                    ></textarea>
                                </div>
                                <div class="position-absolute end-0 mt-n6 me-4">
                                    <button
                                        type="submit"
                                        class="btn btn-focus-none">
                                        <img src="@/assets/icons/icon_send.svg" style="height: 26px;"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<style scoped>
@media (max-width: 1199.98px) {
  .chat-layout .chat-body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1020;
    visibility: hidden;
    transform: translateX(100%);
    transition: transform 0.3s ease, visibility 0.3s ease;
    background: #f5f4f8;
  }
}

@media (max-width: 1199.98px) {
  .chat-layout .chat-body.chat-body-visible {
    visibility: visible;
    transform: translateX(0);
  }
}

.btn.btn-focus-none:focus {
  box-shadow: none;
}

.btn {
    --bs-btn-bg: transparent;
    --bs-btn-border-color: transparent;
}

.position-relative {
  position: relative !important;
}

.mt-auto {
  margin-top: auto !important;
}


.position-absolute {
  position: absolute !important;
}

.mt-n6 {
  margin-top: -2.5rem !important;
}

.mt-n7 {
  margin-top: -3rem !important;
}
    
.rounded-circle{border-radius:50%!important}
    

.border-end {
  border-right: 1px solid #ecebf1 !important;
}

.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}


.fw-bold {
  font-weight: 700 !important;
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.chat-item {
  position: relative;
  transition: background-color 0.3s;
}

.chat-item:hover {
  background-color: #f5f4f8;
}

.avatar {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 3rem;
}

.avatar-md {
  width: 2.5rem;
  height: 2.5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}


.text-muted {
  --bs-text-opacity: 1;
  color: #a8a3b9 !important;
}

.text-muted {
  --bs-text-opacity: 1;
  color: #a8a3b9 !important;
}

.text-end {
  text-align: right !important;
}

.icon-shape {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
}

.icon-xs {
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
}

.text-white {
  --bs-text-opacity: 1;
  color: #fff !important;
}

.fs-6 {
  font-size: 0.75rem !important;
}

.text-link {
  color: #5c5776;
  text-decoration: none;
}
</style>
