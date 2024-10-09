<template>
    <div class="buddiz-search">
      <div style="background-color: #F5F6F7;">
        <h1>버디즈</h1>
        <p>나에게 꼭 맞는 버디를 찾아보세요!</p>
      </div>
      <!-- 필터와 목록을 가로로 정렬 -->
      <div class="content">
        <!-- 검색 필터 -->
        <div class="filter-section">
          <div class="search-bar">
            <div>
              <input v-model="searchQuery" type="text" placeholder="닉네임으로 검색" />
              <button><i class="fa fa-search"></i></button>
            </div>
            
          </div>
          <div class="filter-options">
            <p>필터로 검색</p>
            <div class="filter-buttons">
              <button :class="{'active': selectedPersonality === '조용해요'}" @click="selectedPersonality = '조용해요'">조용해요</button>
              <button :class="{'active': selectedPersonality === '친구해요'}" @click="selectedPersonality = '친구해요'">친구해요</button>
            </div>
            <div class="filter-gender">
              <button :class="{'active': selectedGender === '여성'}" @click="selectedGender = '여성'">여성</button>
              <button :class="{'active': selectedGender === '남성'}" @click="selectedGender = '남성'">남성</button>
            </div>
          </div>
          <div class="sort-options">
            <p>정렬</p>
            <div class="sort-buttons">
              <button :class="{'active': selectedSort === '별점순'}" @click="selectedSort = '별점순'">별점순</button>
              <button :class="{'active': selectedSort === '가격순'}" @click="selectedSort = '가격순'">가격순</button>
              <button :class="{'active': selectedSort === '리뷰 많은 순'}" @click="selectedSort = '리뷰 많은 순'">리뷰 많은 순</button>
            </div>
          </div>
        </div>
        <!-- 버디즈 목록 -->
        <div class="buddiz-list">
          <div v-for="buddiz in filteredBuddizs" :key="buddiz.id" class="buddiz-item">
            <img :src="buddiz.profileImage" alt="buddiz image" class="buddiz-image" />
            <div>
              <h3 style="font-size: 20px;">{{ buddiz.name }}</h3>
              <div style="font-size: 0.8em;">
                <p>별점: {{ buddiz.rating }}</p>
                <p>{{ buddiz.description }}</p>
                <p>{{ buddiz.career }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
    