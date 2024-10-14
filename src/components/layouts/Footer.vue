<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="company-info">
        <p>Homes</p>
        <p>대표: 민지kim</p>
        <p>대표 번호: 02-1234-5678</p>
        <p>주소: 서울 강남구 테헤란로93길 7-9 5층 엠제이하이브센터</p>
        <p>고객센터: 02-1234-5678 | 평일 10:00~18:00, 점심시간: 12:30~18:00 (주말, 공휴일 휴무)</p>
        <div class="buttons">
          <button class="btn gray">자주묻는 질문</button>
          <button class="btn white">1:1문의</button>
          <button class="btn orange">저작권</button>
        </div>
      </div>
      <div class="scroll-top">
        <a href="#top">
          <img src="@/assets/images/top_tri.png" alt="위로 가기 삼각형" class="triangle-icon" />
          <span>TOP</span>
        </a>
      </div>

    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #2d2d2d;
  padding: 20px;
  color: #ffffff;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.company-info {
  font-size: 14px;
  text-align: left;
}

.buttons {
  margin-top: 10px;
}

.buttons .btn {
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.buttons .btn.gray {
  background-color: #555;
  color: white;
}

.buttons .btn.white {
  background-color: white;
  color: black;
}

.buttons .btn.orange {
  background-color: #ff8c00;
  color: white;
}

.scroll-top a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-top .triangle-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
}

</style>
